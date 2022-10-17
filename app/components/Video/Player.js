import React from 'react'
import VimeoPlayer from 'components/Video/VimeoPlayer'
import VideoPlayer from 'components/Video/VideoPlayer'
import { parseVideoUrl } from 'services/utils'

export default ({ url, vimeoData, ...props }) => {
  const { id, type } = parseVideoUrl(url)

  if (vimeoData && vimeoData?.uri && vimeoData?.uri?.includes(id)) {
    return <VideoPlayer url={vimeoData?.uri} {...props} {...vimeoData} />
  }

  if (type === 'vimeo') {
    return <VimeoPlayer id={id} {...props} />
  }

  return <VideoPlayer url={url} {...props} />
}
