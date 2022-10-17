import React from 'react'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import imagepicker from 'services/imagepicker'

export default ({ onCancel, onError, onUpload, optionTitle, isCenter, isFull, children }) => {
  const dispatch = useDispatch()

  const onStartPicker = () => {
    imagepicker.startImagePicker({ title: optionTitle, onUpload, onCancel, onError, dispatch })
  }

  return (
    <TouchableOpacity onPress={onStartPicker} isCenter={isCenter} isFull={isFull}>
      {children}
    </TouchableOpacity>
  )
}

const TouchableOpacity = styled.TouchableOpacity`
  align-self: ${p => (p.isCenter ? 'center' : 'flex-start')};
  ${p => p.isFull && fullSize}
`

const fullSize = css`
  width: 100%;
  flex: 1;
`
