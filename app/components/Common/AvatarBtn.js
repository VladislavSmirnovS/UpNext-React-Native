import React from 'react'
import styled from 'styled-components'
import Avatar from 'components/Common/Avatar'

export default ({ uri, id, firsName, lastName, size, onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Avatar uri={uri} id={id} firsName={firsName} lastName={lastName} size={size} />
    </TouchableOpacity>
  )
}

const TouchableOpacity = styled.TouchableOpacity``
