import React, { useState } from 'react'
import PageContainer from 'components/Page/PageContainer'
import Mentors from 'components/Network/Mentors'

export default ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <PageContainer navigation={navigation} noPadding isLoading={isLoading}>
      <Mentors setIsLoading={setIsLoading} navigation={navigation} />
    </PageContainer>
  )
}
