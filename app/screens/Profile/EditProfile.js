import React from 'react'
import PageContainer from 'components/Page/PageContainer'
import Form from 'components/MyProfile/Form'

const EditProfile = ({ navigation }) => {
  return (
    <PageContainer navigation={navigation} hideTopHeader titleBack title="Edit profile">
      <Form navigation={navigation} withAvatarSelector withProfessionalProfile />
    </PageContainer>
  )
}


export default EditProfile
