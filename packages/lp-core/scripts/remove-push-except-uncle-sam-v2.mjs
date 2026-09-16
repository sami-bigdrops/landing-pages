import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'apps');
const keep = 'uncle-sam-buys-home-v2';

const pushDirs = ['app/api/push', 'app/lp-push-sw'];

function rmDirRecursive(dirPath) {
  if (!fs.existsSync(dirPath)) return false;
  fs.rmSync(dirPath, { recursive: true, force: true });
  return true;
}

function unwrapProviders(filePath) {
  let source = fs.readFileSync(filePath, 'utf8');
  if (!source.includes('BrowserPushProvider')) return false;

  source = source.replace(
    /import\s*\{([^}]+)\}\s*from\s*"@workspace\/lp-core\/controller"/g,
    (match, imports) => {
      const parts = String(imports)
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean)
        .filter((p) => p !== 'BrowserPushProvider');
      if (parts.length === 0) return '';
      return `import { ${parts.join(', ')} } from "@workspace/lp-core/controller"`;
    }
  );

  source = source.replace(
    /^import\s*\{\s*BrowserPushProvider\s*\}\s*from\s*"@workspace\/lp-core\/controller"\s*\n/gm,
    ''
  );

  // Insurlii-style wrapper
  source = source.replace(
    /return\s*\(\s*<BrowserPushProvider>\s*<InsurliiTrackingCapture>\{children\}<\/InsurliiTrackingCapture>\s*<\/BrowserPushProvider>\s*\)/s,
    'return <InsurliiTrackingCapture>{children}</InsurliiTrackingCapture>'
  );

  source = source.replace(
    /<BrowserPushProvider>\s*<InsurliiTrackingCapture>\{children\}<\/InsurliiTrackingCapture>\s*<\/BrowserPushProvider>/s,
    '<InsurliiTrackingCapture>{children}</InsurliiTrackingCapture>'
  );

  // Simple children wrap
  source = source.replace(
    /<BrowserPushProvider>\s*\{children\}\s*<\/BrowserPushProvider>/g,
    '{children}'
  );

  // Multi-line children wrap (generic)
  source = source.replace(
    /<BrowserPushProvider>\s*\n([\s\S]*?)\n\s*<\/BrowserPushProvider>/g,
    '$1'
  );

  source = source.replace(/("use client"\n)\n+/g, '$1\n');
  source = source.replace(/\n{3,}/g, '\n\n');

  fs.writeFileSync(filePath, source);
  return !source.includes('BrowserPushProvider');
}

function stripPushEnv(filePath) {
  if (!fs.existsSync(filePath)) return false;
  const original = fs.readFileSync(filePath, 'utf8');
  const lines = original.split(/\r?\n/);
  const pushKey =
    /^(?:#\s*)?(?:NEXT_PUBLIC_VAPID_PUBLIC_KEY|VAPID_PRIVATE_KEY|VAPID_SUBJECT|WEB_PUSH_|ABANDON_PUSH_)/i;
  const pushComment =
    /web push|vapid|abandon push|notification center|model b \(arohaa|model a \/ local/i;

  let changed = false;
  const kept = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (pushKey.test(trimmed) || (trimmed.startsWith('#') && pushComment.test(trimmed))) {
      changed = true;
      continue;
    }
    kept.push(line);
  }

  if (!changed) return false;
  const next = kept.join('\n').replace(/\n{3,}/g, '\n\n');
  fs.writeFileSync(filePath, next.endsWith('\n') ? next : `${next}\n`);
  return true;
}

const apps = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== keep)
  .map((d) => d.name);

let routesRemoved = 0;
let providersCleaned = 0;
let envsCleaned = 0;
const leftoverProviders = [];

for (const app of apps) {
  const appDir = path.join(root, app);

  for (const rel of pushDirs) {
    if (rmDirRecursive(path.join(appDir, rel))) {
      routesRemoved += 1;
    }
  }

  const providersPath = path.join(appDir, 'components', 'providers.tsx');
  if (fs.existsSync(providersPath)) {
    const before = fs.readFileSync(providersPath, 'utf8');
    if (before.includes('BrowserPushProvider')) {
      unwrapProviders(providersPath);
      const after = fs.readFileSync(providersPath, 'utf8');
      if (after.includes('BrowserPushProvider')) {
        leftoverProviders.push(app);
      } else {
        providersCleaned += 1;
      }
    }
  }

  for (const envName of ['.env', '.env.local', '.env.example']) {
    if (stripPushEnv(path.join(appDir, envName))) {
      envsCleaned += 1;
    }
  }
}

console.log(
  JSON.stringify(
    {
      keep,
      appsProcessed: apps.length,
      pushDirsRemoved: routesRemoved,
      providersCleaned,
      envsCleaned,
      leftoverProviders,
    },
    null,
    2
  )
);
