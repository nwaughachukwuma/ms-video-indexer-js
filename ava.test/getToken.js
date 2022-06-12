import { LOCATION, SUBSCRIPTION_KEY, ACCOUNT_ID } from './init.js'
import test from 'ava'
import videoIndexer from '../lib/index.js'

/**
 * Interact with Microsoft Video Indexer API and fetch access token
 */
const api = videoIndexer({
  location: LOCATION,
  accountId: ACCOUNT_ID,
  subscriptionKey: SUBSCRIPTION_KEY,
})

test('can fetch access token', async (t) => {
  const token = await api.getToken()

  t.is(typeof token, 'string')
  t.truthy(token)
  t.regex(token, /ey*/)
})

test('can forceRefresh the access token', async (t) => {
  const token = await api.getToken(true)

  t.is(typeof token, 'string')
  t.truthy(token)
  t.regex(token, /ey*/)
})

test('cannot fetch access token when invalid credentials', async (t) => {
  const api = videoIndexer({
    location: '',
    accountId: '',
    subscriptionKey: '',
  })

  const token = await api.getToken(true)
  t.is(typeof token, 'object')
  t.truthy(token.ErrorType)
  t.is(token.ErrorType, 'LOCATION_NOT_FOUND')
})
