import React from 'react'
import styled from 'styled-components'
import FastImage from 'react-native-fast-image'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import Spacer from 'components/Page/Spacer'
import { useCountries, userCountriesFlags } from 'store/app/app.uses'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { getUserAvatarProps, getUserFullName } from 'utils/user'

export default ({ navigation, item }) => {
  const countryOptions = useCountries()
  const countryFlagsOptions = userCountriesFlags()

  const fullName = getUserFullName(item)

  const getCountryFlagImage = () => {
    if (!countryOptions || !countryFlagsOptions || !item?.school_country) {
      return null
    }

    const countryIndex = countryOptions.findIndex(country => country == item?.school_country)
    const source = countryIndex !== -1 && countryFlagsOptions[countryIndex]
    return source && source !== '-' ? source : null
  }

  return (
    <MemberContainer>
      <UserAvatarLobbyBtn
        {...getUserAvatarProps(item)}
        navigation={navigation}
        size={AVATAR_SIZE}
      />
      <Spacer h={10} />

      {getCountryFlagImage() ? (
        <WrapFlag>
          <Flag source={{ uri: getCountryFlagImage() }} resizeMode="cover" />
        </WrapFlag>
      ) : null}

      {item?.role && item?.role !== 'null' ? (
        <Texts.BoldTitleText>{item?.role}</Texts.BoldTitleText>
      ) : (
        <Spacer h={20} />
      )}
      {fullName ? <Name>{fullName}</Name> : null}
      <Spacer h={10} />
    </MemberContainer>
  )
}

const AVATAR_SIZE = 100

const WrapFlag = styled.View`
  border-radius: 20px;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  right: 10px;
  align-self: center;
  overflow: hidden;
`

const Flag = styled(FastImage)`
  height: 100%;
  width: 100%;
  background: #fff;
`

const MemberContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 150px;
`

const Name = styled(Texts.TitleText)`
  font-weight: 700;
  color: ${Colors.TEXT_DARK_PURPLE};
  width: 150px;
  text-align: center;
`
