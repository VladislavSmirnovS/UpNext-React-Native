import React from 'react'
import CommonButton from 'components/Network/Buttons/CommonButton'
import Colors from 'appearance/colors'

export default ({ ...props }) => {
  return <CommonButton text="Connecting..." color={Colors.RED_ORANGE} {...props} />
}
