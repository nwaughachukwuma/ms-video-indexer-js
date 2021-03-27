# ms-video-indexer-js

Unofficial Javascript client library for Microsoft Video Indexer

## Note

This project is a WIP

## Installation

```ts
yarn add ms-video-indexer

npm install --save ms-video-indexer
```

## TODO

- [x] Add major handlers for the relevant API calls
  - fetch Access Token including logic to cache the token
  - index video using a downloadable URI to a video file stored on the cloud
  - get video index result
  - get video thumbnail for any insight item/model
- [x] Add testing with jest testing framework.
- [ ] Add handlers for other API calls - May implement this based on request
- [x] Add examples

## Example/Usage

```ts
import MSVI from 'ms-video-indexer-js'

const api = MSVI({
  accountId: 'the-account-id',
  location: 'the-location',
  subscriptionKey: 'the-subscription-key',
})

// to get the cached token
const accessToken = await api.fetchCachedToken()

// to index a video
const videoURL = 'https://url-to-a-downloadable-cloud-resource'
const randomKey =
  'an-id-or-name-used-in-recognising-the-video-file-on-your-platform'

await api.uploadVideo(videoURL, randomKey)
```

## API

### fetchCachedToken(forceFetch?)

Returns a promise to a cached accessToken. This functions ensures that you don't have to always fetch the access token, as the access token once fetched is cached using a simple cache implementation for t < 60sec before it's refreshed. This ensures that your access token is always valid within the 1hr expiry period.

**forceFetch**
`Type: undefined|boolean`

Set to true if you always need to fetch a new access token

### uploadVideo(videoURL, randomKey?)

This is used to ingest a video which is to be indexed/decoded. It returns a promise containing parameters that defines the ingested video including the `videoId` as stored on MSVI

**videoURL**
`Type: string`

The URL of the video file to be indexed. The URL must point at a media file (HTML pages are not supported). Please read more [here](https://docs.microsoft.com/en-us/azure/media-services/video-indexer/upload-index-videos#videourl). Be aware of cases where the video file is protected by an access token and note that those must be encoded properly. See this [Stack Overflow question](https://stackoverflow.com/questions/66098966/issue-with-using-a-video-file-on-google-cloud-storage-as-input-to-microsoft-vide/66116340#66116340)

**randomKey**
`Type: undefined|string`

This is a parameter or field that is used in recognizing the video file on your app/system

### getVideoIndex(videoId)

This is used to retrieve/fetch the result of a successful indexing operation

**videoId**
`Type: string`

The id of the indexed video.

### getVideoThumbnail(videoId, thumbnailId, format?)

This is used to retrieve the thumbnail of a video

**videoId**
`Type: string`

The id of the indexed video.

**thumbnailId**
`Type: string`

A guid format string identifying the thumbnail

**format**
`Type: undefined|'base64'|'Jpeg'`

The format you require the returned thumbnail in. Allowed values are `Jpeg` and `Base64`. Defaults to `base64`

## References

- [azure media services - video-indexer](https://docs.microsoft.com/en-us/azure/media-services/video-indexer/)
