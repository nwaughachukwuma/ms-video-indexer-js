import env from 'dotenv'
import test from 'ava'
import MSVI from '../dist/index.js'

/** Interact with Microsoft Video Indexer API and fetch access token */
env.config()
const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env
const msvi = MSVI({
  location: LOCATION,
  accountId: ACCOUNT_ID,
  subscriptionKey: SUBSCRIPTION_KEY,
})

test('can fetch access token', async (t) => {
  const token = await msvi.getAccessToken()

  t.is(typeof token, 'string')
  t.truthy(token)
  t.regex(token, /ey*/)
})

test('can forceRefresh the access token', async (t) => {
  const token = await msvi.getAccessToken(true)

  t.is(typeof token, 'string')
  t.truthy(token)
  t.regex(token, /ey*/)
})

test('cannot fetch access token when invalid credentials', async (t) => {
  const msvi = MSVI({
    location: '',
    accountId: '',
    subscriptionKey: '',
  })

  const token = await msvi.getAccessToken()

  t.is(typeof token, 'object')
  t.truthy(token.ErrorType)
  t.is(token.ErrorType, 'LOCATION_NOT_FOUND')
})
