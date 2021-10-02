import MSVI_API from '../index'

const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env

describe('Interact with Microsoft Video Indexer API', () => {
  describe('Can get access token with right credentials', () => {
    const msvpapi = MSVI_API({
      location: LOCATION!,
      accountId: ACCOUNT_ID!,
      subscriptionKey: SUBSCRIPTION_KEY!,
    })

    it('should return the access token', async () => {
      const token = msvpapi.getCachedToken(true)

      const d = await token
      expect(d).toBeTruthy()
      expect(d).toMatch(/ey*/)
    })
  })

  describe('Cannot get project auth token with wrong/missing credentials', () => {
    const msvpapi = MSVI_API({
      location: '',
      accountId: '',
      subscriptionKey: '',
    })

    it('should fail to return access token', async () => {
      const token = msvpapi.getCachedToken(true)

      const d = await token
      expect(d).toMatchObject({
        ErrorType: 'LOCATION_NOT_FOUND',
      })
    })
  })
})
