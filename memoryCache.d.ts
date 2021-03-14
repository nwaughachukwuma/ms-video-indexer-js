import { CacheHandlers, seconds } from './lib.msvi-api'

declare function memoryCache(ttl: seconds): CacheHandlers

export default memoryCache
