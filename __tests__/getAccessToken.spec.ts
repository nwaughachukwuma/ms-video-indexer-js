import MSVI_API from '../index'
import type { APIHandlers } from '../types'

describe('Fetch Access Token', () => {
  let msvpapi: APIHandlers
  beforeAll(() => {
    const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env

    msvpapi = MSVI_API({
      location: LOCATION!,
      accountId: ACCOUNT_ID!,
      subscriptionKey: SUBSCRIPTION_KEY!,
    })
  })

  describe('Can get project auth token', () => {
    it("Should return the project's auth token", async () => {
      const token = await msvpapi.getCachedToken()

      // console.log(token)
      expect(token).toBeTruthy()
      expect(token.length).toBeGreaterThan(1)
    })
    it("can forceRefresh the project's auth token", async () => {
      const token = await msvpapi.getCachedToken(true)

      // console.log(token)
      expect(token).toBeTruthy()
      expect(token.length).toBeGreaterThan(1)
    })
  })
})
