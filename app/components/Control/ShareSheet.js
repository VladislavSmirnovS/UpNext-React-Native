import React, { useMemo } from 'react'
import { Clipboard } from 'react-native'
import Share, { ShareSheet, Button } from 'react-native-share'
import styled from 'styled-components'
import Images from 'appearance/images'
import Colors from 'appearance/colors'
import { showCopyDoneAlert } from 'services/toast'

export default ({ isVisible, onClose, shareData }) => {
  const shareOptions = useMemo(() => {
    return {
      url: shareData?.url,
      subject: 'Share Link', //  for email
    }
  }, [shareData])

  const handlePress = callback => {
    onClose()
    setTimeout(() => {
      isFunc(callback) && callback()
      isFunc(shareData?.callback) && shareData?.callback()
    }, 300)
  }

  const shareSingleSocia = social => {
    Share.shareSingle({ ...shareOptions, social })
  }

  const onGmailPress = () => {
    handlePress(() => {
      shareSingleSocia('email')
    })
  }

  const onSnapchatPress = () => {
    handlePress(() => {
      shareSingleSocia('snapchat')
    })
  }

  const onInstagramPress = () => {
    handlePress(() => {
      shareSingleSocia('instagram')
    })
  }

  const onWhatappPress = () => {
    handlePress(() => {
      shareSingleSocia('whatsapp')
    })
  }

  const onCopyPress = () => {
    handlePress(() => {
      if (typeof shareOptions['url'] !== undefined) {
        Clipboard.setString(shareOptions['url'])
        showCopyDoneAlert()
      }
    })
  }

  const onMorePress = () => {
    handlePress(() => {
      Share.open(shareOptions)
    })
  }

  return (
    <ShareSheet visible={isVisible} onCancel={onClose}>
      <Button iconSrc={Images.shareGmail} onPress={onGmailPress}>
        <Text>Gmail</Text>
      </Button>
      <Button iconSrc={Images.shareSnapchat} onPress={onSnapchatPress}>
        <Text>Snapchat</Text>
      </Button>
      <Button iconSrc={Images.shareInstagram} onPress={onInstagramPress}>
        <Text>Instagram</Text>
      </Button>
      <Button iconSrc={Images.shareWhatsap} onPress={onWhatappPress}>
        <Text>Whatsapp</Text>
      </Button>
      <Button iconSrc={Images.shareCopy} onPress={onCopyPress}>
        <Text>Copy Link</Text>
      </Button>
      <Button iconSrc={Images.shareMore} onPress={onMorePress}>
        <Text>More</Text>
      </Button>
    </ShareSheet>
  )
}

const isFunc = func => {
  return func && typeof func === 'function'
}

const Text = styled.Text`
  color: ${Colors.MENU_PURPLE};
`
