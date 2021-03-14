import { CacheHandlers, seconds } from './lib.msvi-api'

/**
 * A simple hashmap which serves as our cache
 *
 * @param ttl how long, in seconds to keep the cache object before it's deleted
 *
 * @example
 * ```
 * import memoryCache from "memoryCache"
 *
 * const cache =  memoryCache(60) // can hold for 60s
 *
 * cache.set('cache-key', {item: 'cache-item'})
 *
 * ```
 */
declare function memoryCache(ttl: seconds): CacheHandlers

export default memoryCache
