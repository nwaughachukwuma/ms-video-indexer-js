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
  fetchCachedToken: (forceRefresh: boolean) => Promise<string>

  /**
   * @returns accessToken
   */
  getAccessToken: () => Promise<string>

  uploadVideo: () => Promise<any>

  getVideoIndex: () => Promise<any>

  getVideoThumbanail: () => Promise<string>
}

export interface CacheHandlers {
  get: (key: string) => string | undefined
  set: <T>(key: string, value: T, options?: { ttl: seconds }) => T
  unset: (key: string) => boolean
  hasKey: (key: string) => boolean
}

export type seconds = number
