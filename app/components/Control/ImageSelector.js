import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import FastImage from 'react-native-fast-image'
import Loading from 'components/Page/Loading'
import imagepicker from 'services/imagepicker'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'
import Images from 'appearance/images'

const SIZE = 71
const SMALL_SIZE = 47.4
const OUTER_RIM_WIDTH = 0

export default ({
  item,
  field = 'avatar',
  onUpload,
  onCancel,
  onError,
  paddingLeft,
  isLoading,
  title,
  getNoPhotoEl,
  noPhoto,
  isAbsolute = true,
  required,
  borderRadius,
}) => {
  const dispatch = useDispatch()

  const onStartPicker = () => {
    imagepicker.startImagePicker({
      size: SIZE,
      title: 'Select Avatar',
      onUpload,
      onCancel,
      onError,
      dispatch,
    })
  }

  return (
    <Container paddingLeft={paddingLeft} isAbsolute={isAbsolute}>
      {required ? <Required> *</Required> : null}
      <OuterRim borderRadius={borderRadius} />
      {isLoading ? (
        <Loading />
      ) : item?.[field] ? (
        <PickerImage source={{ uri: item?.[field] }} borderRadius={borderRadius} />
      ) : getNoPhotoEl ? (
        getNoPhotoEl(SIZE)
      ) : (
        <PickerImage source={Images.placeholderStartupImage} borderRadius={borderRadius} />
      )}
      {title ? <Text>{title}</Text> : null}
      {isLoading ? null : (
        
            <EditButton onPress={onStartPicker}>
            <EditIcon
              resizeMode="contain"
              source={Images.editProfile}
            />
          
          </EditButton>
          
      )}
    </Container>
  )
}

const EditButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 55px;
`

const EditIcon = styled.Image`
  width: 20px;
  height: 20px;
  `

const Required = styled(Texts.SubtitleText)`
  color: ${Colors.INPUT_REQUIRED_RED};
  position: absolute;
  right: 20px;
  top: 0;
`

const Text = styled(Texts.TitleText)`
  width: ${SIZE}px;
  position: absolute;
  left: ${SMALL_SIZE / 2}px;
  text-align: center;
  bottom: 0px;
`

const Container = styled.View`
  background-color: transparent;
  height: ${SIZE}px;
  width: ${SIZE + SMALL_SIZE}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  top: 10px;
  elevation: 5;

  ${({ paddingLeft }) =>
    paddingLeft &&
    `
        left: ` +
      (paddingLeft - SMALL_SIZE / 2 + OUTER_RIM_WIDTH) +
      `px;
    `}
`

const OuterRim = styled.View`
  background-color: ${Colors.WHITE};
  height: ${SIZE + 2 * OUTER_RIM_WIDTH}px;
  width: ${SIZE + 2 * OUTER_RIM_WIDTH}px;
  border-radius: ${p => p.borderRadius || SIZE / 2 + OUTER_RIM_WIDTH}px;
  position: absolute;
  top: ${-OUTER_RIM_WIDTH}px;
`

const PickerImage = styled(FastImage)`
  height: ${SIZE}px;
  width: ${SIZE}px;
  border-radius: ${p => p.borderRadius || SIZE / 2}px;
  position: absolute;
  left: ${SMALL_SIZE / 2}px;
`

const PlusButton = styled.TouchableOpacity`
  position: absolute;
  right: 22px;
  bottom: 0;
  background: ${Colors.COMMON_BLUE};
  border-radius: 20px;
  padding: 10px;
`

const PlusImage = styled.Image`
  width: 20px;
  height: 20px;
`

const EditImage = styled.Image`
  width: 20px;
  height: 20px;
`
