import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Button from 'components/Control/Button'
import Spacer from 'components/Page/Spacer'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { openNetworkWithDefTab } from 'services/navigation'

export default ({ navigation }) => {
  const dispatch = useDispatch()

  const onOpenNetworkWithDefTab = () => {
    const params = { defaultActiveTab: 0 } // Founders
    dispatch(openNetworkWithDefTab(navigation, params))
  }

  return (
    <CenterdView>
      <BoldText>No Conversations yet</BoldText>
      <Spacer h={5} />
      <GreyText>{`Start a conversation\r\nwith someone from Launchpad`}</GreyText>
      <Spacer h={10} />
      <Button height={30} width="150px" text="Here" onPress={onOpenNetworkWithDefTab} />
    </CenterdView>
  )
}

const CenterdView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`

const BoldText = styled(Texts.TitleText)`
  font-weight: 700;
  text-align: center;
`

const GreyText = styled(Texts.TitleText)`
  color: ${Colors.TEXT_GREY};
  text-align: center;
`
