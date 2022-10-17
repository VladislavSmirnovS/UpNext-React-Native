import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Button from 'components/Control/Button'
import ButtonOuter from 'components/Control/ButtonOuter'
import { useUser } from 'store/user/user.uses'
import { setShareData } from 'store/app/app.actions'
import branchio from 'services/branchio'
import Images from 'appearance/images'
import { getUserId } from 'utils/user'

export default ({ isOuter, color, text }) => {
  const dispatch = useDispatch()
  const user = useUser()

  const getShareData = () => {
    const inviteUserId = getUserId(user)
    return {
      uniqueId: inviteUserId,
      inviteUserId,
    }
  }

  const onSharePress = async () => {
    const data = getShareData()
    const url = await branchio.inviteToNetwork(data)
    dispatch(setShareData({ url }))
  }

  const title = text || 'Invite your friends'

  return (
    <ButtonWrapper>
      {isOuter ? (
        <ButtonOuter
          onPress={onSharePress}
          text={title}
          iconAfter={Images.share}
          height={30}
          width="160px"
          color={color}
        />
      ) : (
        <Button
          onPress={onSharePress}
          text={title}
          iconAfter={Images.share}
          height={30}
          width="160px"
        />
      )}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding: 5px;
`
