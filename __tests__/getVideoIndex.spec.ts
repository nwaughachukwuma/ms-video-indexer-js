import 'jest-matcher-one-of'
const MSVI_API = require('../index')
import { APIHandlers } from '../lib.msvi-api'

describe('Video Indexing Result', () => {
  let msvpapi: () => APIHandlers
  beforeAll(() => {
    msvpapi = MSVI_API({
      location: process.env.LOCATION,
      accountId: process.env.ACCOUNT_ID,
      subscriptionKey: process.env.SUBSCRIPTION_KEY,
    })
  })

  describe('Can fetch video indexing result', () => {
    const validIndexId = '2770eb7aca'
    const wrongIndexId = 'some-random-id'

    it('Should fetch result for a valid indexId', async () => {
      const response = await msvpapi().getVideoIndex(validIndexId)

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

    it('Should fail to upload a video with a wrong indexId', async () => {
      const response = await msvpapi().getVideoIndex(wrongIndexId)

      // console.log('Response :=', response)
      expect(response).toBeTruthy()
      expect(response.ErrorType).toBeTruthy()
      expect(response.ErrorType).toBe('USER_NOT_ALLOWED')
    })
  })
})
