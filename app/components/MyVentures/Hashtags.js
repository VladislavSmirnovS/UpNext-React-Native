import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import Input from 'components/MyVentures/Input'
import Button from 'components/Control/Button'
import { setAppAlert } from 'store/app/app.actions'
import { updateTextHashtags } from 'store/startup/startup.actions'
import { useTeam } from 'store/team/team.uses'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import Images from 'appearance/images'

export default ({ onSave, localActivity }) => {
  const dispatch = useDispatch()
  const team = useTeam()

  const [hashtags, setHashtags] = useState([])
  const [hashtag, setHashtag] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setHashtags(team?.hashtags || [])
  }, [team])

  useEffect(() => {
    if (hashtag) {
      onPress()
    }
  }, [hashtag])

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const onPress = () => {
    if (localActivity?.foreign_id || !localActivity) {
      onAddHashtag()
    } else {
      dispatch(showHashtagError())
    }
  }

  const onAddHashtag = () => {
    const hashtagsFromInput = getHashtagsFromInput(hashtag)

    if (hashtagsFromInput.some(item => item?.length > 15)) {
      dispatch(showHashtagLengthError())
      return
    }

    setHashtag(null)

    const newHashtags = hashtags ? [...hashtags, ...hashtagsFromInput] : hashtagsFromInput
    setHashtags(newHashtags)

    onSave({ resTeam: { ...team, hashtags: newHashtags } })
    if (localActivity?.id) {
      dispatch(updateTextHashtags(localActivity?.id, newHashtags))
    }
  }

  const onDeleteHashtag = deletedIndex => {
    const newHashtags = hashtags.filter((item, index) => index !== deletedIndex)
    setHashtags(newHashtags)
  }

  const getHashtagsFromInput = value => {
    return value
      ?.split(/\r?\n|\r/)
      ?.map(item => removeSymbols(item))
      ?.filter(item => item?.length)
  }

  const removeSymbols = value => {
    return value
      ?.replace(/\s{2,}/g, ' ')
      .trim()
      ?.split(' ')
      .join('_')
      .replace(/#/g, '')
  }

  const onChangesEnd = newValue => {
    const newHashtags = getHashtagsFromInput(newValue)
    setHashtag(newHashtags.join('\r\n'))
  }

  const onCancelPress = () => {
    setHashtags(team?.hashtags || [])
    toggleEditMode()
  }

  const onSavePress = () => {
    setLoading(true)
    onSave({
      resTeam: { ...team, hashtags },
      callback: () => {
        setLoading(false)
      },
    })
    if (localActivity?.id) {
      dispatch(updateTextHashtags(localActivity?.id, hashtags))
    }
    toggleEditMode()
  }

  const renderHashtag = (hashtag, index) => {
    const onDeletePress = () => {
      onDeleteHashtag(index)
    }

    return (
      <View>
        <BlueText color={Colors.TEXT_DARK_PURPLE} key={`${hashtag}-${index}`}>
          #{hashtag}
        </BlueText>
        {editMode ? (
          <>
            <Spacer w={5} />
            <TouchableOpacity onPress={onDeletePress}>
              <DeleteIcon source={Images.closeCircle} resizeMode="contain" />
            </TouchableOpacity>
          </>
        ) : null}
        <Spacer w={15} />
      </View>
    )
  }

  return (
    <>
      <Row>
        <BlueText>#</BlueText>
        <Input
          value={hashtag}
          onSave={onChangesEnd}
          placeholder="Add hashtags"
          color={Colors.TEXT_BRIGHT_BLUE}
          placeholderTextColor={Colors.TEXT_BRIGHT_BLUE}
          textSizes="font-size:24px;"
        />
      </Row>
      <View>
        <Row>{hashtags?.map(renderHashtag)}</Row>
        {/* {!editMode && hashtags?.length ? (
          <EditButton onPress={toggleEditMode}>
            <EditIcon source={Images.uploadWhiteEdit} resizeMode="contain" />
          </EditButton>
        ) : null} */}
      </View>
      {editMode ? (
        <>
          <Spacer h={10} />
          <ButtonsGroup>
            <Button
              text="Cancel"
              height={26}
              width="80px"
              backgroundColor={Colors.COMMON_RED}
              onPress={onCancelPress}
            />
            <Button text="Save" height={26} width="80px" onPress={onSavePress} disabled={loading} />
          </ButtonsGroup>
        </>
      ) : null}
    </>
  )
}

const showHashtagError = () =>
  setAppAlert({
    text:
      'Sorry, but you cannot add hashtags, change the video and the hashtags will be available to you',
    okText: 'Got it',
    onConfirm: () => {},
  })

const showHashtagLengthError = () =>
  setAppAlert({
    text: 'Sorry, the length of one hashtag must not exceed 15 characters',
    okText: 'Got it',
    onConfirm: () => {},
  })

const Row = styled.View`
  padding: 0 50px;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`

const BlueText = styled(Texts.TitleText)`
  color: ${p => p.color || Colors.TEXT_BRIGHT_BLUE};
  font-weight: 700;
`

const TouchableOpacity = styled.TouchableOpacity`
  width: 15px;
`

const View = styled.View`
  flex-direction: row;
`

const DeleteIcon = styled.Image`
  align-self: center;
  height: 15px;
  width: 15px;
  tint-color: ${Colors.COMMON_RED};
  position: absolute;
  top: 0;
  right: 0;
`

const EditIcon = styled.Image`
  align-self: center;
  height: 15px;
  width: 15px;
  tint-color: ${Colors.COMMON_BLUE};
`

const EditButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
`

const ButtonsGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
`
