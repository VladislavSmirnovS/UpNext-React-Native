import React from 'react'
import { Linking } from 'react-native'
import Texts from 'appearance/texts'
import { handleError } from 'services/logger'

export default () => {
  return (
    <Texts.LoginTermsText>
      <TermsOfUse /> & <PrivacyPolicy />
    </Texts.LoginTermsText>
  )
}

const TERMS = 'https://www.zupnext.com/copy-of-privacy-policy'
const PRIVACY = 'https://www.zupnext.com/privecy-policy'

const openUrl = url => {
  Linking.openURL(url).catch(error => handleError(error))
}

const openTerms = () => {
  openUrl(TERMS)
}

const openPrivacy = () => {
  openUrl(PRIVACY)
}

const TermsOfUse = () => <Link title="Terms and conditions" onPress={openTerms} />

const PrivacyPolicy = () => <Link title="privacy links" onPress={openPrivacy} />

const Link = ({ title, onPress }) => (
  <Texts.LoginTermsHyperlinkText onPress={onPress}>{title}</Texts.LoginTermsHyperlinkText>
)
