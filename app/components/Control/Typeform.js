import React, { useRef } from 'react'
import { Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'

const { width } = Dimensions.get('window')
const style = {marginTop: 10, height: '100%', width: width}
const TYPEFORM_HTML = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://embed.typeform.com/embed.js"></script></head><div id="typeform-embed"></div></html>'

export default ({url, onLoad, onSubmit}) => {
    const wvRef = useRef()

    const onLoadEnd = () => {
      onLoad()
      if (wvRef.current) {
        const jsToInject = `
            {
            const onSubmit = event => window.ReactNativeWebView.postMessage(event.response_id)
            const ref = typeformEmbed.makeWidget(document.getElementById("typeform-embed"), '${url}', {onSubmit})
            ref.open()
            }
            true
        `
        wvRef.current.injectJavaScript(jsToInject)
      }
    }

    const onMessage = event => {
      const { data } = event.nativeEvent;
      return onSubmit(data);
    };

    return <WebView
      ref={wvRef}
      source={{html: TYPEFORM_HTML}}
      onLoadEnd={onLoadEnd}
      onMessage={onMessage}
      style={style}
    />
}
