let fetch
if (typeof window !== 'undefined') {
  fetch = window.fetch
} else {
  fetch = require('node-fetch')
  if (!globalThis.fetch) {
    globalThis.fetch = fetch
  }
}

module.exports = fetch
