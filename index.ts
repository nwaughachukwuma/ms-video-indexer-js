import fetch from 'cross-fetch'
import simpleCache from 'sma-cache'
import { makeQueryString } from './util'
import type { Credentials, UploadVideoRequest, APIHandlers } from './types'

const key = 'video_indexer_token'
const baseUrl = 'https://api.videoindexer.ai'
const REQUEST_BUFFER = 60
const ONE_HOUR = 60 * 60
const ACCESS_TOKEN_EXPIRY = ONE_HOUR - REQUEST_BUFFER
const cache = simpleCache(ACCESS_TOKEN_EXPIRY)

const MSVI_API = ({
  location,
  accountId,
  subscriptionKey,
}: Credentials): APIHandlers => {
  const defaultOptions = {
    sendSuccessEmail: false,
    streamingPreset: 'NoStreaming',
    privacy: 'Private',
  }

  const headers = {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
  }

  return {
    async getCachedToken(forceRefresh = false) {
      if (forceRefresh) {
        return await cache.set(key, this.getAccessToken())
      }
      return await (cache.get(key) || cache.set(key, this.getAccessToken()))
    },

    async getAccessToken() {
      const tokenUri = `${baseUrl}/Auth/${location}/Accounts/${accountId}/AccessToken?allowEdit=true`

      const tokenRes = await fetch(tokenUri, {
        method: 'GET',
        headers,
      })

      return await tokenRes.json()
    },

    async uploadVideo(
      videoUrl: UploadVideoRequest['videoUrl'],
      options: UploadVideoRequest,
    ) {
      options = Object.assign(defaultOptions, {
        ...options,
        videoUrl: videoUrl,
      })

      const urlQuery = makeQueryString(options)
      const accessToken = await this.getCachedToken()
      const uploadUri = `${baseUrl}/${location}/Accounts/${accountId}/Videos?${urlQuery}`

      return await fetch(uploadUri, {
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((r) => r.json())
    },

    async getVideoIndex(indexId: string) {
      const accessToken = await this.getCachedToken()
      const indexUri = `${baseUrl}/${location}/Accounts/${accountId}/Videos/${indexId}/Index?includeStreamingUrls=true`

      return await fetch(indexUri, {
        method: 'GET',
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((r) => r.json())
    },

    async getVideoThumbnail(
      indexId: string,
      thumbnailId: string,
      format: 'Jpeg' | 'base64' = 'base64',
    ) {
      if (!['base64', 'Jpeg'].includes(format)) {
        throw TypeError('Wrong thumbnail format. Allowed values: Jpeg/Base64')
      }

      const accessToken = await this.getCachedToken()
      const indexUri = `${baseUrl}/${location}/Accounts/${accountId}/Videos/${indexId}/Thumbnails/${thumbnailId}?format=${format}`

      return await fetch(indexUri, {
        method: 'GET',
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((r) => r.text())
    },
  }
}

export const videoAnalyzer = MSVI_API
export default MSVI_API
