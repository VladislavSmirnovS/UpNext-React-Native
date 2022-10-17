import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ImageSelector from 'components/Startup/ImageSelector'
import Avatar from 'components/Common/Avatar'
import Icon from 'components/Control/Icon'
import Loading from 'components/Page/Loading'
import { useTeam } from 'store/team/team.uses'
import { updateTeamAvatar } from 'store/team/team.actions'
import Images from 'appearance/images'
import Colors from 'appearance/colors'

export default () => {
  const dispatch = useDispatch()
  const team = useTeam()

  const [avatar, setAvatar] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setAvatar(team?.avatar || '')
  }, [team])

  const onUpload = imageToUpload => {
    setAvatar(imageToUpload.uri)
    setIsLoading(true)
    dispatch(
      updateTeamAvatar(team, imageToUpload, () => {
        setIsLoading(false)
      }),
    )
  }

  return (
    <Centered>
      {isLoading ? (
        <WrapperLoader>
          <Loading />
        </WrapperLoader>
      ) : (
        <ImageSelector onUpload={onUpload} optionTitle="Select Team Logo" isCenter>
          {avatar ? (
            <AvatarWrapper>
              <Avatar uri={avatar} size={TEAM_AVATAR_SIZE} id={team?.id} firsName={team?.name} />
              <UploadImage resizeMode="contain" source={Images.uploadImage} />
            </AvatarWrapper>
          ) : (
            <AvatarWrapper>
              <AvatarPlaceHolder source={Images.placeholderStartupImage} resizeMode="contain" />
              <UploadImage resizeMode="contain" source={Images.uploadImage} />
            </AvatarWrapper>
          )}
        </ImageSelector>
      )}
    </Centered>
  )
}

const Centered = styled.View`
  align-items: center;
  padding: 5px 0;
  width: 100%;
`

const WrapperLoader = styled.View`
  height: 80px;
`
const UploadImage = styled.Image`
  position: absolute;
  right: 0;
  bottom: -10px;
  width: 40px;
  height: 40px;
`
const AvatarPlaceHolder = styled.Image``

const TEAM_AVATAR_SIZE = 150

const AvatarWrapper = styled.View`
  justify-content: center;
  align-items: center;
  position: relative;
`
