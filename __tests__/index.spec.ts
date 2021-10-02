import MSVI_API from '../index'

const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env

describe('Interact with Microsoft Video Indexer API', () => {
  describe('Can get project auth token with right credentials', () => {
    const msvpapi = MSVI_API({
      location: LOCATION!,
      accountId: ACCOUNT_ID!,
      subscriptionKey: SUBSCRIPTION_KEY!,
    })

    it("Should return the project's auth token", async () => {
      const token = await msvpapi.getCachedToken(true)

      // console.log(token)
      expect(token).toBeTruthy()
      expect(token.length).toBeTruthy()
    })
  })

  describe('Cannot get project auth token with wrong/missing credentials', () => {
    const msvpapi = MSVI_API({
      location: '',
      accountId: '',
      subscriptionKey: '',
    })

    it("Should return the project's auth token", async () => {
      const token = await msvpapi.getCachedToken(true)
      // console.log(token)
      expect(token.length).toBeUndefined()
    })
  })
})
