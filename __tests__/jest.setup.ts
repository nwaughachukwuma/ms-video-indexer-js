import 'jest-matcher-one-of'

jest.setTimeout(10000)

if (!globalThis.fetch) {
  globalThis.fetch = require('node-fetch')
}
