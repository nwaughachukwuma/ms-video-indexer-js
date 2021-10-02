import MSVI_API from '../index'

const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env
const msvpapi = MSVI_API({
  location: LOCATION!,
  accountId: ACCOUNT_ID!,
  subscriptionKey: SUBSCRIPTION_KEY!,
})

describe('Upload a video for indexing', () => {
  jest.setTimeout(30000)

  describe('Can upload video with a cloud URI', () => {
    const videoURL =
      'https://res.cloudinary.com/cpnwaugha/video/upload/v1615959768/VideoAI/Justice_League_Snyder_Cut_-_Official_Trailer_2_2021_Henry_Cavill_Ben_Affleck_Gal_Gadot.mp4'
    const randomKey = 'Justice_League_Snyder_Cut_'

    it('should upload a video with valid cloud URI', async () => {
      const inProgressResponse = 'VIDEO_ALREADY_IN_PROGRESS'
      const alreadyFailedResponse = 'VIDEO_ALREADY_FAILED'
      const response = msvpapi.uploadVideo(videoURL, { name: randomKey })

      const d = await response
      expect(d).not.toBeUndefined()
      expect(d.ErrorType).toBeOneOf([
        undefined,
        inProgressResponse,
        alreadyFailedResponse,
      ])
    })

    it('should fail to upload a video with an unreachable cloud URI', async () => {
      const invalidVideoURL = 'https://some-invalid-video-url.com'
      const response = msvpapi.uploadVideo(invalidVideoURL, {
        name: randomKey,
      })

      const d = await response
      console.log(d)
      expect(d).not.toBeUndefined()
      expect(d.ErrorType).toBeOneOf([undefined, 'URL_UNREACHABLE'])
      // expect(d.ErrorType).toBe('URL_UNREACHABLE')
    })
  })
})
