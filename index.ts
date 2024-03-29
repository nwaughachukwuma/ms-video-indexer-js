import simpleCache from 'sma-cache'
import type {
  Credentials,
  UploadVideoRequest,
  APIHandlers,
  GetVideoIndexResponseSuccess,
  ResponseError,
  UploadVideoResponse,
} from './types'

const nodeFetch = () => import('node-fetch')
const isBrowser = () => typeof window !== 'undefined' && globalThis === window
async function fetch(url: string, options: any) {
  if (isBrowser()) return window.fetch(url, options)
  return nodeFetch().then(({ default: fetch }) => fetch(url, options))
}

const makeQueryString = (options: Record<string, any>) =>
  Object.entries(options)
    .filter(([, value]) => !!value)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&')

const key = 'video_indexer'
const baseUrl = 'https://api.videoindexer.ai'
const REQUEST_BUFFER = 60 * 1000
const ONE_HOUR = 60 * 60 * 1000
const ACCESS_TOKEN_EXPIRY = ONE_HOUR - REQUEST_BUFFER
const cache = simpleCache(ACCESS_TOKEN_EXPIRY)
const defaultOptions = {
  sendSuccessEmail: false,
  streamingPreset: 'NoStreaming',
  privacy: 'Private',
}
const thumbnailFormats = ['base64', 'Jpeg']

export const videoIndexer = ({
  location,
  accountId,
  subscriptionKey,
}: Credentials): APIHandlers => {
  async function getAccessToken() {
    const URI = `${baseUrl}/Auth/${location}/Accounts/${accountId}/AccessToken?allowEdit=true`

    return fetch(URI, {
      method: 'GET',
      headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey },
    }).then((r) => r.json()) as Promise<string | ResponseError>
  }

  async function getToken(
    forceRefresh = false,
  ): Promise<string | ResponseError> {
    if (forceRefresh) {
      return cache.set(key, getAccessToken())
    }
    return cache.get(key) || cache.set(key, getAccessToken())
  }

  async function indexVideo(
    videoUrl: UploadVideoRequest['videoUrl'],
    options: UploadVideoRequest,
  ): Promise<UploadVideoResponse> {
    const _options = Object.assign(defaultOptions, { ...options, videoUrl })
    const urlQuery = makeQueryString(_options)
    const accessToken = await getToken()
    const URI = `${baseUrl}/${location}/Accounts/${accountId}/Videos?${urlQuery}`

    return fetch(URI, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((r) => r.json())
  }

  async function getIndexedOutput(indexId: string) {
    const accessToken = await getToken()
    const indexUri = `${baseUrl}/${location}/Accounts/${accountId}/Videos/${indexId}/Index?includeStreamingUrls=true`

    return fetch(indexUri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((r) => r.json()) as Promise<
      GetVideoIndexResponseSuccess | ResponseError
    >
  }

  async function getThumbnail(
    indexId: string,
    thumbnailId: string,
    format: 'Jpeg' | 'base64' = 'base64',
  ) {
    if (!thumbnailFormats.includes(format)) {
      throw new TypeError(
        'Wrong thumbnail format. Allowed values: Base64; Jpeg',
      )
    }

    const accessToken = await getToken()
    const URI = `${baseUrl}/${location}/Accounts/${accountId}/Videos/${indexId}/Thumbnails/${thumbnailId}?format=${format}`

    return fetch(URI, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((r) => r.text())
  }

  return {
    getToken,
    indexVideo,
    getIndexedOutput,
    getThumbnail,
  }
}

export default videoIndexer
