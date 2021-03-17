// Using CommonJS modules
require('dotenv').config()
const fetch = require('cross-fetch')
const simpleCache = require('./simpleCache')

const REQUEST_BUFFER = 60
const ACCESS_TOKEN_EXPIRY = 3600 - REQUEST_BUFFER
const key = 'video_indexer_token'
const cache = simpleCache(ACCESS_TOKEN_EXPIRY)
const baseUrl = 'https://api.videoindexer.ai'

const makeQueryString = (options) => {
  const qs = Object.keys(options)
    .filter((key) => !!options[key])
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        options[key.toString()],
      )}`
    })
    .join('&')

  return qs
}

const MSVI_API = ({
  callbackUrl = null,
  location,
  accountId,
  subscriptionKey,
}) => () => {
  const defaultOptions = {
    sendSuccessEmail: false,
    streamingPreset: 'NoStreaming',
    privacy: 'Private',
    callbackUrl: callbackUrl,
  }

  return {
    /**
     * A function that efficiently caches and returns the access token
     *
     * @param {boolean} forceRefresh whether to force fetch a new access token
     * @returns cached-accessToken
     */
    async fetchCachedToken(forceRefresh = false) {
      if (forceRefresh) {
        return await cache.set(key, this.getAccessToken())
      }

      return await (cache.get(key) || cache.set(key, this.getAccessToken()))
    },

    /**
     *
     * @returns accessToken
     */
    async getAccessToken() {
      const tokenUri = `${baseUrl}/Auth/${location}/Accounts/${accountId}/AccessToken?allowEdit=true`

      const tokenRes = await fetch(tokenUri, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
      })

      const accessToken = await tokenRes.json()
      return accessToken
    },

    /**
     *
     * @param {string} videoURL the video downloadable URI on the cloud
     * @param {string} randomKey a key that uniquely identifies the video on your platform e.g. videoId
     * @param {object} options key value pairs that overwrites the default options
     * @returns upload response
     */
    async uploadVideo(videoURL, randomKey, options = {}) {
      console.log('decodeVideo started', { videoURL, randomKey })

      options = Object.assign(
        {},
        {
          ...defaultOptions,
          name: randomKey,
          externalId: randomKey,
          videoUrl: videoURL,
        },
        options,
      )

      const urlQuery = makeQueryString(options)
      const accessToken = await this.fetchCachedToken()
      const uploadUri = `${baseUrl}/${location}/Accounts/${accountId}/Videos?${urlQuery}`

      const data = await fetch(uploadUri, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then((r) => r.json())
        .catch((e) => {
          console.error('DecodeVideo Error', e)
          throw e
        })

      console.log('decodeVideo completed')

      return data
    },

    /**
     *
     * @param { string } indexId indexed video id
     * @returns { object } as {summarizedInsights: Record<string, any> videos: Record<string, any>[]}
     */
    async getVideoIndex(indexId) {
      console.info('getVideoIndex started', { indexId })

      const accessToken = await this.fetchCachedToken()
      const indexUri = `${baseUrl}/${location}/Accounts/${accountId}/Videos/${indexId}/Index?includeStreamingUrls=true`

      const response = await fetch(indexUri, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then((r) => r.json())
        .catch((e) => {
          throw e
        })

      console.info('getVideoIndex completed')
      return response
    },

    async getVideoThumbanail() {},
  }
}

module.exports = MSVI_API
