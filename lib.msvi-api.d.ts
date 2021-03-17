export interface Credentials {
  aadClientId?: string
  aadSecret?: string
  aadTenantDomain?: string
  aadTenantId?: string
  accountName?: string
  resourceGroup?: string
  subscriptionId?: string
  armAadAudience?: string
  armEndpoint?: string
  location: string
  accountId: string
  subscriptionKey: string
}

export interface APIHandlers {
  /**
   * @param forceRefresh whether to force fetch a new access token
   * @returns cached-accessToken
   */
  fetchCachedToken: (forceRefresh?: boolean) => Promise<string>

  /**
   * @returns accessToken
   */
  getAccessToken: () => Promise<string>

  uploadVideo: (
    videoURL: string,
    randomKey: string,
    options?: Record<string, any>,
  ) => Promise<any>

  getVideoIndex: (indexId: string) => Promise<any>

  getVideoThumbanail: () => Promise<string>
}

export interface CacheHandlers {
  get: (key: string) => string | undefined
  set: <T>(key: string, value: T, options?: { ttl: seconds }) => T
  unset: (key: string) => boolean
  hasKey: (key: string) => boolean
}

export type seconds = number

/**
 * A simple hashmap which serves as our cache
 *
 * @param ttl how long, in seconds to keep the cache object before it's deleted
 *
 * @example
 * ```
 * import simpleCache from "~/simpleCache"
 *
 * const cache = simpleCache(60) // can hold for 60s
 *
 * cache.set('cache-key', {item: 'cache-item'})
 *
 * ```
 */
declare function simpleCache(ttl: seconds): CacheHandlers
