import { useState } from 'react'
import { useIsCoFounderProfileCompleted } from 'store/user/user.uses'

export default () => {
  const userIsCoFounderProfileCompleted = useIsCoFounderProfileCompleted()

  const [isProfileErrorModalVisible, setIsProfileErrorModalVisible] = useState(false)

  const openProfileErrorModal = () => {
    setIsProfileErrorModalVisible(true)
  }

  const closeProfileErrorModal = () => {
    setIsProfileErrorModalVisible(false)
  }

  return {
    isProfileErrorModalVisible,
    openProfileErrorModal,
    closeProfileErrorModal,
    isCompleted: userIsCoFounderProfileCompleted,
  }
}
