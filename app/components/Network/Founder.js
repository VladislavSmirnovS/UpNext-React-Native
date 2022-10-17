import React from 'react'
import styled from 'styled-components'
import StartUp from 'components/Network/StartUp'
import Images from 'appearance/images'
import FlatList from 'components/Control/FlatList'

export default ({ navigation }) => {
  const projects = [
    {
      avatar: Images.exampleAvatar1,
      name: 'Cat LOL study',
      description: 'Teach your cat some grammar with our app',
    },
    {
      avatar: Images.exampleAvatar2,
      name: 'Best teen startup',
      description: 'This is the greatest and best startup in the world',
    },
    {
      avatar: Images.exampleAvatar1,
      name: 'Cat LOL study',
      description: 'Teach your cat some grammar with our app',
    },
    {
      avatar: Images.exampleAvatar2,
      name: 'Best teen startup',
      description: 'This is the greatest and best startup in the world',
    },
  ]

  const renderItem = ({ item: member }) => {
    return <StartUp navigation={navigation} project={member} />
  }

  return (
    <View>
      <FlatList noPadding data={projects} renderItem={renderItem} />
    </View>
  )
}

const View = styled.View`
  width: 100%;
`
