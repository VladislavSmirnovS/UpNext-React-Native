import React from 'react'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({
  options,
  values,
  onChange,
  el,
  withCheckboxImage,
  withLabelHighlight,
  isCentered,
}) => {
  const onSelect = (label, isChecked) => {
    onChange(isChecked ? [...values, label] : values.filter(item => item !== label))
  }

  return (
    <Container>
      {options &&
        options.map(item => (
          <View key={item}>
            <CheckBox
              label={item}
              value={item}
              isChecked={values ? values.includes(item) : false}
              onSelect={onSelect}
              withCheckboxImage={withCheckboxImage}
              withLabelHighlight={withLabelHighlight}
              isCentered={isCentered}
            />
            {el ? el(item) : null}
          </View>
        ))}
    </Container>
  )
}

export const CheckBox = ({
  label,
  value,
  isChecked,
  onSelect,
  withCheckboxImage = true,
  withLabelHighlight,
  isCentered,
}) => {
  const onPress = () => {
    onSelect(value, !isChecked)
  }

  return (
    <TouchableOpacity onPress={onPress} isCentered={isCentered}>
      {withCheckboxImage ? (
        <CustomCheckBox checkBoxActive={isChecked}>
          <CheckIcon>
            <CheckIconWrapper>
              <CheckIconVertical checkBoxActive={isChecked} />
              <CheckIconHorizontal checkBoxActive={isChecked} />
            </CheckIconWrapper>
          </CheckIcon>
        </CustomCheckBox>
      ) : null}
      {label ? (
        <Label label={label} isChecked={isChecked} withLabelHighlight={withLabelHighlight} />
      ) : null}
    </TouchableOpacity>
  )
}

const Label = ({ withLabelHighlight, isChecked, label }) => {
  return (
    <LabbelWrapper>
      {withLabelHighlight && isChecked ? (
        <Texts.BlueBoldBigText>{label}</Texts.BlueBoldBigText>
      ) : (
        <Texts.GreySubHeader>{label}</Texts.GreySubHeader>
      )}
    </LabbelWrapper>
  )
}

const View = styled.View``

const TouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: ${p => (p.isCentered ? 'center' : 'flex-start')};
  margin-bottom: 10px;
`

const LabbelWrapper = styled.View`
  height: 30px;
`

const Container = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const CustomCheckBox = styled.View`
  height: 24px;
  width: 24px;
  background: ${props => (props.checkBoxActive ? Colors.BUTTON_BLUE : 'transparent')};
  border-radius: 5px;
  position: relative;
  justify-content: center;
  margin: 0px 8px 0 0;
  border: solid 1px ${Colors.BUTTON_BLUE};
`
const CheckIcon = styled.View`
  border-radius: 0px;
  align-self: center;
  transform: rotate(-30deg);
`

const CheckIconWrapper = styled.View`
  position: relative;
  left: 2px;
  top: -2px;
`
const CheckIconVertical = styled.View`
  height: 5px;
  width: 2px;
  background: ${props => (props.checkBoxActive ? '#fff' : 'transparent')};
`
const CheckIconHorizontal = styled.View`
  height: 2px;
  width: 16px;
  background: ${props => (props.checkBoxActive ? '#fff' : 'transparent')};
`
