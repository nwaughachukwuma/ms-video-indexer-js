import { LOCATION, SUBSCRIPTION_KEY, ACCOUNT_ID } from './init.js'
import test from 'ava'
import videoAnalyzer from '../lib/index.js'

/**
 * Fetch video thumbnail string
 */
const api = videoAnalyzer({
  location: LOCATION,
  accountId: ACCOUNT_ID,
  subscriptionKey: SUBSCRIPTION_KEY,
})

const validIndexId = '2770eb7aca'
const wrongIndexId = 'some-random-id'
const validThumbnailId = 'e39f8945-19da-43a0-9d4e-ea9e384729e6'
const validUnrelatedThumbnailId = '8fcef147-8655-425d-b5e3-1062fd32838b'
const randomThumbnailId = 'some-random-thumbnail-id'

/** Can fetch video thumbnail from specified id */
test('fails to get video thumbnail when indexId is wrong', async (t) => {
  const response = await api.getThumbnail(wrongIndexId, randomThumbnailId)

  t.truthy(response)
  t.is(typeof response, 'string')

  const result_1 = JSON.parse(response)
  t.is(result_1.ErrorType, 'USER_NOT_ALLOWED')
})

test('fails to get video thumbnail when thumbnailId is wrong', async (t) => {
  const response = await api.getThumbnail(validIndexId, randomThumbnailId)

  t.truthy(response)
  t.is(typeof response, 'string')

  const result_1 = JSON.parse(response)
  t.is(result_1.ErrorType, 'INVALID_INPUT')
})

test('fails to get video thumbnail when provided an unrelated thumbnailId', async (t) => {
  const response = await api.getThumbnail(
    validIndexId,
    validUnrelatedThumbnailId,
  )

  t.truthy(response)

  const result_1 = JSON.parse(response)
  t.truthy(result_1.ErrorType)
  t.is(result_1.ErrorType, 'NOT_FOUND')
})

test('fails to get video thumbnail when provided the right video index and thumbnailId, but the wrong format', async (t) => {
  const wrongFormat = 'TIFF'
  const response = api.getThumbnail(
    validIndexId,
    validThumbnailId,
    // @ts-ignore
    wrongFormat,
  )

  await response.catch((e) => {
    t.truthy(e)
    t.truthy(e instanceof TypeError)
    t.truthy(e.message.includes('Wrong thumbnail format.'))
  })
})

test('get video thumbnail when provided valid input', async (t) => {
  const response = await api.getThumbnail(validIndexId, validThumbnailId)
  // console.log('Response :=', JSON.parse(response))
  t.truthy(response)
  t.is(typeof response, 'string')
  t.truthy(response.length)
})

test('get video thumbnail with the right shape, when provided valid input', async (t) => {
  const response = await api.getThumbnail(validIndexId, validThumbnailId)

  try {
    const result = JSON.parse(response)
    t.truthy(result.message)
  } catch (e) {
    t.truthy(e instanceof SyntaxError)
  }
})
