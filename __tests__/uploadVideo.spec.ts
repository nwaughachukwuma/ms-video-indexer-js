import MSVI_API, { APIHandlers } from '../index'

describe('Upload a video for indexing', () => {
  jest.setTimeout(30000)

  let msvpapi: APIHandlers
  beforeAll(() => {
    const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env

    msvpapi = MSVI_API({
      location: LOCATION!,
      accountId: ACCOUNT_ID!,
      subscriptionKey: SUBSCRIPTION_KEY!,
    })
  })

  describe('Can upload video with a cloud URI', () => {
    const videoURL =
      'https://res.cloudinary.com/cpnwaugha/video/upload/v1615959768/VideoAI/Justice_League_Snyder_Cut_-_Official_Trailer_2_2021_Henry_Cavill_Ben_Affleck_Gal_Gadot.mp4'
    const randomKey = 'Justice_League_Snyder_Cut_'

    it('Should upload a video with valid cloud URI', async () => {
      const inProgressResponse = 'VIDEO_ALREADY_IN_PROGRESS'
      const alreadyFailedResponse = 'VIDEO_ALREADY_FAILED'
      const response = await msvpapi.uploadVideo(videoURL, randomKey)

      // console.log('Response :=', response)
      expect(response).toBeTruthy()
      expect(response.ErrorType).toBeOneOf([
        undefined,
        inProgressResponse,
        alreadyFailedResponse,
      ])
    })

    it('Should fail to upload a video with an unreachable cloud URI', async () => {
      const invalidVideoURL = 'https://some-invalid-video-url.com'
      const response = await msvpapi.uploadVideo(invalidVideoURL, randomKey)

      // console.log('Response :=', response)
      expect(response).toBeTruthy()
      expect(response.ErrorType).toBeTruthy()
      expect(response.ErrorType).toBe('URL_UNREACHABLE')
    })
  })
})
