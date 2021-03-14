// Using CommonJS modules
require('dotenv').config()
const fetch = require('cross-fetch')
const memoryCache = require('./memoryCache.js')

const REQUEST_BUFFER = 60
const ACCESS_TOKEN_EXPIRY = 3600 - REQUEST_BUFFER
const key = 'video_indexer_token'
const cache = memoryCache(ACCESS_TOKEN_EXPIRY)
const baseUrl = 'https://api.videoindexer.ai'

const MSVI_API = ({ callbackUrl = null, location, accountId, subscriptionKey }) => () => {
    return {
        /**
         * A function that efficiently caches and returns the access token
         * 
         * @param forceRefresh whether to force fetch a new access token
         * @returns cached-accessToken
         */
        async fetchCachedToken(forceRefresh) {
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

        async uploadVideo() { },

        async getVideoIndex() { },

        async getVideoThumbanail() { },
    }
}

module.exports = MSVI_API
