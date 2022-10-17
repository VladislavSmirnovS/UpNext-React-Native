import React from 'react'
import styled from 'styled-components'
import NetworkLogger from 'react-native-network-logger'

export default () => {
  return (
    <Container>
      <NetworkLogger />
    </Container>
  )
}

const Container = styled.View`
  width: 100%;
  flex: 1;
  padding-top: 30px;
`
