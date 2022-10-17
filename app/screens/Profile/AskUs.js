import React, { useState } from 'react'
import WebView from 'components/Control/WebView'
import PageContainer from 'components/Page/PageContainer'
import { useAllPagesWebviews } from 'services/hooks'

export default ({ navigation }) => {
  const webview = useAllPagesWebviews('ask_us')

  const [isLoading, setIsLoading] = useState(true)

  const getSource = () => {
    return { [webview.webview_type]: webview.webview_content }
  }

  const onLoad = () => {
    setIsLoading(false)
  }

  return (
    <PageContainer
      title={webview?.page_title}
      navigation={navigation}
      isLoading={isLoading}
      hideTopHeader
      noPadding
      titleBack
    >
      {webview ? <WebView source={getSource()} onLoad={onLoad} /> : null}
    </PageContainer>
  )
}
