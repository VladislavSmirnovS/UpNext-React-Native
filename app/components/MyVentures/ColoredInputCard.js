import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import Card from 'components/Control/Card'
import Input from 'components/MyVentures/Input'
import Icon from 'components/Control/Icon'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import Colors from 'appearance/colors'

export default ({
  title,
  titleColor,
  field,
  placeholder,
  onSave,
  backgroundColor,
  placeholderTextColor,
  maxCharactes,
  isOpenned,
  setCurrentSection,
  callback,
  item,
  image,
}) => {
  let _inputRef = useRef(null)

  const onPress = () => {
    setCurrentSection(field)
    if (!isOpenned) {
      _inputRef.current.focus()
    }
  }

  const handleSave = newValue => {
    if (newValue !== item?.[field]) {
      onSave({ ...item, [field]: newValue }, callback)
    }
  }

  return (
    <ColoredCard>
      <CollapseHeader onPress={onPress}>
        <HeaderImage source={image} />
        <Title titleColor={titleColor}>{title}</Title>
      </CollapseHeader>

      <Callapsed isShow={isOpenned}>
        <Input
          _inputRef={_inputRef}
          value={item?.[field]}
          onSave={handleSave}
          placeholder={placeholder}
          placeholderTextColor={Colors.TEXT_DARK_PURPLE}
          maxCharactes={maxCharactes}
          color={Colors.TEXT_DARK_PURPLE}
        />
      </Callapsed>
    </ColoredCard>
  )
}

const ColoredCard = styled(Card)`
  background: ${p => p.backgroundColor || Colors.WHITE};
`

const CollapseHeader = styled.TouchableOpacity`
  flex-direction: column;
`
const HeaderImage = styled.Image`
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
`

const Title = styled(Texts.BoldSubHeaderText)`
  font-size: 26px;
  color: ${p =>
    p.titleColor === 'red'
      ? 'red'
      : p.titleColor === 'blue'
      ? `${Colors.TEXT_BRIGHT_BLUE}`
      : p.titleColor === 'purple'
      ? `${Colors.TEXT_DARK_PURPLE}`
      : 'black'};
`

const Callapsed = styled.View`
  height: auto;
  ${p =>
    !p.isShow &&
    css`
      height: 0;
      padding: 0;
    `}
  ${p => p.isShow && css``}
`
