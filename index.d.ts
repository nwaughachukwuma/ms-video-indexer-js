import { Credentials, APIHandlers } from './lib.msvi-api'

/**
 * An initializer function that takes the credentials and returns the composed api - APIHandlers
 *
 * @param credentials A credentials object
 *
 * @example
 * ```ts
 * import MSVI from "ms-video-indexer-js"
 *
 * const api =  MSVI_API({accountId: 'the-account-id', location: 'trial', subscriptionKey: 'the-subscription-key'})
 *
 * const accessToken = await api.fetchCachedToken()
 *
 * ```
 */
declare function MSVI_API(credentials: Credentials): APIHandlers

export { MSVI_API }
export default MSVI_API
