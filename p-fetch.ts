import require from './require.js'

function isBrowser(this: any) {
  return typeof window !== 'undefined' && this === window
}

async function pFetch(url: string, options: any) {
  if (!isBrowser()) {
    if (!globalThis.fetch) {
      globalThis.fetch = require('node-fetch')
    }
    return globalThis.fetch(url, options)
  }

  return window.fetch(url, options)
}

export const fetch = pFetch
export default pFetch
