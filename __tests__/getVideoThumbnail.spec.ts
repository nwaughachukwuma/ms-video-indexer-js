import { APIHandlers } from '../lib.msvi-api'
import MSVI_API from '../index'

describe.only('Video Thumbnail String', () => {
  let msvpapi: APIHandlers
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
    const validThumbnailId = 'e39f8945-19da-43a0-9d4e-ea9e384729e6'
    const validUnrelatedThumbnailId = '8fcef147-8655-425d-b5e3-1062fd32838b'
    const randomThumbnailId = 'some-random-thumbnail-id'

    it('Should fail to get video thumbnail when provided a wrong indexId', async () => {
      const response = await msvpapi.getVideoThumbnail(
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
      const response = await msvpapi.getVideoThumbnail(
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

    it('Should fail to get video thumbnail when provided an unrelated thumbnailId to a given video index', async () => {
      const response = await msvpapi.getVideoThumbnail(
        validIndexId,
        validUnrelatedThumbnailId,
      )

      // console.log('Response :=', JSON.parse(response))
      expect(response).toBeTruthy()

      const result = JSON.parse(response)
      expect(result.ErrorType).toBeTruthy()
      expect(result.ErrorType).toBe('NOT_FOUND')
    })

    it('Should fail to get video thumbnail when provided the right video index and thumbnailId, but the wrong format', async () => {
      const wrongFormat = 'TIFF'

      try {
        await msvpapi.getVideoThumbnail(
          validIndexId,
          validThumbnailId,
          wrongFormat,
        )
      } catch (e) {
        expect(e).toBeTruthy()
        expect(e).toBeInstanceOf(TypeError)
        expect(e.message).toContain('Wrong thumbnail format.')
      }
    })

    it('Should get video thumbnail when provided the right video index and thumbnailId', async () => {
      const response = await msvpapi.getVideoThumbnail(
        validIndexId,
        validThumbnailId,
      )

      // console.log('Response :=', JSON.parse(response))
      expect(response).toBeTruthy()
      expect(typeof response).toBe('string')
      expect(response.length).toBeGreaterThan(1)

      try {
        const result = JSON.parse(response)
        expect(result.message).toBeUndefined()
      } catch (e) {
        expect(e).toBeInstanceOf(SyntaxError)
      }
    })
  })
})
