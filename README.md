# ms-video-indexer-js

Unofficial Javascript client library for Microsoft Video Analyzer

## Note

This project is a WIP - Feel free to contribute an API you find useful to your project

## Installation

```bash
yarn add ms-video-indexer

pnpm install ms-video-indexer

npm install --save ms-video-indexer
```

## TODO

- [x] Add major handlers for relevant APIs
  - fetch and cache access token
  - index video file from a downloadable URI
  - get result of video analysis
  - get video thumbnails for any item/model which described the video, such as face, scene or shot.
- [x] Jest Test.
- [x] Examples
- [ ] Handlers for other API calls - May implement this based on request

## Example/Usage

```ts
import MSVI from 'ms-video-indexer-js'

const api = MSVI({
  accountId: 'the-account-id',
  location: 'the-location',
  subscriptionKey: 'the-subscription-key',
})

// to get the cached token
const accessToken = await api.getCachedToken()

// to index a video
const videoURL = 'https://url-to-a-downloadable-cloud-resource'
const uuid = 'id-recognising-the-video-on-your-platform'

await api.uploadVideo(videoURL, {name: 'Into the Spiderverse', externalId: uuid })
```

## API

### getCachedToken(forceFetch?)

Returns a promise to a cached access token. This functions ensures you don't always have to poll the access token 

- it's fetched once and cached using [simple cache](https://github.com/nwaughachukwuma/sma-cache) for t < 60sec before it's refreshed. 
- token is always valid within a 1hr expiry period.

**forceFetch**
`Type: undefined|boolean`

Set to true to fetch a new token

### uploadVideo(videoURL, options)

Used to ingest a video to be analyzed.

**videoURL**
`Type: string`

Video file url to analyze. The URL must point to a media file (HTML pages are not supported). Please read more [here](https://docs.microsoft.com/en-us/azure/media-services/video-indexer/upload-index-videos#videourl). Be aware of cases where the video file is protected by an access token and note that those must be encoded properly. See this [Stack Overflow question](https://stackoverflow.com/questions/66098966/issue-with-using-a-video-file-on-google-cloud-storage-as-input-to-microsoft-vide/66116340#66116340)

**options**
`Type: UploadVideoRequest`

Custom options for your video like `name` and `externalId`. Please note the following about the interface:

- the interface is shown below and only `name` is required since you provide `location` and `accountId` when instantiating the object
- you can find detailed description for each field here: https://api-portal.videoindexer.ai/api-details#api=Operations&operation=Upload-Video

```ts
interface UploadVideoRequest {
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
  language?: string
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
  brandsCategories?: string
}
```

### getVideoIndex(videoId)

Used to retrieve/fetch the result of a successful index operation.

**videoId**
`Type: string`

The id of the indexed video.

### getVideoThumbnail(videoId, thumbnailId, format?)

Used to retrieve video thumbnail.

**videoId**
`Type: string`

Id of the indexed video.

**thumbnailId**
`Type: string`

A `guid` string identifying the thumbnail.

**format**
`Type: undefined|'base64'|'Jpeg'`

Preferred thumbnail format. Allowed values are `Jpeg` and `Base64`. Defaults to `base64`

## References

- [azure media services - video-indexer](https://docs.microsoft.com/en-us/azure/media-services/video-indexer/)
