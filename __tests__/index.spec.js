require('jest-matcher-one-of')

const MSVI_API = require('../index')

describe('Interact with Microsoft Video Indexer API', () => {
  let msvpapi
  beforeAll(() => {
    msvpapi = MSVI_API({
      location: process.env.LOCATION,
      accountId: process.env.ACCOUNT_ID,
      subscriptionKey: process.env.SUBSCRIPTION_KEY,
    })
  })

  describe('Can get project auth token', () => {
    it("Should return the project's auth token", async () => {
      const token = await msvpapi().fetchCachedToken()

      console.log(token)

      expect(token).toBeTruthy()
    })
    it("can forceRefresh the project's auth token", async () => {
      const token = await msvpapi().fetchCachedToken(true)

      console.log(token)

      expect(token).toBeTruthy()
    })
  })

  describe('Can upload video with a cloud URI', () => {
    const videoURL =
      'https://res.cloudinary.com/cpnwaugha/video/upload/v1612773239/VideoAI/Elen_Hyundai_high.mp4'
    const randomKey = 'some-random-id'

    it('Should upload a video with valid URI', async () => {
      const inProgressResponse = 'VIDEO_ALREADY_IN_PROGRESS'
      const response = await msvpapi().uploadVideo(videoURL, randomKey)

      console.log('Response :=', response)
      expect(response).toBeTruthy()
      expect(response.ErrorType).toBeOneOf([undefined, inProgressResponse])
    })

    it('Should fail to upload a video with an invalid unreachable URI', async () => {
      const invalidVideoURL = 'https://some-invalid-video-url.com'
      const response = await msvpapi().uploadVideo(invalidVideoURL, randomKey)

      console.log('Response :=', response)
      expect(response).toBeTruthy()
      expect(response.ErrorType).toBeTruthy()
      expect(response.ErrorType).toBe('URL_UNREACHABLE')
    })
  })
})
