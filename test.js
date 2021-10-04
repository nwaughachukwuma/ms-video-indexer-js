import env from 'dotenv'
import test from 'ava'
import MSVI from './dist/index.js'

env.config()

const { LOCATION, ACCOUNT_ID, SUBSCRIPTION_KEY } = process.env

test('can fetch access token', async (t) => {
  const msvi = MSVI({
    location: LOCATION,
    accountId: ACCOUNT_ID,
    subscriptionKey: SUBSCRIPTION_KEY,
  })

  const token = await msvi.getAccessToken()

  t.is(typeof token, 'string')
  t.truthy(token)
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
