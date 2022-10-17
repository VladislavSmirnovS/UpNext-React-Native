import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { withNavigationFocus } from 'react-navigation'
import Camera from 'components/Control/Camera'
import { toggleCamera } from 'store/app/app.actions'
import { useCamera } from 'store/app/app.uses'

const CameraView = ({ isFocused }) => {
  const dispatch = useDispatch()
  const camera = useCamera()

  const onHide = () => {
    dispatch(
      toggleCamera({
        isVisible: false,
        cameraOptions: {
          type: 'photo',
        },
        launchImageOptions: {},
        onImageLibraryLoad: () => {},
        callback: () => {},
      }),
    )
  }

  return isFocused ? (
    <Camera
      isVisible={!!camera?.isVisible}
      type={camera?.cameraOptions?.type}
      maxDuration={camera?.cameraOptions?.maxDuration}
      maxDurationError={camera?.cameraOptions?.maxDurationError}
      launchImageOptions={camera?.launchImageOptions}
      onImageLibraryLoad={camera?.onImageLibraryLoad}
      onConfirm={camera?.callback}
      onHide={onHide}
    />
  ) : null
}

const arePropsEqual = (prevProps, nextProps) => {
  const isFocusedChanged = prevProps.isFocused === nextProps.isFocused
  return isFocusedChanged
}

export default memo(withNavigationFocus(CameraView), arePropsEqual)
