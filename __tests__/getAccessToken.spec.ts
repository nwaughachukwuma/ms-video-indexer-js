import MSVI_API from '../index'

const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env
const msvpapi = MSVI_API({
  location: LOCATION!,
  accountId: ACCOUNT_ID!,
  subscriptionKey: SUBSCRIPTION_KEY!,
})

describe('Fetch Access Token - can get project auth token', () => {
  it("Should return the project's auth token", async () => {
    const token = await msvpapi.getCachedToken()

    // console.log(token)
    expect(token).toBeTruthy()
    expect(token.length).toBeTruthy()
  })
  it("can forceRefresh the project's auth token", async () => {
    const token = await msvpapi.getCachedToken(true)

    // console.log(token)
    expect(token).toBeTruthy()
    expect(token.length).toBeTruthy()
  })
})
