import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Card from 'components/Control/Card'
import Input from 'components/MyVentures/Input'
import ColoredCard from 'components/Launcher/ColoredCard'
import Header from 'components/Launcher/Header'
import Spacer from 'components/Page/Spacer'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import Texts from 'appearance/texts'
import { validURL, validFacebookURL, validYoutubeURL, validTiktokURL } from 'services/utils'
import { NOT_VALID_URL_ERROR } from 'constants'

const FACEBOOK_TYPE = 'facebook_url'
const YOUTUBE_TYPE = 'youtube_url'
const TIKTOK_TYPE = 'tiktok_url'
const SITE_TYPE = 'site_url'

export const SOCIAL_LINKS_FIELDS = [SITE_TYPE, TIKTOK_TYPE, FACEBOOK_TYPE, YOUTUBE_TYPE]

export default ({ item = {}, onSave, onShowSuccessAnimation }) => {
  const [draft, setDraft] = useState()
  const [selectedType, setSelectedType] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    if (selectedType) {
      validation(item[selectedType] || draft, () => {
        setError()
      })
    }
  }, [selectedType])

  const onPress = type => {
    setSelectedType(type)
  }

  const onLinkChange = value => {
    setDraft(value)
    validation(value, () => {
      setError()
    })
  }

  const onLinkSave = value => {
    validation(value, () => {
      handleSave(value)
    })
  }

  const validation = (value, callback) => {
    let isValid = validURL(value)
    let validationErrorType = NOT_VALID_URL_ERROR

    if (selectedType === FACEBOOK_TYPE) {
      isValid = validFacebookURL(value)
    }
    if (selectedType === YOUTUBE_TYPE) {
      isValid = validYoutubeURL(value)
    }
    if (selectedType === TIKTOK_TYPE) {
      isValid = validTiktokURL(value)
    }

    if (isValid || !value) {
      callback()
    } else {
      setError(validationErrorType)
    }
  }

  const handleSave = value => {
    onSave({ ...item, [selectedType]: value }, onShowSuccessAnimation)
    resetState()
  }

  const resetState = () => {
    setSelectedType()
    setError()
    setDraft()
  }

  const renderSocialLinks = () => {
    return SOCIAL_LINKS_FIELDS?.map(field => (
      <SocialLink type={field} item={item} onPress={onPress} selectedType={selectedType} />
    ))
  }

  return (
    <>
      <Header item={item} />
      <ColoredCard title="You can find me at" backgroundColor={Colors.GREEN_BLUE} isOpenned>
        <Spacer h={10} />
        <LinkRow>{renderSocialLinks()}</LinkRow>
      </ColoredCard>

      {selectedType ? (
        <ColoredEmptyCard backgroundColor={Colors.GREEN_BLUE}>
          <Row>
            <Icon
              source={LINKS_IMAGES[selectedType]?.image}
              resizeMode="contain"
              size={ICON_SIZE}
            />
            <Flex>
              <Input
                value={item[selectedType] || draft}
                onSave={onLinkSave}
                placeholder="http://"
                onChange={onLinkChange}
                placeholderTextColor={`${Colors.WHITE}80`}
              />
            </Flex>
          </Row>
          {error ? <Texts.RedText>{error}</Texts.RedText> : null}
        </ColoredEmptyCard>
      ) : null}
    </>
  )
}

const LINKS_IMAGES = {
  site_url: {
    image: Images.webIcon,
  },
  tiktok_url: {
    image: Images.tiktokIcon,
  },
  facebook_url: {
    image: Images.facebookIcon,
  },
  youtube_url: {
    image: Images.youtubeIcon,
  },
}

export const SocialLink = ({ type, item, onPress, selectedType, disabled, withHide }) => {
  const link = LINKS_IMAGES[type] || {}
  const image = link?.image

  const handlePress = () => {
    onPress && onPress(type)
  }

  const getColor = () => {
    const isActive = !!item?.[type]
    if (isActive) {
      return Colors.BLACK
    }

    const isSelected = selectedType === image
    if (isSelected) {
      return Colors.WHITE
    }

    return `${Colors.WHITE}80`
  }

  const isHidden = () => {
    return withHide && !item?.[type]
  }

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled}>
      <Icon
        source={isHidden() ? null : image}
        resizeMode="contain"
        size={ICON_SIZE}
        color={getColor()}
      />
    </TouchableOpacity>
  )
}

const ICON_SIZE = 40

const ColoredEmptyCard = styled(Card)`
  background: ${p => p.backgroundColor || Colors.WHITE};
`

const Icon = styled.Image`
  height: ${p => p.size || ICON_SIZE}px;
  width: ${p => p.size || ICON_SIZE}px;
  align-self: center;
  tint-color: ${p => p.color || Colors.BLACK};
`

const Row = styled.View`
  flex-direction: row;
`

const LinkRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

const TouchableOpacity = styled.TouchableOpacity``

const Flex = styled.View`
  flex: 1;
`
