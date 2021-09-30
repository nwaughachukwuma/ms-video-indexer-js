function isBrowser(this: any) {
  return typeof window !== 'undefined' && this === window
}

function platformFetch() {
  if (!isBrowser()) {
    global.fetch = require('node-fetch')
    return global.fetch
  }

  return window.fetch
}

export const fetch = platformFetch()
export default fetch
