import MSVI_API from '../index'

const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env
const msvpapi = MSVI_API({
  location: LOCATION!,
  accountId: ACCOUNT_ID!,
  subscriptionKey: SUBSCRIPTION_KEY!,
})

describe('Video Indexing Result - can fetch video indexing result', () => {
  const validIndexId = '2770eb7aca'
  const wrongIndexId = 'some-random-id'

  it('should fetch result for a valid indexId', async () => {
    const response = msvpapi.getVideoIndex(validIndexId)

    const d = await response
    expect(d).toBeTruthy()
    if ('id' in d) {
      // determines that the response has the same video indexId
      expect(d.id).toBe(validIndexId)
      // determines that it has summarized insights
      expect(d.summarizedInsights).not.toBeUndefined()
      // determines that the videos analysis result array has content
      expect(d.videos.length).toBeTruthy()
    }
  })

  it('fails to fetch result when provided wrong indexId', async () => {
    const response = msvpapi.getVideoIndex(wrongIndexId)

    const d = await response
    expect(d).not.toBeUndefined()
    if ('ErrorType' in d) {
      expect(d.ErrorType).toBe('USER_NOT_ALLOWED')
    }
  })
})
