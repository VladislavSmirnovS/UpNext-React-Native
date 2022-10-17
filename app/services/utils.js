import Dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
Dayjs.extend(relativeTime)
const utc = require('dayjs/plugin/utc')
Dayjs.extend(utc)
const isToday = require('dayjs/plugin/isToday')
Dayjs.extend(isToday)
const isYesterday = require('dayjs/plugin/isYesterday')
Dayjs.extend(isYesterday)

export const getDate = timestamp => {
  if (!timestamp) {
    return null
  }
  return Dayjs(timestamp).format('DD/MM/YYYY HH:mm')
}

export const getHumanizeTimestamp = timestamp => {
  if (!timestamp) {
    return null
  }
  const time = Dayjs(new Date(timestamp))
  const now = Dayjs()
    .utc()
    .local()
  return typeof time.from === 'function' && time.from(now)
}

export const getShortTimestamp = timestamp => {
  if (!timestamp) {
    return null
  }
  const time = Dayjs(new Date(timestamp))
  const today = Dayjs()
    .utc()
    .local()

  if (time.isYesterday()) {
    return '1d ago'
  }

  if (time.isToday()) {
    return 'Today'
  }

  const res = typeof time.from === 'function' && time.from(today)
  return res
    .replace(' days', 'd')
    .replace('a day', '1d')
    .replace('months', 'mo')
    .replace('a month', '1mo')
}

export const numberArray = (from, to) => {
  const arr = []
  for (let i = from; i < to + 1; i++) {
    arr.push(i)
  }
  return arr
}

export const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getNotificationData = message => {
  const index = message ? message.indexOf('&') : -1
  const stringParams = index !== -1 ? message.substring(0, index) : null
  const textMessage = index !== -1 ? message.substring(index + 1, message.length) : message
  return {
    param: stringParams ? JSON.parse(stringParams) : {},
    text: textMessage,
  }
}

export const getShortVersionNotification = message => {
  const MAX_LENGTH = 25
  return message.length > MAX_LENGTH ? `${message.substring(0, MAX_LENGTH)}...` : message
}

export const parseVideoUrl = url => {
  let type = 'video'
  const stringUrl = url ? url.toString() : ''

  stringUrl.match(
    /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/,
  )

  if (stringUrl.includes('/vimeo.com')) {
    type = 'vimeo'
  }

  return {
    id: RegExp.$6,
    type,
  }
}

export const isThisWeek = date => {
  const now = new Date()

  const weekDay = (now.getDay() + 6) % 7 // Make sure Sunday is 6, not 0
  const monthDay = now.getDate()
  const mondayThisWeek = monthDay - weekDay

  const startOfThisWeek = new Date(+now)
  startOfThisWeek.setDate(mondayThisWeek)
  startOfThisWeek.setHours(0, 0, 0, 0)

  const startOfNextWeek = new Date(+startOfThisWeek)
  startOfNextWeek.setDate(mondayThisWeek + 7)

  return date >= startOfThisWeek && date < startOfNextWeek
}

export const validURL = str => {
  return /((?:http|https):\/\/[^\s]+)/gi.test(str)
}

export const validFacebookURL = str => {
  const patern = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/gi
  return patern.test(str)
}

export const validYoutubeURL = str => {
  const patern = /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gi
  return patern.test(str)
}

export const validTiktokURL = str => {
  const patern = /(?:https?:\/\/)?(?:www\.)?(tiktok).com\/[^\s]+/gi
  return patern.test(str)
}

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index
}

export const secondsToHms = d => {
  const time = Number(d)
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const s = Math.floor((time % 3600) % 60)

  return (
    h.toString().padStart(2, '0') +
    ':' +
    m.toString().padStart(2, '0') +
    ':' +
    s.toString().padStart(2, '0')
  )
}

export const getLimitFromSec = second => {
  const min = Math.trunc(second / 60)
  if (min > 0) {
    return `${min} min`
  }
  return `${second?.toFixed(0)} sec`
}

// const requiredFieldsEx = [{
//   field: 'name',
//   errorText: 'Shown error text',
// }]
export const getEmptyFieldsFromObject = (object, requiredFields) => {
  let emptyFields = []
  requiredFields.forEach(obj => {
    if (!object?.[obj?.field]?.length) {
      const res = { ...obj, value: object?.[obj?.field] }
      emptyFields.push(res)
    }
  })
  return emptyFields
}
