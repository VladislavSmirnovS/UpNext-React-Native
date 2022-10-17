import React from 'react'
import styled from 'styled-components'
import { CenteredHeaderText, Button } from 'components/Feed/Report/style'
import Colors from 'appearance/colors'

export default ({ onPress }) => {
  const renderReportOptions = () => {
    return REPORT_OPTIONS.map(item => <ReportOption item={item} onPress={onPress} />)
  }

  return (
    <>
      <HeaderText>What's wrong with this video?</HeaderText>
      <Options>{renderReportOptions()}</Options>
    </>
  )
}

const ReportOption = ({ item, onPress }) => {
  const handlePress = () => {
    onPress(item)
  }

  return (
    <Button onPress={handlePress}>
      <Text>{item}</Text>
    </Button>
  )
}

const REPORT_OPTIONS = [
  "It's spam",
  'Nudity of sexual activity',
  'Hate speech or symbols',
  'Sale ilegal or regulated goods',
  'Violance or dangerous organications',
  'Bulying or harassment',
  'Suicide, self-harm, or an eating disorder',
  'Scam or fraud',
  "I just don't like it",
]

const Options = styled.View`
  padding: 30px 15px;
`
const HeaderText = styled(CenteredHeaderText)`
  color: ${Colors.TEXT_BRIGHT_BLUE};
`

const Text = styled.Text`
  font-size: 17px;
  letter-spacing: -0.41px;
  color: ${Colors.TEXT_DARK_PURPLE};
`
