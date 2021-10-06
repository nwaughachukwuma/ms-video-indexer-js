import { fileURLToPath } from 'url'
import { createRequire } from 'module'

if (typeof require === 'undefined' && !globalThis.require) {
  globalThis.require = createRequire(fileURLToPath(import.meta.url))
}
