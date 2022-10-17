import React from 'react'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import Colors from 'appearance/colors'
import Styles from 'appearance/styles'

export const GENDER_OPTIONS = [
  { title: 'Male', image: Images.male },
  { title: 'Nonbinary', image: Images.nonbinary },
  { title: 'Female', image: Images.female },
]

export default ({ gender, setGender, required }) => {
  const renderGender = item => {
    return <Gender item={item} gender={gender} setGender={setGender} />
  }

  return (
    <>
      <Row>
        <GreyText>Select your gender</GreyText>
        {required ? <Required> *</Required> : null}
      </Row>
      <Spacer h={20} />
      <GenderContainer>{GENDER_OPTIONS.map(renderGender)}</GenderContainer>
      <Spacer h={20} />
    </>
  )
}

const Gender = ({ item, gender, setGender }) => {
  const { title, image } = item
  const isActive = title === gender

  const onGenderPress = () => {
    setGender(title)
  }

  return (
    <GenderButton key={title} onPress={onGenderPress} active={isActive}>
      <GenderImage source={image} resizeMode="contain" active={isActive} />
      <GenderText active={isActive}>{title}</GenderText>
    </GenderButton>
  )
}

const GenderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`

const GenderButton = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 7.5px;
  background-color: ${p => (p.active ? Colors.COMMON_BLUE : Colors.WHITE)};
  border: ${Styles.BOX_BORDER};
  box-shadow: ${Styles.BOX_SHADOW};
  elevation: ${Styles.ELEVATION};
  margin: 10px;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
`

const GenderImage = styled.Image`
  width: 50px;
  height: 50px;
  tint-color: ${p => (p.active ? Colors.WHITE : Colors.COMMON_BLUE)};
`

const GenderText = styled(Texts.SubtitleText)`
  color: ${p => (p.active ? Colors.WHITE : Colors.COMMON_BLUE)};
`

const GreyText = styled(Texts.GreyText)`
  text-align: center;
`

const Required = styled(Texts.SubtitleText)`
  color: ${Colors.INPUT_REQUIRED_RED};
`

const Row = styled.View`
  flex-direction: row;
`
