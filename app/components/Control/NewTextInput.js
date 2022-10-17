import React from 'react'
import styled, { css } from 'styled-components'
import Spacer from 'components/Page/Spacer'
import InputContainer from 'components/Control/NewInputContainer'
import InputComponent from 'components/Control/NewInputComponent'
import InputLabel from 'components/Control/InputLabel'
import Colors from 'appearance/colors'
import Styles from 'appearance/styles'
import ShadowView from 'react-native-simple-shadow-view'
import images from 'root/app/appearance/images'

export default ({
  label,
  error,
  sidePadding,
  required,
  height,
  width,
  clearSearch,
  isFlex,
  withBottomPadding = true,
  backgroundColor,
  image,
  clearImage,
  renderPreSymbol,
  containerNoPadding,
  onBackPress,
  ...p
}) => {
  return (
    <Container style={CARD_STYLE} sidePadding={sidePadding} width={width} isFlex={isFlex}>
      {label ? <InputLabel label={label} error={error} required={required} /> : null}

      <InputContainer height={25} width={width} containerNoPadding={containerNoPadding}>
        {image === images.newSearch ? (
          <Icon source={image} resizeMode="contain" />
        ) : (
          <TouchableOpacity onPress={onBackPress} resizeMode="contain">
            <Icon source={image} resizeMode="contain" />
          </TouchableOpacity>
        )}
        <Spacer w={10} />
        {renderPreSymbol && renderPreSymbol()}
        <InputComponent height={height} width={width} {...p} noPadding />
        {clearImage ? (
          <TouchableOpacity onPress={clearSearch} resizeMode="contain">
            <Icon source={clearImage} resizeMode="contain" />
          </TouchableOpacity>
        ) : null}
      </InputContainer>
      {withBottomPadding ? <Spacer h={15} /> : null}
    </Container>
  )
}

const IMAGE_SIZE = 25

const CARD_STYLE = {
  shadowColor: Colors.COMMON_GREY,
  shadowOpacity: 0.3,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 4 },
}

const Container = styled(ShadowView)`
  border-radius: 18px;
  height: 35px;
  width: ${p => p.width || '100%'};
  background-color: ${p => p.background || Colors.WHITE};
  border-radius: ${Styles.MAIN_BORDER_RADIUS}px;
  border: ${Styles.BOX_BORDER};
  padding-left: ${p => (p.sidePadding ? p.sidePadding : 0)}px;
  padding-right: ${p => (p.sidePadding ? p.sidePadding : 0)}px;
  padding-top: 5px;
  padding-bottom: 5px;
  ${p =>
    p.isFlex &&
    css`
      flex: 1;
    `}
    margin:0 5px;
`

const TouchableOpacity = styled.TouchableOpacity``

const Icon = styled.Image`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
  align-self: center;
`
