import { useState } from 'react'

export default () => {
  const [isShowReport, setIsShowReport] = useState(false)
  const [selectedItem, setSelectedItem] = useState()

  const showReport = (item, feedGroup) => {
    if (feedGroup !== 'my_videos') {
      setIsShowReport(true)
      setSelectedItem(item)
    }
  }

  const closeReport = () => {
    setIsShowReport(false)
    setSelectedItem()
  }

  return { isShowReport, selectedItem, showReport, closeReport }
}
