import React from 'react'
import { useDispatch } from 'react-redux'
import PageContainer from 'components/Page/PageContainer'
import StepContainer from 'components/MyVentures/StepContainer'
import Upload from 'components/Launcher/Upload'
import Padding from 'components/Launcher/Padding'
import { setShownItem } from 'store/launcher/launcher.actions'
import { useShownItem } from 'store/launcher/launcher.uses'

export default ({ navigation }) => {
  const dispatch = useDispatch()

  const shownItem = useShownItem()

  const backCallback = () => {
    dispatch(setShownItem(null))
  }

  return (
    <PageContainer
      title="Launcher"
      navigation={navigation}
      hideTopHeader
      titleBack
      noPadding
      isLoading={!shownItem}
      backCallback={backCallback}
    >
      <StepContainer>
        <Padding>
          {shownItem ? <Upload navigation={navigation} item={shownItem} withConnectButton /> : null}
        </Padding>
      </StepContainer>
    </PageContainer>
  )
}
