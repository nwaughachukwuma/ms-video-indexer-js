import MSVI_API from '../index'
import type { APIHandlers } from '../types'

describe('Interact with Microsoft Video Indexer API', () => {
  let msvpapi: APIHandlers

  describe('Can get project auth token with right credentials', () => {
    beforeEach(() => {
      const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env

      msvpapi = MSVI_API({
        location: LOCATION!,
        accountId: ACCOUNT_ID!,
        subscriptionKey: SUBSCRIPTION_KEY!,
      })
    })

    it("Should return the project's auth token", async () => {
      const token = await msvpapi.getCachedToken(true)

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
      const token = await msvpapi.getCachedToken(true)

      // console.log(token)
      expect(token.length).toBeUndefined()
    })
  })
})
