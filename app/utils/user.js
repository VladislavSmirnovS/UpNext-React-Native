export const getFullName = (id, firstName, lastName) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`
  }

  if (!firstName && !lastName) {
    return id
  }

  return firstName || lastName
}

export const getInitials = (id = 'xx', firsName = '', lastName = '') => {
  if (!firsName && !lastName) {
    return getFirstLetters(id, 2)
  }

  if (firsName && lastName) {
    return `${getFirstLetters(firsName, 1)}${getFirstLetters(firsName, 1)}`
  }

  if (firsName) {
    return getFirstLetters(firsName, 2)
  }

  return getFirstLetters(lastName, 2)
}

const getFirstLetters = (str = '', amount) => {
  return str.toString().substr(0, amount)
}

export const getUserChatMember = (id, firsName, avatar) => {
  return { id, nickname: firsName || id, avatar }
}

//-- User fields --//
export const getUserId = (user = {}) => {
  return user?.user_id || user?.id
}

export const getUserAvatar = (user = {}) => {
  return user?.avatar_small || user?.avatar
}

export const getUserFullName = (user = {}) => {
  const userId = getUserId(user)
  return getFullName(userId, user?.first_name, user?.last_name)
}

export const getUserFullNameWithAge = (user = {}) => {
  const fullName = getUserFullName(user)
  const name = fullName || ''
  const age = user?.age || ''
  const separator = fullName && age ? ', ' : ''

  return `${name}${separator}${age}`
}

export const getUserAgeWithCountry = (user = {}) => {
  return user?.age && user?.school_country
    ? user?.age + ', ' + user?.school_country
    : user?.age || user?.school_country
}

export const getUserAvatarProps = (user = {}) => {
  return {
    uri: getUserAvatar(user),
    id: getUserId(user),
    firsName: user?.first_name,
    lastName: user?.last_name,
  }
}
