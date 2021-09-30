/* eslint-disable no-unused-vars */
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

/**
 * See the type description at https://api-portal.videoindexer.ai/api-details#api=Operations&operation=Upload-Video
 */
export interface UploadVideoRequest {
  location?: string
  accountId?: string
  name: string
  privacy?: 'Private' | 'Public'
  priority?: 'Low' | 'Normal' | 'High'
  description?: string
  partition?: string
  externalId?: string
  externalUrl?: string
  callbackUrl?: string
  metadata?: string
  /** The language of the video, to be used when generating the transcript:
   * Could be auto | multi or ISO 639-1 language code for select countries
   * such as en-US, en-GB, es-ES, ar-SA etc.
   */
  language?: string
  /**
   * Format - uri. A public url of the video/audio file (url encoded).
   * It is recommended to use readonly urls (e.g. when using Azure Storage SAS urls).
   * If not specified, the file should be passed as a multipart/form body content.
   */
  videoUrl?: string
  fileName?: string
  indexingPreset?:
    | 'Default'
    | 'AudioOnly'
    | 'VideoOnly'
    | 'BasicAudio'
    | 'Advanced'
    | 'AdvancedAudio'
    | 'AdvancedVideo'
  streamingPreset?:
    | 'NoStreaming'
    | 'Default'
    | 'SingleBitrate'
    | 'AdaptiveBitrate'
  linguisticModelId?: string
  personModelId?: string
  animationModelId?: string
  sendSuccessEmail?: boolean
  assetId?: string
  /** List of brands categories delimited by comma. */
  brandsCategories?: string
  /** Required if not provided in Authorization header as Bearer token - should be given as parameter in URL query string. */
  accessToken?: string
}

export interface APIHandlers {
  /**
   * Cache the access token using sma-cache
   * @param forceRefresh force fetch a new access token
   */
  getCachedToken(forceRefresh?: boolean): Promise<string>

  /**
   * Note that Access tokens expire within 1 hour
   */
  getAccessToken(): Promise<string>

  /**
   *
   * @param videoUrl the video downloadable URI on the cloud
   * @param options key value pair that overwrites the default options
   */
  uploadVideo(videoURL: string, options: UploadVideoRequest): Promise<any>

  /**
   * @param indexId indexed video id
   */
  getVideoIndex(
    indexId: string,
  ): Promise<{
    summarizedInsights: Record<string, any>
    videos: Record<string, any>[]
  }>

  /**
   * @param indexId indexed video id
   * @param thumbnailId the id of model's thumbnail item
   * @param format (optional )Thumbnail format. Allowed values: Jpeg/Base64
   */
  getVideoThumbnail(
    indexId: string,
    thumbnailId: string,
    format?: 'base64' | 'Jpeg',
  ): Promise<string>
}
