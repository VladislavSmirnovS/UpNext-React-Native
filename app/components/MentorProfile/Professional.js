import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import ScrollPadderForFeed from 'components/Page/ScrollPadderForFeed'
import ScrollPadder from 'components/Page/ScrollPadder'
import TextInput from 'components/Control/TextInput'
import Button from 'components/Control/Button'
import MentorCompanySelector from 'components/MentorProfile/MentorCompanySelector'
import Spacer from 'components/Page/Spacer'
import Bottom from 'components/MentorProfile/Bottom'
import { setOverflowAnimation } from 'store/app/app.actions'
import { updateUserDetails } from 'store/user/user.actions'
import { resetFeed } from 'store/feed/feed.actions'
import { useUser } from 'store/user/user.uses'
import Texts from 'appearance/texts'
import { validURL } from 'services/utils'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useUser()

  const [companyName, setCompanyName] = useState('')
  const [companyUrl, setCompanyUrl] = useState('')
  const [companyRole, setCompanyRole] = useState('')
  const [bio, setBio] = useState('')
  const [minCoinsForFeed, setMinCoinsForFeed] = useState('')
  const [urlError, setUrlError] = useState('')

  useEffect(() => {
    setCompanyName(user?.company_name || '')
    setCompanyUrl(user?.company_url || '')
    setCompanyRole(user?.company_role || '')
    setBio(user?.bio || '')
    setMinCoinsForFeed(user?.min_coins_for_feed?.toString() || '0')
  }, [user])

  const isChaned = () => {
    return (
      companyName !== user?.company_name ||
      companyUrl !== user?.company_url ||
      companyRole !== user?.company_role ||
      bio !== user?.bio ||
      minCoinsForFeed !== user?.min_coins_for_feed
    )
  }

  const onSave = () => {
    if (isChaned()) {
      const updatedUser = {
        ...user,
        company_name: companyName,
        company_url: companyUrl,
        company_role: companyRole,
        bio,
        min_coins_for_feed: minCoinsForFeed,
      }

      dispatch(
        updateUserDetails(updatedUser, navigation, () => {
          if (+user?.min_coins_for_feed !== +minCoinsForFeed) {
            dispatch(resetFeed(null))
          }
          onShowSuccessAnimation()
        }),
      )
    }
  }

  const onShowSuccessAnimation = () => {
    dispatch(setOverflowAnimation({ name: 'profile' }))
  }

  const onNumberInputChanged = text => {
    setMinCoinsForFeed(text.replace(/[^0-9]/g, ''))
  }

  const onUrlChange = text => {
    setCompanyUrl(text)
    setUrlError(validURL(text) ? '' : 'Wrong url')
  }

  const isDisable = () => {
    return !!urlError
  }

  return (
    <ScrollPadderForFeedStyled>
      <MentorCompanySelector />
      <Spacer h={145} />

      <ScrollPadder noPadding>
        <Form>
          <TextInput label="Company" value={companyName} onChangeText={setCompanyName} />
          <TextInput label="Url" value={companyUrl} onChangeText={onUrlChange} error={urlError} />
          <TextInput label="Role" value={companyRole} onChangeText={setCompanyRole} />
          <TextInput label="Bio" value={bio} onChangeText={setBio} />

          <Spacer h={10} />
          <Texts.TitleText>Show me video pithces with more</Texts.TitleText>
          <Row>
            <Texts.TitleText>than</Texts.TitleText>
            <Spacer w={10} />
            <TextInput
              value={minCoinsForFeed}
              onChangeText={onNumberInputChanged}
              keyboardType="numeric"
              height={30}
              width="100px"
              noPadding
            />
            <Spacer w={10} />
            <Texts.TitleText>supporters</Texts.TitleText>
          </Row>
        </Form>
      </ScrollPadder>
      <Button text="Save" onPress={onSave} disabled={isDisable()} />
      <Bottom navigation={navigation} />
    </ScrollPadderForFeedStyled>
  )
}

const ScrollPadderForFeedStyled = styled(ScrollPadderForFeed)`
  padding-bottom: 15px;
`

const Form = styled.View`
  width: 100%;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`
