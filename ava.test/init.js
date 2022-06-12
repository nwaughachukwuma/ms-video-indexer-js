import 'dotenv/config.js'

if (
  !process.env.LOCATION ||
  !process.env.ACCOUNT_ID ||
  !process.env.SUBSCRIPTION_KEY
) {
  throw new Error('Missing environment variables')
}
export const LOCATION = process.env.LOCATION
export const ACCOUNT_ID = process.env.ACCOUNT_ID
export const SUBSCRIPTION_KEY = process.env.SUBSCRIPTION_KEY
