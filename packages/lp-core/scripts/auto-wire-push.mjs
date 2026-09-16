import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'apps');
/** Only wire push on this LP. Other apps must stay push-free. */
const onlyApps = new Set(['uncle-sam-buys-home-v2']);

const routeFiles = {
  'app/lp-push-sw/route.ts':
    'export { GET_PUSH_SERVICE_WORKER as GET } from "@workspace/lp-core/server"\n',
  'app/api/push/vapid-public-key/route.ts':
    'export { GET_VAPID_PUBLIC_KEY as GET } from "@workspace/lp-core/server"\n',
  'app/api/push/subscribe/route.ts':
    'export { POST_SUBSCRIBE as POST } from "@workspace/lp-core/server"\n',
  'app/api/push/unsubscribe/route.ts':
    'export { POST_UNSUBSCRIBE as POST } from "@workspace/lp-core/server"\n',
  'app/api/push/events/route.ts':
    'export { POST_EVENTS as POST } from "@workspace/lp-core/server"\n',
  'app/api/push/send/route.ts':
    'export { POST_SEND as POST } from "@workspace/lp-core/server"\n',
};

function updateProviders(filePath) {
  let source = fs.readFileSync(filePath, 'utf8');
  if (source.includes('BrowserPushProvider')) return false;

  if (source.includes('from "@workspace/lp-core/controller"')) {
    source = source.replace(
      /import\s*\{([^}]+)\}\s*from\s*"@workspace\/lp-core\/controller"/,
      (match, imports) => {
        if (String(imports).includes('BrowserPushProvider')) return match;
        const parts = String(imports)
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean);
        parts.push('BrowserPushProvider');
        return `import { ${parts.join(', ')} } from "@workspace/lp-core/controller"`;
      }
    );
  } else {
    source = source.replace(
      /("use client"\s*\n(?:import .+\n)*)/,
      `$1\nimport { BrowserPushProvider } from "@workspace/lp-core/controller"\n`
    );
  }

  if (
    source.includes('<UtmBlockGuard') &&
    source.includes('{children}') &&
    !source.includes('<BrowserPushProvider')
  ) {
    source = source.replace(
      /<>\s*\n\s*<UtmBlockGuard\s*\/>\s*\n\s*\{children\}\s*\n\s*<\/>/,
      `<>
      <UtmBlockGuard />
      <BrowserPushProvider>{children}</BrowserPushProvider>
    </>`
    );
  } else if (
    source.includes('InsurliiTrackingCapture') &&
    !source.includes('<BrowserPushProvider')
  ) {
    source = source.replace(
      /return\s*<InsurliiTrackingCapture>\{children\}<\/InsurliiTrackingCapture>/,
      `return (
    <BrowserPushProvider>
      <InsurliiTrackingCapture>{children}</InsurliiTrackingCapture>
    </BrowserPushProvider>
  )`
    );
  } else if (/return\s*<>\{children\}<\/>/.test(source)) {
    source = source.replace(
      /return\s*<>\{children\}<\/>/,
      'return <BrowserPushProvider>{children}</BrowserPushProvider>'
    );
  }

  if (!source.includes('<BrowserPushProvider')) {
    source = source.replace(
      /return\s*\(\s*<>\s*<UtmBlockGuard\s*\/>\s*\{children\}\s*<\/>\s*\)/s,
      `return (
    <>
      <UtmBlockGuard />
      <BrowserPushProvider>{children}</BrowserPushProvider>
    </>
  )`
    );
  }

  fs.writeFileSync(filePath, source);
  return source.includes('BrowserPushProvider');
}

function ensureRoutes(appDir) {
  for (const [rel, contents] of Object.entries(routeFiles)) {
    const full = path.join(appDir, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, contents);
  }
}

const apps = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && onlyApps.has(d.name))
  .map((d) => d.name);

let providersUpdated = 0;
let routesUpdated = 0;

for (const app of apps) {
  const appDir = path.join(root, app);
  const providersPath = path.join(appDir, 'components', 'providers.tsx');
  if (fs.existsSync(providersPath)) {
    if (updateProviders(providersPath)) providersUpdated += 1;
  }
  ensureRoutes(appDir);
  routesUpdated += 1;
}

console.log(
  JSON.stringify(
    {
      apps: apps.length,
      onlyApps: [...onlyApps],
      providersUpdated,
      routesUpdated,
      note: 'Push auto-wire is limited to uncle-sam-buys-home-v2 only.',
    },
    null,
    2
  )
);
