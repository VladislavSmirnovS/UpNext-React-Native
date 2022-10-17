import React from 'react'
import Spacer from 'components/Page/Spacer'
import LeftTitle from 'components/CurrentTeam/LeftTitle'
import LeftText from 'components/CurrentTeam/LeftText'

export default ({ label, value }) => (
  <>
    <LeftTitle>{label}</LeftTitle>
    <LeftText>{value}</LeftText>
    <Spacer h={20} />
  </>
)
