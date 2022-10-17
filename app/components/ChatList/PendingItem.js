import React from 'react'
import styled from 'styled-components'
import MemberItem from 'components/ChatList/MemberItem'
import Colors from 'appearance/colors'

export default ({ item }) => {
  return (
    <MemberItem item={item}>
      <View>
        <BoldBlueText>Request sent</BoldBlueText>
      </View>
    </MemberItem>
  )
}

const View = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`
const BoldBlueText = styled.Text`
  font-size: 13px;
  font-weight: 700;
  line-height:20px;
  color: ${Colors.TEXT_BRIGHT_BLUE};
`
