import 'jest-matcher-one-of'
import { APIHandlers } from '../lib.msvi-api'
const MSVI_API = require('../index')

describe('Fetch Access Token', () => {
  let msvpapi: () => APIHandlers
  beforeAll(() => {
    msvpapi = MSVI_API({
      location: process.env.LOCATION,
      accountId: process.env.ACCOUNT_ID,
      subscriptionKey: process.env.SUBSCRIPTION_KEY,
    })
  })

  describe('Can get project auth token', () => {
    it("Should return the project's auth token", async () => {
      const token = await msvpapi().fetchCachedToken()

      // console.log(token)
      expect(token).toBeTruthy()
      expect(token.length).toBeGreaterThan(1)
    })
    it("can forceRefresh the project's auth token", async () => {
      const token = await msvpapi().fetchCachedToken(true)

      // console.log(token)
      expect(token).toBeTruthy()
      expect(token.length).toBeGreaterThan(1)
    })
  })
})
