import React from 'react'
import styled from 'styled-components'
import FastImage from 'react-native-fast-image'
import Avatar from 'components/Common/Avatar'
import { useCountries, userCountriesFlags } from 'store/app/app.uses'
import Colors from 'appearance/colors'
import { getUserAvatarProps } from 'utils/user'

export default ({ item, size, borderRadius }) => {
  const countryOptions = useCountries()
  const countryFlagsOptions = userCountriesFlags()

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
      <Avatar {...getUserAvatarProps(item)} size={size} borderRadius={borderRadius} />
      {getCountryFlagImage() ? (
        <WrapFlag>
          <Flag source={{ uri: getCountryFlagImage() }} resizeMode="cover" />
        </WrapFlag>
      ) : null}
      {item?.is_online ? <ActiveStatus /> : null}
    </MemberContainer>
  )
}

const WrapFlag = styled.View`
  border-radius: 20px;
  height: 35px;
  width: 35px;
  position: absolute;
  top: -5px;
  right: -15px;
  align-self: center;
  overflow: hidden;
`

const Flag = styled(FastImage)`
  height: 100%;
  width: 100%;
  background: #fff;
`

const ActiveStatus = styled.View`
  border-radius: 10px;
  height: 20px;
  width: 20px;
  position: absolute;
  right: 5px;
  bottom: 0;
  background: ${Colors.BUTTON_GREEN};
`

const MemberContainer = styled.View`
  justify-content: center;
  align-items: center;
`
