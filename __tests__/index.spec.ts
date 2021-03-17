import 'jest-matcher-one-of'
import { APIHandlers } from '../lib.msvi-api'
const MSVI_API = require('../index')

describe('Interact with Microsoft Video Indexer API', () => {
  let msvpapi: () => APIHandlers

  describe('Can get project auth token with right credentials', () => {
    beforeEach(() => {
      msvpapi = MSVI_API({
        location: process.env.LOCATION,
        accountId: process.env.ACCOUNT_ID,
        subscriptionKey: process.env.SUBSCRIPTION_KEY,
      })
    })

    it("Should return the project's auth token", async () => {
      const token = await msvpapi().fetchCachedToken(true)

      // console.log(token)
      expect(token).toBeTruthy()
      expect(token.length).toBeGreaterThan(1)
    })
  })

  describe('Cannot get project auth token with wrong/missing credentials', () => {
    beforeEach(() => {
      msvpapi = MSVI_API({
        location: '',
        accountId: '',
        subscriptionKey: '',
      })
    })

    it("Should return the project's auth token", async () => {
      const token = await msvpapi().fetchCachedToken(true)

      // console.log(token)
      expect(token.length).toBeUndefined()
    })
  })
})
