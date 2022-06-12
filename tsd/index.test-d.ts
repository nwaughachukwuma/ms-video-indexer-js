import { expectType } from 'tsd'
import videoIndexer from '../index'
import type { ResponseError, GetVideoIndexResponseSuccess } from '../types'

const location = 'location'
const accountId = 'accountId'
const subscriptionKey = 'subscriptionKey'
const VIDEO_URL = 'https://example.com/video.mp4'
const INDEX_ID = 'indexId'
const THUMBNAIL_ID = 'thumbnailId'
const VIDEO_NAME = 'videoName'

const api = videoIndexer({ location, accountId, subscriptionKey })

expectType<Promise<string | ResponseError>>(api.getToken())
expectType<Promise<any>>(api.indexVideo(VIDEO_URL, { name: VIDEO_NAME }))
expectType<Promise<ResponseError | GetVideoIndexResponseSuccess>>(
  api.getIndexedOutput(INDEX_ID),
)
expectType<Promise<string>>(api.getThumbnail(INDEX_ID, THUMBNAIL_ID))
