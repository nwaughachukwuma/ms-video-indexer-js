import { APIHandlers } from '../lib.msvi-api'
import MSVI_API from '../index'

describe('Video Indexing Result', () => {
  let msvpapi: APIHandlers
  beforeAll(() => {
    const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env

    msvpapi = MSVI_API({
      location: LOCATION!,
      accountId: ACCOUNT_ID!,
      subscriptionKey: SUBSCRIPTION_KEY!,
    })
  })

  describe('Can fetch video indexing result', () => {
    const validIndexId = '2770eb7aca'
    const wrongIndexId = 'some-random-id'

    it('Should fetch result for a valid indexId', async () => {
      const response = await msvpapi.getVideoIndex(validIndexId)

      // console.log('Response :=', response)
      // determines that a response is returned
      expect(response).toBeTruthy()
      // determines that the response has the same video indexId
      expect(response.id).toBe(validIndexId)
      // determines that it has summarized insights
      expect(response.summarizedInsights).not.toBeUndefined()
      // determines that it has videos analysis result array
      expect(response.videos).not.toBeUndefined()
      // determines that the videos analysis result array has content
      expect(response.videos.length).toBeGreaterThan(0)
    })

    it('Fail to fetch index result when provided a wrong indexId', async () => {
      const response = await msvpapi.getVideoIndex(wrongIndexId)

      // console.log('Response :=', response)
      expect(response).toBeTruthy()
      expect(response.ErrorType).toBeTruthy()
      expect(response.ErrorType).toBe('USER_NOT_ALLOWED')
    })
  })
})
