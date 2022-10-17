import React from 'react'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import Colors from 'appearance/colors'

export default () => {
  return (
    <>
      <Border />
      <Spacer h={20} />
    </>
  )
}

const Border = styled.View`
  background: ${Colors.SEPARATE_GREY};
  height: 1px;
  margin-top: 20px;
  width: 100%;
`
