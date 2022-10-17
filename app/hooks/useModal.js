import { useState } from 'react'

export default () => {
  const [isVisible, setIsVisible] = useState(false)

  const onShow = () => {
    setIsVisible(true)
  }

  const onClose = () => {
    setIsVisible(false)
  }

  return [isVisible, onShow, onClose]
}
