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

  /**
   * @param videoURL the video downloadable URI on the cloud
   * @param randomKey a key that uniquely identifies the video on your platform e.g. videoId
   * @param options key value pairs that overwrites the default options
   * @returns upload response
   */
  uploadVideo: (
    videoURL: string,
    randomKey: string,
    options?: Record<string, any>,
  ) => Promise<any>

  /**
   * @param indexId indexed video id
   * @returns indexResult as {summarizedInsights: Record<string, any> videos: Record<string, any>[]}
   */
  getVideoIndex: (indexId: string) => Promise<any>

  /**
   * @param indexId indexed video id
   * @param thumbnailId the id of model's thumbnail item
   * @param format (optional )Thumbnail format. Allowed values: Jpeg/Base64
   * @returns base64 string of the image
   */
  getVideoThumbnail: (
    indexId: string,
    thumbnailId: string,
    format?: 'base64' | 'Jpeg',
  ) => Promise<string>
}

type seconds = number
interface CacheHandlers {
  get: (key: string) => string | undefined
  set: <T>(key: string, value: T, options?: { ttl: seconds }) => T
  unset: (key: string) => boolean
  hasKey: (key: string) => boolean
}

/**
 * A simple hashmap which serves as our cache
 *
 * @param ttl how long, in seconds to keep the cache object before it's deleted
 *
 * @example
 * ```ts
 * import simpleCache from "~/simpleCache"
 *
 * const cache = simpleCache(60) // can hold for 60s
 *
 * cache.set('cache-key', {item: 'cache-item'})
 *
 * ```
 */
declare function simpleCache(ttl: seconds): CacheHandlers
