import 'jest-matcher-one-of'

jest.setTimeout(10000)

// this is used to add fetch to {window|global}.fetch for jest which runs on a node.js environment
// and yet satisfies the condition := typeof window !== 'undefined' && this === window
if (!globalThis.fetch) {
  globalThis.fetch = require('node-fetch')
}
