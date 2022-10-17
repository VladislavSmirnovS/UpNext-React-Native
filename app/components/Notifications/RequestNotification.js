import React, { useState } from 'react'
import styled from 'styled-components'
import Notification from 'components/Notifications/Notification'
import Spacer from 'components/Page/Spacer'
import ConfirmConnect from 'components/Network/Buttons/ConfirmConnect'
import { getUserFullName } from 'utils/user'

export default ({ item, navigation }) => {
  const { user } = item
  const [isPending, setIsPendig] = useState(false)

  const callback = isPending => {
    setIsPendig(isPending)
  }

  const getTitle = () => {
    return getUserFullName(user)
  }

  const getDescription = () => {
    return 'Wants to connect'
  }

  const getLeftElement = () => {
    return <LeftButton navigation={navigation} member={user} callback={callback} />
  }

  if (isPending) {
    return null
  }

  return (
    <Notification
      user={user}
      title={getTitle()}
      description={getDescription()}
      time={item?.created}
      leftElement={getLeftElement()}
      navigation={navigation}
    />
  )
}

const LeftButton = ({ navigation, member, callback }) => {
  return (
    <View>
      <Spacer h={10} />
      <ConfirmConnect
        navigation={navigation}
        member={member}
        height={25}
        width="90px"
        callback={callback}
        withoutMargin
      />
    </View>
  )
}

const View = styled.View``
