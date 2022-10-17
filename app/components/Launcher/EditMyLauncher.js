import React from 'react'
import { useDispatch } from 'react-redux'
import BackButton from 'components/Video/BackButton'
import ScrollScreen from 'components/Launcher/ScrollScreen'
import Loader from 'components/Page/Loader'
import { setOverflowAnimation } from 'store/app/app.actions'
import { updateMyLauncher } from 'store/launcher/launcher.actions'
import Colors from 'appearance/colors'

export default ({ navigation, item, onGoBackPress }) => {
  return (
    <>
      <BackButton onGoBackPress={onGoBackPress} color={Colors.BLACK} />
      <EditMyLauncherScreen navigation={navigation} item={item} onGoBackPress={onGoBackPress} />
    </>
  )
}

const EditMyLauncherScreen = ({ navigation, item, onGoBackPress }) => {
  const dispatch = useDispatch()

  const onSave = (item, callback) => {
    dispatch(updateMyLauncher(item, callback))
  }

  const onShowSuccessAnimation = () => {
    dispatch(
      setOverflowAnimation({
        name: 'blueSuccess',
        timout: 1000,
      }),
    )
  }

  if (!item?.id) {
    return <Loader />
  }

  return (
    <ScrollScreen
      navigation={navigation}
      item={item}
      onSave={onSave}
      onShowSuccessAnimation={onShowSuccessAnimation}
      onGoBackPress={onGoBackPress}
    />
  )
}
