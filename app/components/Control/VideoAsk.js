import React from 'react'
import { Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'

const { width } = Dimensions.get('window')

// @TODO: need hangle submit
export default ({ url, onLoad, onSubmit }) => {
    return <WebView
        source={{uri: url}}
        useWebKit={true}
        style={{marginTop: 10, height: '100%', width: width}}
        onLoadEnd={onLoad}
    />
}
