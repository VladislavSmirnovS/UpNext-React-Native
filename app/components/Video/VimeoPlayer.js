import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import vimeo from 'services/vimeo'
import VideoPlayer from 'components/Video/VideoPlayer'
import Loading from 'components/Page/Loading'
import { getVimeoUrl } from 'store/notification/notification.actions'
import Texts from 'appearance/texts'

export default ({ id, onSetVideoData, borderRadius, loadingSize, isFlex, ...props }) => {
  const [data, setData] = useState()
  const [loadingText, setLoadingText] = useState(null)
  const [tryCount, setTryCount] = useState(0)

  useEffect(() => {
    getUrl()
  }, [id])

  const getUrl = () => {
    getVimeoUrl(id)
      .then(res => {
        setData(res)
        onSetVideoData && onSetVideoData(res)
        if (loadingText) {
          setLoadingText(null)
        }
      })
      .catch(() => {
        setLoadingText(LOADING_TEXT)
      })
  }

  useEffect(() => {
    let timer = null
    if (loadingText) {
      timer = setTimeout(loading, LOAD_TRY_TIMOUT)
    }
    return () => clearTimeout(timer)
  }, [loadingText])

  const loading = () => {
    setTryCount(tryCount + 1)
    if (tryCount < MAX_TRY) {
      vimeoCheckStatus(id)
        .then(() => {
          getUrl()
        })
        .catch(error => {
          changeLoadingText()
        })
    }
  }

  const changeLoadingText = () => {
    setLoadingText(tryCount % 2 === 0 ? `${LOADING_TEXT}.` : LOADING_TEXT)
  }

  if (loadingText) {
    return (
      <VideoEmpty isFlex={isFlex} borderRadius={borderRadius}>
        <Loading size={loadingSize} />

        <Flex>{loadingSize ? null : <LoadingText>{loadingText}</LoadingText>}</Flex>
        <Flex />
      </VideoEmpty>
    )
  }

  return (
    <VideoPlayer
      url={data?.uri}
      {...props}
      poster={data?.poster}
      naturalSize={data?.naturalSize}
      borderRadius={borderRadius}
    />
  )
}

const VideoEmpty = styled.View`
  background: black;
  width: 100%;
  height: ${p => (p.isFlex ? 'auto' : '208px')};
  border-radius: ${p => p.borderRadius || 0}px;
  flex: 1;
  overflow: hidden;
`

const LoadingText = styled(Texts.OverflowText)`
  text-align: center;
  padding: 10px;
`

const Flex = styled.View`
  flex: 1;
  justify-content: center;
`

const MAX_TRY = 30
const LOAD_TRY_TIMOUT = 30000
const LOADING_TEXT = 'Video is uploading and converting..'

const vimeoCheckStatus = id => {
  return new Promise((resolve, reject) => {
    vimeo
      .checkStatus(id)
      .then(stats => {
        if (stats) {
          resolve(stats)
        } else {
          reject()
        }
      })
      .catch(error => reject())
  })
}
