import React from 'react'
import styled from 'styled-components'
import { StreamApp } from 'react-native-activity-feed'
import { API_ID } from 'services/streamio'
import { STRIMEO_APP_TOKEN } from '@env'
import useStreamio from 'components/Feed/hooks/useStreamio'

export default ({ children }) => {
  const { streamIoToken } = useStreamio()

  if (!streamIoToken) {
    return null
  }

  return (
    <StreamApp apiKey={STRIMEO_APP_TOKEN} appId={API_ID} token={streamIoToken}>
      <View>{children}</View>
    </StreamApp>
  )
}

const View = styled.View`
  width: 100%;
  height: 100%;
`
