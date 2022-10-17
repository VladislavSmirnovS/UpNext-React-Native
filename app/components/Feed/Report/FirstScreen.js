import React from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import { CenteredTitleText, Icon, Button } from 'components/Feed/Report/style'

export default ({ onReportPress, onFavoritPress, onRemoveFavoritPress, isMarAvailable }) => {
  return (
    <Row>
      <IconButton
        onPress={onReportPress}
        image={Images.report}
        title="Report this video"
        color={Colors.TEXT_DARK_PURPLE}
      />

      {isMarAvailable ? (
        <IconButton
          onPress={onFavoritPress}
          image={Images.favorite}
          title="Add to favourites"
          color={Colors.TEXT_DARK_PURPLE}
        />
      ) : (
        <IconButton
          onPress={onRemoveFavoritPress}
          image={Images.favoriteRemove}
          title="Remove from favourites"
          color={Colors.TEXT_DARK_PURPLE}
        />
      )}
    </Row>
  )
}

const IconButton = ({ onPress, image, title, tintColor, color }) => {
  return (
    <Button onPress={onPress}>
      <Icon source={image} resizeMode="contain" tintColor={tintColor} />
      <CenteredTitleText color={color}>{title}</CenteredTitleText>
    </Button>
  )
}

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
`
