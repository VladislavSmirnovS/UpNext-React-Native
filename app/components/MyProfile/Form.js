import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import UserImageSelector from 'components/MyProfile/UserImageSelector'
import TagsPicker from 'components/MyProfile/TagsPicker'
import ScrollPadder from 'components/Page/ScrollPadder'
import TextInput from 'components/Control/TextInput'
import Select from 'components/Control/Select'
import Button from 'components/Control/Button'
import Gender from 'components/MyProfile/Gender'
import Spacer from 'components/Page/Spacer'
import InputContainer from 'components/Control/InputContainer'
import Input from 'components/MyVentures/Input'
import { setOverflowAnimation } from 'store/app/app.actions'
import { updateUserDetails } from 'store/user/user.actions'
import { useUser } from 'store/user/user.uses'
import { openMyGeneralPage } from 'services/navigation'
import {
  useCountries,
  useGrades,
  useInterestTags,
  useLanguages,
  useRoles,
} from 'store/app/app.uses'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({
  navigation,
  isNameOneLine,
  renderBottom,
  withProfessionalProfile,
  withAvatarSelector,
}) => {
  const dispatch = useDispatch()
  const user = useUser()
  const roles = useRoles()
  const countryOptions = useCountries()
  const gradeOptions = useGrades()
  const languageOptions = useLanguages()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [labelCountry, setLabelCountry] = useState('Country/ Region')
  const [country, setCountry] = useState('')
  const [age, setAge] = useState('')
  const [labelAge, setLabelAge] = useState('Age')
  const [gender, setGender] = useState('')
  const [tags, setTags] = useState([])
  const [languages, setLanguages] = useState([])
  const [role, setRole] = useState('')
  const [suggestedRole, setSuggestedRole] = useState('')

  useEffect(() => {
    setFirstName(user?.first_name || '')
    setLastName(user?.last_name || '')
    setCountry(user?.school_country || '')
    setAge(user?.age || '')
    setGender(user?.gender || '')
    setTags(user?.interest_tags || [])
    setLanguages(user?.languages || [])
  }, [user])

  const onSave = () => {
    const updatedUser = {
      ...user,
      first_name: firstName,
      last_name: lastName,
      school_country: country,
      age,
      gender,
      interest_tags: tags,
      languages,
      role,
    }

    dispatch(
      updateUserDetails(updatedUser, navigation, () => {
        onShowSuccessAnimation()
        dispatch(openMyGeneralPage(navigation))
      }),
    )
  }
  const fullName = `${user?.first_name} ${user?.last_name}` || EMPTY_STRING
  const onShowSuccessAnimation = () => {
    dispatch(setOverflowAnimation({ name: 'profile' }))
  }
  const handleChange = newValue => {
    setRole(newValue)
    setSuggestedRole('')
  }

  const handleChangeAge = newValue => {
    setAge(newValue)
    setLabelAge(newValue)
  }

  const handleChangeCountry = newValue => {
    setCountry(newValue)
    setLabelCountry(newValue)
  }


  const handleChangeSuggested = newValue => {
    setSuggestedRole(newValue)
    setRole(newValue)
  }

  const isDisabled = () => {
    return !firstName || !lastName || !country || !age || !gender
  }

  return (
    <>
      <ScrollPadder noPadding showsVerticalScrollIndicator={false}>
        {withAvatarSelector ? (
          <TitleContainer>
            <UserImageSelector navigation={navigation} />
            <Spacer h={20} />
            <FullName>{fullName}</FullName>
          </TitleContainer>
        ) : null}

        <Row isNameOneLine={isNameOneLine}>
          <Select label={labelAge} selection={age} options={gradeOptions} onChange={handleChangeAge} required />
          <Select
            label={labelCountry}
            value="country"
            selection={country}
            options={countryOptions}
            onChange={handleChangeCountry}
            required
          />
          {isNameOneLine ? <Spacer w={10} /> : null}
          <Spacer h={10} />
          <InputContainer
            backgroundColor={Colors.WHITE}
            borderColor={Colors.MENU_BLUE}
            borderWidth="0"
            borderBottom
          >
            <Input
              value={role}
              onChange={handleChange}
              placeholder="Choose your role"
              placeholderTextColor={Colors.TEXT_DARK_BLUE}
              color={Colors.TEXT_DARK_BLUE}
              textSizes={Texts.sizes.NewHeaderSize}
            />
          </InputContainer>
          <Spacer h={10} />
          <Roles>Suggested roles</Roles>
          <Tags>
            {roles &&
              roles.map(item => (
                <SelectedTag
                  key={item}
                  text={item}
                  selection={suggestedRole}
                  onSelect={handleChangeSuggested}
                />
              ))}
          </Tags>
        </Row>
      </ScrollPadder>
      <Button text="Save" onPress={onSave} disabled={isDisabled()} backgroundColor={'red'} />
    </>
  )
}

const Row = styled.View`
  width: 100%;
  flex-direction: ${p => (p.isNameOneLine ? 'row' : 'column')};
`

const FullName = styled.Text`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 28px;
  margin-bottom: 5px;
  font-weight: 700;
`
const Roles = styled.Text`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 400;
`

const TitleContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Tags = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`
const SelectedTag = ({ text, selection, onSelect }) => {
  const isSelected = selection.includes(text)

  const onPress = () => {
    onSelect(text, !isSelected)
  }

  return (
    <TagView selected={isSelected} onPress={onPress}>
      <TagText selected={isSelected}>{text}</TagText>
    </TagView>
  )
}

const TagView = styled.TouchableOpacity`
  border: 2px solid ${p => (p.selected ? Colors.MENU_PURPLE : Colors.MENU_BLUE)};
  border-radius: 18px;
  padding: 5px 10px;
  height: 27px;
  margin: 0 10px 7px 0;
  min-width: 63px;
  background: ${p => (p.selected ? 'transparent' : 'transparent')};
`

const TagText = styled(Texts.TutorialText)`
  font-size: 16px;
  color: ${p => (p.selected ? Colors.MENU_PURPLE : Colors.MENU_BLUE)};
`
