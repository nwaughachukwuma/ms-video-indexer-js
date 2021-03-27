function isBrowser() {
  return typeof window !== 'undefined' && this === window
}

function platformFetch() {
  if (!isBrowser()) {
    const fetch = require('node-fetch')
    if (!globalThis.fetch) {
      globalThis.fetch = fetch
    }
    return fetch
  }

  return window.fetch
}

const fetch = platformFetch()

module.exports = fetch
// Needed for TypeScript consumers without esModuleInterop.
module.exports.default = fetch
