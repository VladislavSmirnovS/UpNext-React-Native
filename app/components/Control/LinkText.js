import React from 'react'
import FastImage from 'react-native-fast-image'
import { Linking } from 'react-native'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { validURL } from 'services/utils'
import { handleError } from 'services/logger'

export default ({ item, titleTextEl }) => {
  const { message, ogMetaData } = item
  const ogUrl = ogMetaData?.url
  const imageUrl = ogMetaData?.defaultImage?.url || ogMetaData?.defaultImage?.secureUrl

  const renderMessage = () => {
    const msgWords = message.split(/\s/)
    return msgWords.map(word => {
      const Title = titleTextEl || Texts.TitleText
      return validURL(word) ? renderLink(word) : <Title>{word} </Title>
    })
  }

  return (
    <>
      <MessageWithLinks>{renderMessage()}</MessageWithLinks>
      {ogMetaData ? (
        <View>
          {imageUrl ? <Image source={{ uri: imageUrl }} /> : null}
          {ogMetaData.title ? <Texts.SmallText>{ogMetaData.title}</Texts.SmallText> : null}
          {ogMetaData.description ? (
            <Texts.SmallText>{ogMetaData.description}</Texts.SmallText>
          ) : null}
          {ogUrl ? <Texts.SmallText>{ogUrl}</Texts.SmallText> : null}
        </View>
      ) : null}
    </>
  )
}

const renderLink = url => {
  const onClick = () => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url)
        } else {
          handleError(error)
        }
      })
      .catch(error => handleError(error))
  }

  return (
    <>
      <TouchableOpacity onPress={onClick}>
        <Link numberOfLines={2} ellipsizeMode="tail">
          {url}
        </Link>
      </TouchableOpacity>
      <Texts.TitleText> </Texts.TitleText>
    </>
  )
}

const TouchableOpacity = styled.TouchableOpacity``

const Link = styled(Texts.TitleText)`
  color: ${Colors.COMMON_BLUE};
  text-decoration: underline;
`

const View = styled.View`
  align-items: ${p => (p.isRight ? 'flex-end' : 'flex-start')};
`

const MessageWithLinks = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`

const Image = styled(FastImage)`
  height: 100px;
  width: 100px;
`
