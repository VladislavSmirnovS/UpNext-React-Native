import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Spacer from 'components/Page/Spacer'
import FullScreenPlayer from 'components/MyVentures/FullScreenPlayer'
import Buttons from 'components/Network/Buttons'
import BlueCard from 'components/MyProfile/BlueCard'
import AlertModal from 'components/Control/AlertModal'
import useModal from 'hooks/useModal'
import { useUserId } from 'store/user/user.uses'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import Colors from 'appearance/colors'
import { openCurrentLauncher } from 'services/navigation'
import { setShownItem, deleteMyLauncher } from 'store/launcher/launcher.actions'
import { getShortTimestamp } from 'services/utils'
import { getUserFullName, getUserId } from 'utils/user'

export default ({ navigation, item, withEditButton, withConnectButton, onEdit }) => {
  const [isConfirmDeleteModalVisible, showConfirmDeleteModal, hideConfirmDeleteModal] = useModal()

  const dispatch = useDispatch()
  const userId = useUserId()

  const onEditPress = () => {
    onEdit && onEdit(item)
  }

  const isCurrentUser = () => {
    const memberId = getUserId(item?.user)
    return userId === memberId
  }

  const isEditButtonShown = () => {
    return withEditButton && isCurrentUser()
  }

  const isConnectButtonShown = () => {
    return withConnectButton
  }

  const onPress = () => {
    if (withConnectButton) {
      dispatch(setShownItem(item))
      dispatch(openCurrentLauncher(navigation))
    }
  }

  const onDeletePress = () => {
    dispatch(deleteMyLauncher(item))
    hideConfirmDeleteModal()
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={withConnectButton ? 0 : 1}>
      <BlueCard wrapPadding="5px" backgroundColor={getBackgroundColor(item?.launcher_type)}>
        <Row>
          <Icon source={getIcon(item?.launcher_type)} resizeMode="contain" />
          <Spacer w={10} />
          <View>
            <Texts.BoldTitleText>{getUserFullName(item?.user)}</Texts.BoldTitleText>

            <Row>
              <Texts.SubtitleText>{item?.user?.check_founder_teenvestor}</Texts.SubtitleText>
              <Spacer w={20} />
              <Texts.GreyText numberOfLines={1} ellipsizeMode="tail">
                {getShortTimestamp(item?.updated)}
              </Texts.GreyText>
            </Row>
          </View>
        </Row>
        <Spacer h={5} />

        <Row>
          <VideoWrapper>
            <FullScreenPlayer
              url={item?.video_url}
              navigation={navigation}
              borderRadius={0}
              isContain={false}
            />
          </VideoWrapper>
          <Spacer w={10} />
          <View>
            <Texts.BoldBlueTitleText numberOfLines={1} ellipsizeMode="tail">
              {getSkills(item?.skills)}
            </Texts.BoldBlueTitleText>
            <Texts.TitleText numberOfLines={4} ellipsizeMode="tail">
              {item?.description}
            </Texts.TitleText>
            <Spacer h={10} />

            <RightGroupButtons>
              {isEditButtonShown() ? (
                <>
                  <TouchableOpacity onPress={onEditPress}>
                    <SmallIcon
                      source={Images.edit}
                      resizeMode="contain"
                      iconColor={Colors.TEXT_GREY}
                    />
                  </TouchableOpacity>
                  <Spacer w={20} />
                  <TouchableOpacity onPress={showConfirmDeleteModal}>
                    <SmallIcon
                      source={Images.trashIcon}
                      resizeMode="contain"
                      iconColor={Colors.TEXT_GREY}
                    />
                  </TouchableOpacity>
                </>
              ) : null}
              <AlertModal
                isVisible={isConfirmDeleteModalVisible}
                text="Are you sure you want to delete this item?"
                cancelText="Delete"
                onCancel={onDeletePress}
                okText="Cancel"
                onConfirm={hideConfirmDeleteModal}
              />
            </RightGroupButtons>

            {isConnectButtonShown() ? (
              <Buttons navigation={navigation} member={item?.user} />
            ) : null}
          </View>
        </Row>
      </BlueCard>
    </TouchableOpacity>
  )
}

const getSkills = skills => {
  return skills?.join(', ')
}

const getBackgroundColor = launcherType => {
  return {
    candidate: Colors.WHITE,
    searcher: '#DCF6FF',
  }[launcherType]
}

const getIcon = launcherType => {
  return {
    candidate: Images.candidateIcon,
    searcher: Images.searcherIcon,
  }[launcherType]
}

const ICON_SIZE = 60
const SMALL_ICON_SIZE = 23

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const View = styled.View`
  flex: 1;
`

const Icon = styled.Image`
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
  align-self: center;
`

const SmallIcon = styled.Image`
  height: ${SMALL_ICON_SIZE}px;
  width: ${SMALL_ICON_SIZE}px;
  align-self: center;
  tint-color: ${Colors.TEXT_DARK_GREY};
`

const VideoWrapper = styled.View`
  height: 130px;
  width: 130px;
`

const RightGroupButtons = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`

const TouchableOpacity = styled.TouchableOpacity``
