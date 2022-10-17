import React from 'react'
import styled from 'styled-components'
import { useUserInitialized, useUserIsMentor } from 'store/user/user.uses'
import Texts from 'appearance/texts'

export default () => {
  const isUserInitialized = useUserInitialized()
  const userIsMentor = useUserIsMentor()

  if (isUserInitialized && userIsMentor) {
    return <Text>Search</Text>
  }

  return <Text>My Startups</Text>
}

const Text = styled(Texts.GreyText)`
  font-size: 8px;
  text-transform: capitalize;
`
