import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import LauncherTypeButton from 'components/Launcher/LauncherTypeButton'
import { getFiltersOptions } from 'store/launcher/launcher.actions'
import { useLaunchersFiltersOptions } from 'store/launcher/launcher.uses'
import { LAUNCHER_CANDIDATE_KEY, LAUNCHER_SEARCHER_KEY } from 'constants'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ filters = {}, setFilters }) => {
  const dispatch = useDispatch()

  const launchersFiltersOptions = useLaunchersFiltersOptions()

  const isEmpty = !filters?.launcher_type
  const isCandidateActive = filters?.launcher_type === LAUNCHER_CANDIDATE_KEY
  const isSearchActive = filters?.launcher_type === LAUNCHER_SEARCHER_KEY

  useEffect(() => {
    if (!launchersFiltersOptions) {
      dispatch(getFiltersOptions())
    }
  }, [])

  const onChangeFilter = newFilters => {
    setFilters({ ...filters, ...newFilters })
  }

  const onCandidatePress = () => {
    onChangeFilter(isEmpty ? { launcher_type: LAUNCHER_SEARCHER_KEY } : { launcher_type: null })
  }

  const onSearchPress = () => {
    onChangeFilter(isEmpty ? { launcher_type: LAUNCHER_CANDIDATE_KEY } : { launcher_type: null })
  }

  const getFilters = () => {
    return filters?.skills?.length
      ? [
          ...filters?.skills,
          ...launchersFiltersOptions?.skills?.filter(i => !filters?.skills.includes(i)),
        ]
      : launchersFiltersOptions?.skills
  }

  const renderItem = ({ item }) => {
    return (
      <SkillFilter
        item={item}
        filters={filters}
        options={launchersFiltersOptions?.skills}
        setFilters={onChangeFilter}
      />
    )
  }

  return (
    <>
      <Row>
        <LauncherTypeButton
          key={LAUNCHER_CANDIDATE_KEY}
          type={LAUNCHER_CANDIDATE_KEY}
          isActive={isEmpty || isCandidateActive}
          onPress={onCandidatePress}
          size={ICON_SIZE}
          disabled={isCandidateActive}
        />
        <LauncherTypeButton
          key={LAUNCHER_SEARCHER_KEY}
          type={LAUNCHER_SEARCHER_KEY}
          isActive={isEmpty || isSearchActive}
          onPress={onSearchPress}
          size={ICON_SIZE}
          disabled={isSearchActive}
        />
      </Row>
      <Centered>
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          data={getFilters()}
          renderItem={renderItem}
          keyExtractor={getKey}
          style={{ width: width - 30, paddingTop: 20, paddingBottom: 20 }}
        />
      </Centered>
    </>
  )
}

const getKey = item => {
  return item
}

const SkillFilter = ({ item, filters, options, setFilters }) => {
  const isEmpty = !filters?.skills?.length
  const isActive = filters?.skills?.includes(item)
  const isSelected = isActive || isEmpty

  const onPress = () => {
    if (isSelected) {
      setFilters({ skills: [...(filters?.skills || options)?.filter(i => i !== item)] })
    } else {
      setFilters({ skills: [...(filters?.skills || []), item] })
    }
  }

  const isDisabled = () => {
    return isActive && filters?.skills?.length === 1
  }

  return (
    <Item onPress={onPress} disabled={isDisabled()} isSelected={isSelected}>
      {isSelected ? (
        <Texts.BoldBlueTitleText>{item}</Texts.BoldBlueTitleText>
      ) : (
        <Texts.GreyTitleText>{item}</Texts.GreyTitleText>
      )}
    </Item>
  )
}

const Item = styled.TouchableOpacity`
  border-bottom-color: ${p => (p.isSelected ? Colors.COMMON_BLUE : 'transparent')};
  border-bottom-width: 2px;
  margin-right: 10px;
  padding: 3px 0;
`

const { width } = Dimensions.get('window')

const ICON_SIZE = 60

const Row = styled.View`
  flex-direction: row;
`

const Centered = styled.View`
  align-items: center;
`

const Icon = styled.Image`
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
  align-self: center;
`

const FlatList = styled.FlatList``
