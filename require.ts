import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)
export const require = createRequire(__filename)
export default require
