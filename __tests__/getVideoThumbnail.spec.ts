import { APIHandlers } from '../lib.msvi-api'
import MSVI_API from '../index'

describe.only('Video Thumbnail String', () => {
  let msvpapi: () => APIHandlers
  beforeAll(() => {
    const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env

    msvpapi = MSVI_API({
      location: LOCATION!,
      accountId: ACCOUNT_ID!,
      subscriptionKey: SUBSCRIPTION_KEY!,
    })
  })

  describe('Can fetch video thumbnail from specified id', () => {
    const validIndexId = '2770eb7aca'
    const wrongIndexId = 'some-random-id'
    const randomThumbnailId = 'some-random-thumbnail-id'

    it('Should fail to get video thumbnail when provided a wrong indexId', async () => {
      const response = await msvpapi().getVideoThumbnail(
        wrongIndexId,
        randomThumbnailId,
      )

      // console.log('Response :=', JSON.parse(response))
      expect(response).toBeTruthy()
      expect(typeof response).toBe('string')
      const result = JSON.parse(response)

      expect(result.message).toBeTruthy()
      expect(result.message).toContain('The request is invalid')
    })

    it('Should fail to get video thumbnail when provided a wrong thumbnailId', async () => {
      const response = await msvpapi().getVideoThumbnail(
        validIndexId,
        randomThumbnailId,
      )

      // console.log('Response :=', JSON.parse(response))
      expect(response).toBeTruthy()
      expect(typeof response).toBe('string')
      const result = JSON.parse(response)

      expect(result.message).toBeTruthy()
      expect(result.message).toContain('The request is invalid')
    })
  })
})
