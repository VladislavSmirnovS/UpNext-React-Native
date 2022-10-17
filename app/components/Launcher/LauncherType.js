import React from 'react'
import styled from 'styled-components'
import Header from 'components/Launcher/Header'
import LauncherTypeButton from 'components/Launcher/LauncherTypeButton'
import Texts from 'appearance/texts'
import { LAUNCHER_CANDIDATE_KEY, LAUNCHER_SEARCHER_KEY } from 'constants'

export default ({ item, onSave }) => {
  const onCandidatePress = () => {
    onSave({ ...item, launcher_type: LAUNCHER_CANDIDATE_KEY })
  }

  const onSearchPress = () => {
    onSave({ ...item, launcher_type: LAUNCHER_SEARCHER_KEY })
  }

  return (
    <>
      <Header title="Choose one" item={item} withLaunchType={false} />
      <Row>
        <Wrapper>
          <LauncherTypeButton
            type={LAUNCHER_CANDIDATE_KEY}
            isActive={item?.launcher_type === LAUNCHER_CANDIDATE_KEY}
            title="Candidate"
            description="Offer your skills to the community"
            onPress={onCandidatePress}
            disabled={item?.launcher_type === LAUNCHER_CANDIDATE_KEY}
          />
        </Wrapper>
        <Wrapper>
          <LauncherTypeButton
            type={LAUNCHER_SEARCHER_KEY}
            isActive={item?.launcher_type === LAUNCHER_SEARCHER_KEY}
            title="Search"
            description="Search for skills to contribute to your startup"
            onPress={onSearchPress}
            disabled={item?.launcher_type === LAUNCHER_SEARCHER_KEY}
          />
        </Wrapper>
      </Row>
    </>
  )
}

const TouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`

const ICON_SIZE = 100

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

const Icon = styled.Image`
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
  align-self: center;
`

const CenteredText = styled(Texts.TitleText)`
  text-align: center;
`

const Wrapper = styled.View`
  flex: 1;
`
