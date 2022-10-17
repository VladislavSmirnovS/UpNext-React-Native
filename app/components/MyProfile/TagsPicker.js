import React, { useState } from 'react'
import styled from 'styled-components'
import InputLabel from 'components/Control/InputLabel'
import ScrollPadder from 'components/Page/ScrollPadder'
import Card from 'components/Control/Card'
import Tag from 'components/MyProfile/Tag'
import Spacer from 'components/Page/Spacer'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import Images from 'appearance/images'

export default ({ label, selection, required, options, onChange, maxCount }) => {
  const [isVisible, setIsVisible] = useState(false)

  const onShow = () => {
    setIsVisible(true)
  }

  const onHide = () => {
    setIsVisible(false)
  }

  return (
    <>
      {label ? <InputLabel label={label} required={required} /> : null}
      <Spacer h={10} />
      <Tags>
        {selection && selection.map(item => <Tag key={item} text={item} isSelected={true} />)}
      </Tags>
      <RightView>
        <TouchableOpacity onPress={onShow}>
          <BlueText>Edit tags</BlueText>
        </TouchableOpacity>
      </RightView>
      <Modal
        isVisible={isVisible}
        options={options}
        selection={selection}
        onChange={onChange}
        maxCount={maxCount}
        onClose={onHide}
      />
    </>
  )
}

const Modal = ({ isVisible, options, selection, onChange, maxCount, onClose }) => {
  const [error, setError] = useState('')

  const onSelect = (item, isSelected) => {
    const isOk = isInRange(isSelected)

    if (isSelected) {
      if (isOk) {
        const res = selection ? [...selection] : []
        res.push(item)
        onChange(res)
      }
    } else {
      onChange(selection.filter(selectionItem => selectionItem !== item))
    }
  }

  const isInRange = isSelected => {
    const length = isSelected ? selection.length + 1 : selection.length - 1
    if (length <= maxCount) {
      setError('')
      return true
    } else {
      setError(`Please select up to ${maxCount} tags`)
      return false
    }
  }

  const handleClose = () => {
    setError('')
    onClose()
  }

  return (
    <ModalContainer animationType="slide" transparent={true} visible={isVisible}>
      <CenteredView>
        <CardView noPadding>
          <RightView>
            <TouchableOpacity onPress={handleClose}>
              <Icon source={Images.closeCircle} resizeMode={'contain'} />
            </TouchableOpacity>
          </RightView>
          <ErrorText>{error}</ErrorText>
          <ScrollPadder>
            <Tags>
              {options &&
                options.map(item => (
                  <SelectedTag key={item} text={item} selection={selection} onSelect={onSelect} />
                ))}
            </Tags>
          </ScrollPadder>
        </CardView>
      </CenteredView>
    </ModalContainer>
  )
}

const SelectedTag = ({ text, selection, onSelect }) => {
  const isSelected = selection.includes(text)

  const onPress = () => {
    onSelect(text, !isSelected)
  }

  return (
    <TagView selected={isSelected} onPress={onPress}>
      <TagText selected={isSelected}>{text}</TagText>
    </TagView>
  )
}

const Tags = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

const TagView = styled.TouchableOpacity`
  border: 2px solid ${Colors.COMMON_BLUE};
  border-radius: 10px;
  padding: 5px 10px;
  margin: 0 5px 5px 0;
  background: ${p => (p.selected ? Colors.COMMON_BLUE : 'transparent')};
`

const TagText = styled(Texts.TutorialText)`
  color: ${p => (p.selected ? Colors.WHITE : Colors.BLACK)};
`

const RightView = styled.View`
  align-items: flex-end;
  width: 100%;
`

const BlueText = styled(Texts.SubtitleText)`
  color: ${Colors.COMMON_BLUE};
`

const TouchableOpacity = styled.TouchableOpacity`
  align-items: center;
`

const ModalContainer = styled.Modal``

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
`

const CardView = styled(Card)`
  max-height: 75%;
  padding: 10px;
`

const Icon = styled.Image`
  height: 40px;
  width: 40px;
`

const ErrorText = styled(Texts.SubtitleText)`
  color: ${Colors.COMMON_RED};
  text-align: center;
`
