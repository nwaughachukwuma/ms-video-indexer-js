import { Credentials, APIHandlers } from './lib.msvi-api'

/**
 * An initializer function that takes the credentials and returns the composed api - APIHandlers
 *
 * @param credentials A credentials object
 *
 * @example
 * ```
 * import MSVI_API from "ms-video-indexer-js"
 *
 * const msvi =  MSVI_API({accountId: 'the-account-id', location: 'trial', subscriptionKey: 'the-subscription-key'})
 *
 * const accessToken = await msvi.fetchCachedToken()
 *
 * ```
 */
declare function MSVI_API(credentials: Credentials): APIHandlers

export default MSVI_API
