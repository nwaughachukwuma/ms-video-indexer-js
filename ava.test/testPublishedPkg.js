import { LOCATION, SUBSCRIPTION_KEY, ACCOUNT_ID } from './init.js'
import test from 'ava'
import videoIndexer from 'ms-video-indexer'

/**
 * Interact with Microsoft Video Indexer API and fetch access token
 */
const api = videoIndexer({
  location: LOCATION,
  accountId: ACCOUNT_ID,
  subscriptionKey: SUBSCRIPTION_KEY,
})
const randomKey = 'Justice_League_Snyder_Cut_'
const validIndexId = '2770eb7aca'
const wrongIndexId = 'some-random-id'
const randomThumbnailId = 'some-random-thumbnail-id'

test('can fetch access token', async (t) => {
  const token = await api.getToken()

  t.is(typeof token, 'string')
  t.truthy(token)
  t.regex(token, /ey*/)
})

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

test('should fetch result for a valid indexId', async (t) => {
  const response = await api.getIndexedOutput(validIndexId)

  t.truthy(response)
  if ('id' in response) {
    // determines that the response has the same video indexId
    t.is(response.id, validIndexId)
    // determines that it has summarized insights
    t.truthy(response.summarizedInsights)
    // determines that the videos analysis result array has content
    t.truthy(response.videos.length)
  }
})

test('fails to get video thumbnail when indexId is wrong', async (t) => {
  const response = await api.getThumbnail(wrongIndexId, randomThumbnailId)

  t.truthy(response)
  t.is(typeof response, 'string')

  const result_1 = JSON.parse(response)
  t.is(result_1.ErrorType, 'USER_NOT_ALLOWED')
})
