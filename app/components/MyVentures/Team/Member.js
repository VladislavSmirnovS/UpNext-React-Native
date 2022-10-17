import React from 'react'
import styled from 'styled-components'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import Spacer from 'components/Page/Spacer'
import Roles from 'components/MyVentures/Roles'
import useModal from 'hooks/useModal'
import Texts from 'appearance/texts'
import { getUserAvatarProps, getUserFullName, getUserId } from 'utils/user'

export default ({ size, item, roleOptions, setRole, disabledRoles, navigation }) => {
  const [isRolesListShown, showRolesList, hideRolesList] = useModal()

  const role = item?.role === 'null' ? null : item?.role

  const onChange = value => {
    setRole(getUserId(item), value)
    // hideRolesList()
  }

  const onPress = () => {
    isRolesListShown ? hideRolesList() : showRolesList()
  }

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Row>
          <UserAvatarLobbyBtn {...getUserAvatarProps(item)} size={size} navigation={navigation} />

          <Spacer w={20} />

          <Centered>
            <Texts.BoldSubHeaderText>{getUserFullName(item)}</Texts.BoldSubHeaderText>
            <Texts.SubtitleText>{role || '-'}</Texts.SubtitleText>
          </Centered>
        </Row>
      </TouchableOpacity>

      {isRolesListShown ? (
        <>
          <Spacer h={20} />
          <Roles
            role={role}
            options={roleOptions}
            onChange={onChange}
            disabledRoles={disabledRoles}
          />
        </>
      ) : null}
    </>
  )
}

const Row = styled.View`
  flex-direction: row;
`

const Centered = styled.View`
  justify-content: center;
`

const TouchableOpacity = styled.TouchableOpacity``
