import React from 'react'
import styled from 'styled-components'
import LogoutButton from 'components/Login/LogoutButton'

export default ({ navigation }) => {
  return (
    <BottomRow>
      <LogoutButton navigation={navigation} />
    </BottomRow>
  )
}

const BottomRow = styled.View`
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`
