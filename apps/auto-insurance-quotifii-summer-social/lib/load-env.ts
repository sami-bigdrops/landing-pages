import path from "node:path"
import { fileURLToPath } from "node:url"
import { config } from "dotenv"

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

config({ path: path.join(appRoot, ".env.local") })
config({ path: path.join(appRoot, ".env") })
