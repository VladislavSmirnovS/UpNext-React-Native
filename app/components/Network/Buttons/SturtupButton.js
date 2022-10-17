import React from 'react'
import { useDispatch } from 'react-redux'
import CommonButton from 'components/Network/Buttons/CommonButton'
import { openLobbyCurrentTeamPage } from 'services/navigation'
import mixpanel from 'services/mixpanel'

export default ({ navigation, team, index }) => {
  const dispatch = useDispatch()

  const onGoToCurrentTeamPage = () => {
    const params = { teamId: team?.id }
    dispatch(openLobbyCurrentTeamPage(navigation, params))
    mixpanel.trackEvent('click on "My startup"')
  }

  const getName = () => {
    const teamName = `"${team.name}"`
    const defaultName = `#${index + 1}`
    const startupName = team.name ? teamName : defaultName
    return `Startup ${startupName}`
  }

  return <CommonButton text={getName()} onPress={onGoToCurrentTeamPage} />
}
