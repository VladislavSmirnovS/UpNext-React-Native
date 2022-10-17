import { useState } from 'react'

export default () => {
  const [isShowStats, setIsShowStats] = useState(false)
  const [isShowReport, setIsShowReport] = useState(false)
  const [selectedItem, setSelectedItem] = useState()

  const showReport = (item, feedGroup) => {
    if (feedGroup === 'my_videos') {
      setIsShowStats(true)
    } else {
      setIsShowReport(true)
    }
    setSelectedItem(item)
  }

  const closeReport = () => {
    setIsShowReport(false)
    setSelectedItem()
  }

  const closeStats = () => {
    setIsShowStats(false)
    setSelectedItem()
  }

  return { isShowReport, isShowStats, selectedItem, showReport, closeReport, closeStats }
}
