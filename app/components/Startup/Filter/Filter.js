import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import FilterToggleButton from 'components/Startup/Filter/FilterToggleButton'
import FilterOptions from 'components/Startup/Filter/FilterOptions'
import { getTeam, addNewTeam } from 'store/team/team.actions'
import { useTeamId, useTeamsOptions } from 'store/team/team.uses'

export default () => {
  const dispatch = useDispatch()
  const teamsOptions = useTeamsOptions()
  const teamId = useTeamId()

  const [options, setOptions] = useState([])
  const [filter, setFilter] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (teamsOptions) {
      const options = getOptions()
      setOptions(options)
    }
  }, [teamsOptions])

  useEffect(() => {
    if (options?.length) {
      updateFilter()
    }
  }, [options])

  useEffect(() => {
    if (teamId !== filter?.id) {
      updateFilter()
    }
  }, [teamId])

  const updateFilter = () => {
    const el = options.find(item => item?.id === teamId)
    setFilter(el || options[0])
  }

  const getOptions = () => {
    const defaultTeams = [{ id: 1, index: 1 }]
    const teams = teamsOptions?.length ? teamsOptions : defaultTeams
    return teams
      ? teams?.map((item, index) => {
          return { ...item, index, name: item?.name || `Startup #${index + 1}` }
        })
      : null
  }

  const onSelected = item => {
    setFilter(item)
    setIsOpen(false)
    changeDefaultTeam(item)
  }

  const changeDefaultTeam = item => {
    if (item && item?.id !== teamId) {
      dispatch(getTeam(item?.id))
    }
  }

  const renderFilterToggleButton = () => {
    const text = filter?.name
    return <FilterToggleButton text={text} isOpen={isOpen} setIsOpen={setIsOpen} />
  }

  const onAddNewStartup = () => {
    dispatch(addNewTeam())
    setIsOpen(false)
  }

  return (
    <>
      {renderFilterToggleButton()}
      <FilterOptions
        isOpen={isOpen}
        options={options}
        selected={filter}
        onSelected={onSelected}
        setIsOpen={setIsOpen}
        renderFilterToggleButton={renderFilterToggleButton}
        onAddNewStartup={onAddNewStartup}
      />
    </>
  )
}
