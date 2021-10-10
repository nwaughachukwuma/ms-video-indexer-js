import MSVI_API from '../index'

const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env
const msvpapi = MSVI_API({
  location: LOCATION!,
  accountId: ACCOUNT_ID!,
  subscriptionKey: SUBSCRIPTION_KEY!,
})

describe('Video Thumbnail String', () => {
  describe('Can fetch video thumbnail from specified id', () => {
    const validIndexId = '2770eb7aca'
    const wrongIndexId = 'some-random-id'
    const validThumbnailId = 'e39f8945-19da-43a0-9d4e-ea9e384729e6'
    const validUnrelatedThumbnailId = '8fcef147-8655-425d-b5e3-1062fd32838b'
    const randomThumbnailId = 'some-random-thumbnail-id'

    it('should fail to get video thumbnail indexId is wrong', async () => {
      const response = msvpapi.getVideoThumbnail(
        wrongIndexId,
        randomThumbnailId,
      )

      const d = await response
      expect(d).toBeTruthy()
      expect(typeof d).toBe('string')
      const result_1 = JSON.parse(d)
      expect(result_1.message).toContain('The request is invalid')
    })

    it('should fail to get video thumbnail when thumbnailId is wrong', async () => {
      const response = msvpapi.getVideoThumbnail(
        validIndexId,
        randomThumbnailId,
      )

      const d = await response
      expect(d).toBeTruthy()
      expect(typeof d).toBe('string')
      const result_1 = JSON.parse(d)
      expect(result_1.message).toContain('The request is invalid')
    })

    it('should fail to get video thumbnail when provided an unrelated thumbnailId', async () => {
      const response = msvpapi.getVideoThumbnail(
        validIndexId,
        validUnrelatedThumbnailId,
      )

      const d = await response
      expect(d).toBeTruthy()
      const result_1 = JSON.parse(d)
      expect(result_1.ErrorType).toBeTruthy()
      expect(result_1.ErrorType).toBe('NOT_FOUND')
    })

    it('should fail to get video thumbnail when provided the right video index and thumbnailId, but the wrong format', () => {
      const wrongFormat = 'TIFF'
      const response = msvpapi.getVideoThumbnail(
        validIndexId,
        validThumbnailId,
        // @ts-ignore
        wrongFormat,
      )

      expect.assertions(3)
      return response.catch((e: Error) => {
        expect(e).toBeTruthy()
        expect(e).toBeInstanceOf(TypeError)
        expect(e.message).toContain('Wrong thumbnail format.')
      })
    })

    it('should get video thumbnail when provided valid input', async () => {
      const response = msvpapi.getVideoThumbnail(validIndexId, validThumbnailId)

      const d = await response
      // console.log('Response :=', JSON.parse(response))
      expect(d).toBeTruthy()
      expect(typeof d).toBe('string')
      expect(d.length).toBeTruthy()
    })

    it('should get video thumbnail with the right shape, when provided valid input', () => {
      const response = msvpapi.getVideoThumbnail(validIndexId, validThumbnailId)

      expect.assertions(1)
      return response
        .then((d: any) => {
          const result = JSON.parse(d)
          expect(result.message).toBeUndefined()
        })
        .catch((e: Error) => {
          expect(e).toBeInstanceOf(SyntaxError)
        })
    })
  })
})
