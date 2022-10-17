var React = (window.React = require('react'))
var Config = (window.Config = require('../../config'))

import axiosInstance from 'services/axios'
import axios from 'axios'

const POST = 'post'
const GET = 'get'

const CancelToken = axios.CancelToken
let source = null

class Api {
  axiosRequest(url, type, body = {}) {
    return new Promise((resolve, reject) => {
      axiosInstance[type](url, body)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  trackStartSession = () => {
    return this.axiosRequest('track_start_session', POST)
  }

  trackEndSession = () => {
    return this.axiosRequest('track_end_session', POST)
  }

  getCommonStreamioToken = () => {
    return this.axiosRequest('get_common_streamio_token', GET)
  }

  getVideoUrlStats(video_url, activity_id) {
    return this.axiosRequest('get_feed_video_stats', POST, {
      video_url,
      activity_id,
    })
  }

  getVideoViewStats = activity_id => {
    return this.axiosRequest('get_video_view_stats', POST, {
      activity_id,
    })
  }

  addTeamPainVideoPart = (team_id, video_part_type, url) => {
    return this.axiosRequest('add_team_pain_video_part', POST, {
      team_id,
      video_part_type,
      url,
    })
  }

  getProgressUploadVideoStatus = upload_url => {
    return this.axiosRequest('get_progress_upload_video_status', POST, {
      upload_url,
    })
  }

  removeTeamPainVideoParts = team_id => {
    return this.axiosRequest('remove_team_pain_video_part', POST, {
      team_id,
    })
  }

  getTeamPainVideoParts = team_id => {
    return this.axiosRequest('get_team_pain_video_parts', POST, {
      team_id,
    })
  }

  setTeamPainVideoPartMergedStatus = (team_id, video_part_type) => {
    return this.axiosRequest('set_team_pain_video_part_merged_status', POST, {
      team_id,
      video_part_type,
    })
  }

  getAppStats() {
    return this.axiosRequest('get_app_stats', POST)
  }

  getLoginStats() {
    return this.axiosRequest('get_devices_stats', POST)
  }

  trackStopVideo = (
    activity_id,
    progress,
    duration,
    activity_views_count,
    activity_likes_count,
    activity_favorites_count,
  ) => {
    return this.axiosRequest('track_stop_video', POST, {
      activity_id,
      progress,
      duration,
      activity_views_count,
      activity_likes_count,
      activity_favorites_count,
    })
  }

  getInviteStats() {
    return this.axiosRequest('get_invite_stats', POST)
  }

  getInviteStatsViewEvent(page, size) {
    return this.axiosRequest('get_invite_view_events', POST, {
      page,
      size,
    })
  }

  getInviteStatsCoinEvent(page, size) {
    return this.axiosRequest('get_invite_coin_events', POST, {
      page,
      size,
    })
  }

  getFeedVideoStatsViewEvent(page, size, video_url) {
    return this.axiosRequest('get_feed_video_view_events', POST, {
      page,
      size,
      video_url,
    })
  }

  getFeedVideoStatsCoinEvent(page, size, video_url) {
    return this.axiosRequest('get_feed_video_coin_events', POST, {
      page,
      size,
      video_url,
    })
  }

  loginWithCode(code, device_access_key, device_unique_id, app_version) {
    return this.axiosRequest('login_by_upnext_code', POST, {
      code,
      last_token: '',
      device_access_key,
      device_unique_id,
      app_version,
    })
  }

  signinWithGoogle(
    idToken,
    device_access_key,
    invite_user_id,
    video_url,
    device_unique_id,
    app_version,
  ) {
    return this.axiosRequest('signin_by_google', POST, {
      idToken,
      device_access_key,
      invite_user_id,
      video_url,
      device_unique_id,
      app_version,
    })
  }

  signinWithSnapchat(
    accessToken,
    device_access_key,
    invite_user_id,
    video_url,
    device_unique_id,
    app_version,
  ) {
    return this.axiosRequest('singin_by_snapchat', POST, {
      accessToken,
      device_access_key,
      invite_user_id,
      video_url,
      device_unique_id,
      app_version,
    })
  }

  signinWithApple(
    code,
    type,
    device_access_key,
    invite_user_id,
    video_url,
    device_unique_id,
    app_version,
  ) {
    return this.axiosRequest('signin_by_apple', POST, {
      code,
      type,
      device_access_key,
      invite_user_id,
      video_url,
      device_unique_id,
      app_version,
    })
  }

  updateDeviceAccessToken = device_access_key => {
    return this.axiosRequest('update_device_access_key', POST, {
      device_access_key,
    })
  }

  logout() {
    return this.axiosRequest('logout', POST)
  }

  getCurrentUser(device_unique_id, app_version) {
    return this.axiosRequest('get_current_user', POST, {
      device_unique_id,
      app_version,
    })
  }

  updateUserDetails(user = {}) {
    const getString = value => {
      return value && value !== 'null' ? value : ''
    }

    let formData = new FormData()
    formData.append('id', getString(user.user_id))
    formData.append('first_name', getString(user.first_name))
    formData.append('last_name', getString(user.last_name))
    formData.append('gender', getString(user.gender))
    formData.append('school_country', getString(user.school_country))
    formData.append('age', getString(user.age))
    formData.append('bio', getString(user.bio))
    formData.append('role', getString(user.role))
    formData.append('company_name', getString(user.company_name))
    formData.append('company_url', getString(user.company_url))
    formData.append('company_role', getString(user.company_role))
    formData.append('min_coins_for_feed', getString(user.min_coins_for_feed))

    for (let i = 0; i < user.interest_tags?.length; i++) {
      formData.append('interest_tags[]', user.interest_tags[i])
    }
    for (let i = 0; i < user.languages?.length; i++) {
      formData.append('languages[]', user.languages[i])
    }

    return this.axiosRequest('update_user_details', POST, formData)
  }

  getTeam(team_id) {
    return this.axiosRequest('get_team', POST, {
      team_id,
    })
  }

  getMember(user_id) {
    return this.axiosRequest('get_member', POST, {
      user_id,
    })
  }

  getTeamsWithPainVideo(page, size, search) {
    return this.axiosRequest('get_new_all_all_teams', POST, {
      page,
      size,
      search,
    })
  }

  getMoreTeams(team_id, page, size) {
    return this.axiosRequest('get_more_teams', POST, {
      team_id,
      page,
      size,
    })
  }

  getTeamHashtags(page, size, search) {
    return this.axiosRequest('get_all_team_video_hashtags', POST, {
      page,
      size,
      search,
    })
  }

  getReportVideos(page, size, search) {
    return this.axiosRequest('report_videos', POST, {
      page,
      size,
      search,
    })
  }

  getUserReportVideos() {
    return this.axiosRequest('get_my_report_videos', POST)
  }

  getCurrentFilters() {
    return this.axiosRequest('get_new_current_filters', GET)
  }

  getLauncherFiltersOptions() {
    return this.axiosRequest('get_launcher_current_filters', GET)
  }

  updateTeamDetails(team, activity_time) {
    return this.axiosRequest('update_team_details', POST, {
      team_id: team.id || '',
      name: team.name || '',
      permissions: team.permissions || '',
      pain: team.pain || '',
      solution: team.solution || '',
      open_role: team.open_role || '',
      pain_video: team.pain_video || '',
      secret: team.secret || '',
      hashtags: team.hashtags || [],
      activity_time,
      slogan: team.slogan,
    })
  }

  updateTeamPermssionsFromAdmin(team_id, permissions, poster) {
    return this.axiosRequest('update_team_permissions_from_admin', POST, {
      team_id,
      permissions,
      poster,
    })
  }

  updateTeamAvatar(team, file) {
    let formdata = new FormData()
    formdata.append('team_id', team.id || '')
    formdata.append('permissions', team.permissions || '')
    formdata.append('pain', team.pain || '')
    formdata.append('solution', team.solution || '')
    formdata.append('name', team.name || '')
    formdata.append('open_role', team.open_role || '')
    formdata.append('pain_video', team.pain_video || '')
    formdata.append('secret', team.secret || '')
    for (let i = 0; i < team.hashtags?.length; i++) {
      formdata.append('hashtags[]', team.hashtags[i])
    }
    formdata.append('slogan', team.slogan || '')
    formdata.append('file', file || '')

    return this.axiosRequest('update_team_details', POST, formdata)
  }

  saveTutorials(tutorials) {
    return this.axiosRequest('update_tutorials', POST, {
      tutorials,
    })
  }

  removeUsers(users) {
    return this.axiosRequest('admin_delete_users', POST, {
      users,
    })
  }

  getSessionStats(format, page, size) {
    return this.axiosRequest('get_session_stats_with_pagination', POST, {
      format,
      page,
      size,
      with_users: true,
    })
  }

  getUserCodes(page, size, search) {
    return this.axiosRequest('get_users_codes', POST, {
      page,
      size,
      search,
    })
  }

  getUsersSocials(page, size, search) {
    return this.axiosRequest('get_users_socials', POST, {
      page,
      size,
      search,
    })
  }

  getSocialLoginTypeCounts() {
    return this.axiosRequest('get_social_login_counts', GET)
  }

  getStartupVideos() {
    return this.axiosRequest('get_startup_videos', POST)
  }

  getUsersByIds(ids) {
    return this.axiosRequest('get_users_by_ids', POST, {
      ids,
    })
  }

  getLaunchers(page, size, filters) {
    return this.axiosRequest('get_launchers', POST, {
      page,
      size,
      ...filters,
    })
  }

  getMyLaunchers(page, size) {
    return this.axiosRequest('get_my_launchers', POST, {
      page,
      size,
    })
  }

  createMyLauncher() {
    return this.axiosRequest('create_my_launcher', POST)
  }

  deleteMyLauncher(id) {
    return this.axiosRequest('delete_my_launcher', POST, {
      id,
    })
  }

  updateMyLauncher(item = {}) {
    return this.axiosRequest('update_my_launcher', POST, {
      id: item.id || '',
      launcher_type: item.launcher_type || '',
      skills: item.skills || [],
      video_url: item.video_url || '',
      description: item.description || '',
      is_upload: item.is_upload || false,
      site_url: item.site_url || '',
      tiktok_url: item.tiktok_url || '',
      facebook_url: item.facebook_url || '',
      youtube_url: item.youtube_url || '',
    })
  }

  getFounderMembers(page, size, search, filters) {
    return this.axiosRequest('get_founder_members', POST, {
      page,
      size,
      search,
      ...filters,
    })
  }

  getMentors(page, size) {
    return this.axiosRequest('get_mentors', POST, {
      page,
      size,
    })
  }

  getAllNotifications(page, size, filter) {
    const filterKey = filter?.key.includes('all') ? null : filter?.key || null
    return this.axiosRequest('get_all_notifications', POST, {
      page,
      size,
      filter_key: filterKey,
    })
  }

  createFriendsInvite(user_id) {
    return this.axiosRequest('create_friend_invite', POST, {
      user_id,
    })
  }

  declineFriendsInvite(user_id) {
    return this.axiosRequest('decline_friend_invite', POST, {
      user_id,
    })
  }

  joinNetworkFromLink(user_id) {
    return this.axiosRequest('join_network_from_link', POST, {
      user_id,
    })
  }

  addNotificationChat(user_id, message, sendbird) {
    return this.axiosRequest('add_notification_chat', POST, {
      user_id,
      message,
      sendbird,
    })
  }

  addNotificationStartupChat(message, sendbird, usersIds, chatUrl) {
    let formData = new FormData()
    formData.append('message', message)

    if (sendbird) {
      formData.append('sendbird[channel][channel_url]', sendbird?.channel?.channel_url)
      formData.append('sendbird[channel][channel_type]', sendbird?.channel?.channel_type)
    }

    formData.append('chat_url', chatUrl)
    for (let i = 0; i < usersIds?.length; i++) {
      formData.append('user_ids[]', usersIds[i])
    }

    return this.axiosRequest('add_notification_startup_chat', POST, formData)
  }

  addNotificationCard(team_id, message, sendbird) {
    return this.axiosRequest('add_notification_card', POST, {
      team_id,
      message,
      sendbird,
    })
  }

  addNotificationComment(team_id, activity_id, poster, message) {
    return this.axiosRequest('add_notification_comment', POST, {
      team_id,
      activity_id,
      poster,
      message,
    })
  }

  removeStartupChatNotification(team_id) {
    return this.axiosRequest('remove_startup_chat_notif', POST, {
      team_id,
    })
  }

  reportVideo(team_id, report) {
    return this.axiosRequest('report_video', POST, {
      team_id,
      report,
    })
  }

  getNewNotificationCount() {
    return this.axiosRequest('get_new_notificaion_count', GET)
  }

  readNotificatons(filter) {
    const filterKey = filter?.key.includes('all') ? null : filter?.key || null
    return this.axiosRequest('read_notifications', POST, {
      filter_key: filterKey,
    })
  }

  addNotificationLike(team_id, activity_id, poster, video_url, share_video_url, invite_user_id) {
    return this.axiosRequest('add_notification_like', POST, {
      team_id,
      activity_id,
      poster,
      video_url,
      share_video_url,
      invite_user_id,
    })
  }

  trackFeedVideoView(invite_user_id, video_url) {
    return this.axiosRequest('track_feed_video_view', POST, {
      invite_user_id,
      video_url,
    })
  }

  trackInviteView(invite_user_id) {
    return this.axiosRequest('track_invite_view', POST, {
      invite_user_id,
    })
  }

  removeNotificationLike(team_id, activity_id) {
    return this.axiosRequest('remove_notification_like', POST, {
      team_id,
      activity_id,
    })
  }

  endFeedVideo(activity_id, team_id, poster) {
    return this.axiosRequest('end_feed_video', POST, {
      activity_id,
      team_id,
      poster,
    })
  }

  updateCardVideoItem(item_id, vimeo_data) {
    return this.axiosRequest('update_card_video_item', POST, {
      item_id,
      vimeo_data,
    })
  }

  getUserLikes(user_id, page, size) {
    return this.axiosRequest('get_user_likes', POST, {
      user_id,
      page,
      size,
    })
  }

  getUserFavorites(user_id, page, size) {
    return this.axiosRequest('get_user_favorites', POST, {
      user_id,
      page,
      size,
    })
  }

  getActivitiesByIds(ids) {
    return this.axiosRequest('get_activities_by_ids', POST, {
      ids,
    })
  }

  getActivityByChatUrl(url) {
    return this.axiosRequest('get_activity_by_chat_url', POST, {
      url,
    })
  }

  getTeamActivityDataForChat(team_id) {
    return this.axiosRequest('get_team_activity_data_for_chat_new', POST, {
      team_id,
    })
  }

  getFriendsRequests(page, size) {
    return this.axiosRequest('get_friends_requests', POST, {
      page,
      size,
    })
  }

  getFriendsPending(page, size) {
    return this.axiosRequest('get_friends_pending', POST, {
      page,
      size,
    })
  }

  getFriendsWithInvestments(page, size) {
    return this.axiosRequest('get_network_with_investments', POST, {
      page,
      size,
    })
  }

  setAvailableToTeam(user_id) {
    return this.axiosRequest('set_available_to_team', POST, {
      user_id,
    })
  }

  leaveTeam(team_id, reason) {
    return this.axiosRequest('leaving_team', POST, {
      team_id,
      reason,
    })
  }

  closeTeam(team_id) {
    return this.axiosRequest('closing_team', POST, {
      team_id,
    })
  }

  createNewTeam() {
    return this.axiosRequest('create_new_team', POST)
  }

  getUserTeams() {
    return this.axiosRequest('get_user_teams', GET)
  }

  // login with other user - instead of getUserTeams
  getUserTeamsForUser(user_id) {
    return this.axiosRequest('get_member_teams', POST, {
      user_id,
    })
  }

  approvedInviteFromLink(invite_user_id, team_id) {
    return this.axiosRequest('approved_invite_from_link', POST, {
      invite_user_id,
      team_id,
    })
  }

  doneCardVideo(video_id) {
    return this.axiosRequest('save_startup_video_user', POST, {
      video_id,
    })
  }

  getPagesWebviews() {
    return this.axiosRequest('get_all_webviews', GET)
  }

  updateFeedPost(id, set) {
    return this.axiosRequest('update_feed_activity', POST, {
      id,
      set,
    })
  }

  changeHashtags(team_id, foreign_id, time, new_targets, removed_targets) {
    return this.axiosRequest('change_hashtags', POST, {
      team_id,
      foreign_id,
      time,
      new_targets,
      removed_targets,
    })
  }

  setVideoPainFeedId(team_id, activity_id) {
    return this.axiosRequest('set_video_pain_feed_id', POST, {
      team_id,
      activity_id,
    })
  }

  setVideoPainFeedChat(team_id, chat_url) {
    return this.axiosRequest('set_video_pain_chat', POST, {
      team_id,
      chat_url,
    })
  }

  addUserCoins() {
    return this.axiosRequest('add_user_coins', POST, {
      coins: 1,
    })
  }

  minusUserCoins() {
    return this.axiosRequest('minus_user_coins', POST, {
      coins: 1,
    })
  }

  likeFeedPost(activity_id, user_id, team_id, activity_time) {
    return this.axiosRequest('like_feed_activity', POST, {
      activity_id,
      user_id,
      team_id,
      activity_time,
    })
  }

  unlikeFeedPost(activity_id, reaction_id, team_id, activity_time) {
    return this.axiosRequest('unlike_feed_activity', POST, {
      activity_id,
      reaction_id,
      team_id,
      activity_time,
    })
  }

  unlikeActivityForUser(reaction_id, user_id) {
    return this.axiosRequest('unlike_feed_activity_for_user', POST, {
      reaction_id,
      user_id,
    })
  }

  returnAllCoinsFromActivity(team_id, activity_id) {
    return this.axiosRequest('return_all_coins_from_activity_with_notif', POST, {
      team_id,
      activity_id,
    })
  }

  clearVideoHistoryAfterChange(team_id) {
    return this.axiosRequest('clear_video_history_after_change', POST, {
      team_id,
    })
  }

  addProgressFeedVideo(team_id, activity_id, url, vimeo_id, is_edit) {
    return this.axiosRequest('add_progress_feed_video', POST, {
      team_id,
      activity_id,
      url,
      vimeo_id,
      is_edit,
    })
  }

  removeActivity(team_id, activity_id) {
    return this.axiosRequest('remove_activity', POST, {
      team_id,
      activity_id,
    })
  }

  getSelectOptions() {
    return this.axiosRequest('get_select_options', POST)
  }

  updateTeamMemberRole(team_id, user_id, role) {
    return this.axiosRequest('update_new_team_member_role', POST, {
      team_id,
      user_id,
      role,
    })
  }

  uploadUserAvatar(avatarFile) {
    let formdata = new FormData()
    formdata.append('file', avatarFile)

    return this.uploadFileWithIndication('user_avatar', formdata)
  }

  uploadCompanyAvatar(avatarFile) {
    let formdata = new FormData()
    formdata.append('file', avatarFile)

    return this.uploadFileWithIndication('company_avatar', formdata)
  }

  uploadTeamAvatar(avatarFile, teamId) {
    let formdata = new FormData()
    formdata.append('team_id', teamId)
    formdata.append('file', avatarFile)

    return this.uploadFile('team_avatar', formdata)
  }

  uploadFile(fileType, formdata) {
    return this.axiosRequest(`upload_${fileType}`, POST, formdata)
  }

  uploadFileWithIndication(fileType, formData, progressUpdate) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`upload_${fileType}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            const percentUploaded = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100),
            )
            progressUpdate && progressUpdate(percentUploaded)
          },
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  uploadImage(file, progressCallback) {
    let formData = new FormData()
    formData.append('file', file)

    source = CancelToken.source()

    const config = {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 95) / progressEvent.total)
        progressCallback && progressCallback(percentCompleted)
      },
      cancelToken: source.token,
    }

    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`upload_file`, formData, config, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  }

  cancelRequest() {
    source && source.cancel()
  }
}

const api = new Api()
export default api
