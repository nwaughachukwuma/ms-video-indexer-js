import env from 'dotenv'
import test from 'ava'
import MSVI from '../dist/index.js'

/**
 * Fetch video indexing/analyses result
 */

env.config()

const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env
const api = MSVI({
  location: LOCATION,
  accountId: ACCOUNT_ID,
  subscriptionKey: SUBSCRIPTION_KEY,
})

/** can fetch video indexing result */
const validIndexId = '2770eb7aca'
const wrongIndexId = 'some-random-id'

test('should fetch result for a valid indexId', async (t) => {
  const response = await api.getVideoIndex(validIndexId)

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

test('fails to fetch result when provided wrong indexId', async (t) => {
  const response = await api.getVideoIndex(wrongIndexId)

  t.truthy(response)
  if ('ErrorType' in response) {
    t.is(response.ErrorType, 'USER_NOT_ALLOWED')
  }
})
