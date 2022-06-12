import { LOCATION, SUBSCRIPTION_KEY, ACCOUNT_ID } from './init.js'
import test from 'ava'
import videoIndexer from '../lib/index.js'

/**
 * Can upload a video for indexing
 */
const api = videoIndexer({
  location: LOCATION,
  accountId: ACCOUNT_ID,
  subscriptionKey: SUBSCRIPTION_KEY,
})
const randomKey = 'Justice_League_Snyder_Cut_'

/* Attempt to upload video with a cloud URI */
test('should upload a video with valid cloud URI', async (t) => {
  const inProgressResponse = 'VIDEO_ALREADY_IN_PROGRESS'
  const alreadyFailedResponse = 'VIDEO_ALREADY_FAILED'
  const possibleResponses = [
    undefined,
    inProgressResponse,
    alreadyFailedResponse,
  ]
  const videoURL =
    'https://res.cloudinary.com/cpnwaugha/video/upload/v1615959768/VideoAI/Justice_League_Snyder_Cut_-_Official_Trailer_2_2021_Henry_Cavill_Ben_Affleck_Gal_Gadot.mp4'

  const response = await api.indexVideo(videoURL, { name: randomKey })
  t.truthy(response)
  t.is(possibleResponses.includes(response.ErrorType), true)
})

/* Attempt to upload video with a cloud URI */
test('fails to upload a video with an unreachable cloud URI', async (t) => {
  const invalidVideoURL = 'https://some-invalid-video-url.com'
  const response = await api.indexVideo(invalidVideoURL, { name: randomKey })
  const possibleResponses = [undefined, 'URL_UNREACHABLE']

  t.truthy(response)
  t.is(possibleResponses.includes(response.ErrorType), true)
})
