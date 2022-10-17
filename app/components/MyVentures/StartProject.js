import React from 'react'
import Colors from 'root/app/appearance/colors'
import Images from 'root/app/appearance/images'
import styled from 'styled-components'

const StartProject = ({ onPress }) => {
  return (
    <Container>
      <Image resizeMode="cover" source={Images.startProjectFull} />
      <StartTitle>Start a Project</StartTitle>
      <StartSubTitle>
        Start your own startup project amd get it funded with the help of the community
      </StartSubTitle>
      <CreateProjectContainer>
        <CreateProjectButton onPress={onPress}>
          <CreateProjectText>GO</CreateProjectText>
        </CreateProjectButton>
      </CreateProjectContainer>
    </Container>
  )
}
const Container = styled.View``

const Image = styled.Image`
  width: 100%;
  height:180px;
`
const StartTitle = styled.Text`
  margin-top: 70px;
  padding: 0 50px;
  font-size: 32px;
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-weight: 700;
`
const StartSubTitle = styled.Text`
  padding: 0 50px;
  color: ${Colors.TEXT_DARK_PURPLE};
  font-size: 16px;
  font-weight: 500;
`
const CreateProjectContainer = styled.View`
  margin-top: 100px;
  align-items: center;
`
const CreateProjectButton = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border: 3px solid ${Colors.TEXT_BRIGHT_BLUE};
  border-radius: 50px;
`
const CreateProjectText = styled.Text`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  line-height: 61px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`

export default StartProject
