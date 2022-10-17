import React from 'react'
import { useDispatch } from 'react-redux'
import PageContainer from 'components/Page/PageContainer'
import Tabs from 'components/Admin/Tabs'
import Tutorials from 'components/Admin/Tutorials'
import { onClearSearch } from 'store/admin/admin.actions'
import { useAdminUser } from 'store/user/user.uses'
import { useIsLoading } from 'store/admin/admin.uses'
import { openHomePage } from 'services/navigation'
import Texts from 'appearance/texts'

export default ({ navigation }) => {
  const dispatch = useDispatch()

  const adminUser = useAdminUser()
  const isLoading = useIsLoading()

  const onGoBack = () => {
    dispatch(openHomePage(navigation))
  }

  const backCallback = () => {
    dispatch(onClearSearch())
  }

  return (
    <PageContainer
      title="Admin panel"
      navigation={navigation}
      titleBack
      hideTopHeader
      noPadding
      backCallback={backCallback}
      onGoBack={onGoBack}
      isLoading={isLoading}
    >
      {adminUser ? (
        <>
          <Tabs navigation={navigation} />

          <Tutorials />
        </>
      ) : (
        <Texts.TitleText>
          This is a magical place)) How did you get here?! Go away!!!
        </Texts.TitleText>
      )}
    </PageContainer>
  )
}
