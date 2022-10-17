import React from 'react'
import styled, { css } from 'styled-components'
import Spacer from 'components/Page/Spacer'
import InputContainer from 'components/Control/InputContainer'
import InputComponent from 'components/Control/InputComponent'
import InputLabel from 'components/Control/InputLabel'

export default ({
  label,
  error,
  sidePadding,
  required,
  height,
  width,
  isFlex,
  withBottomPadding = true,
  backgroundColor,
  image,
  renderPreSymbol,
  containerNoPadding,
  ...p
}) => {
  return (
    <Container sidePadding={sidePadding} width={width} isFlex={isFlex}>
      {label ? <InputLabel label={label} error={error} required={required} /> : null}
      <Spacer h={10} />
      <InputContainer
        height={height}
        width={width}
        backgroundColor={backgroundColor}
        containerNoPadding={containerNoPadding}
      >
        {image ? <Icon source={image} resizeMode="contain" /> : null}
        {renderPreSymbol && renderPreSymbol()}
        <InputComponent height={height} width={width} {...p} />
      </InputContainer>
      {withBottomPadding ? <Spacer h={15} /> : null}
    </Container>
  )
}

const IMAGE_SIZE = 40

const Container = styled.TouchableOpacity`
  padding-left: ${p => (p.sidePadding ? p.sidePadding : 0)}px;
  padding-right: ${p => (p.sidePadding ? p.sidePadding : 0)}px;
  width: ${p => p.width || 'auto'};
  ${p =>
    p.isFlex &&
    css`
      flex: 1;
    `}
`

const Icon = styled.Image`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
  align-self: center;
`
