import MSVI_API from '../index'

const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env
const msvpapi = MSVI_API({
  location: LOCATION!,
  accountId: ACCOUNT_ID!,
  subscriptionKey: SUBSCRIPTION_KEY!,
})

describe('Fetch Access Token - can get access token', () => {
  it('should return access token', async () => {
    const token = msvpapi.getCachedToken()

    const d = await token
    expect(d).toMatch(/ey*/)
  })
  it('can forceRefresh the access token', async () => {
    const token = msvpapi.getCachedToken(true)

    const d = await token
    expect(d).toMatch(/ey*/)
  })
})
