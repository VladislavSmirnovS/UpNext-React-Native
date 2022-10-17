import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import FilterToggleButton from 'components/Notifications/FilterToggleButton'
import FilterOptions from 'components/Notifications/FilterOptions'
import { setNotificationsFilter } from 'store/notification/notification.actions'
import { useFilter } from 'store/notification/notification.uses'
import Colors from 'appearance/colors'

const OPTIONS = [
  { key: 'all_activity', title: 'All activity', icon: 'notifications' },
  { key: 'upnext', title: 'From UpNext', icon: 'upnext' },
  { key: 'comments', title: 'Comments', icon: 'chat', iconColor: Colors.BLACK },
  { key: 'coins', title: 'Coins', icon: 'coin' },
  { key: 'requests', title: 'Requests', icon: 'menu_network' },
]

export default () => {
  const dispatch = useDispatch()

  const filter = useFilter()

  const [isOpen, setIsOpen] = useState(false)

  const onSelected = item => {
    dispatch(setNotificationsFilter(item))
    setIsOpen(false)
  }

  const renderFilterToggleButton = () => {
    return <FilterToggleButton text={filter?.title} isOpen={isOpen} setIsOpen={setIsOpen} />
  }

  return (
    <>
      {renderFilterToggleButton()}
      <FilterOptions
        isOpen={isOpen}
        options={OPTIONS}
        selected={filter}
        onSelected={onSelected}
        renderFilterToggleButton={renderFilterToggleButton}
      />
    </>
  )
}
