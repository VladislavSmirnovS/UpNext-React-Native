export const getTeamAvatarProps = team => {
  return {
    uri: team?.avatar_small || team?.avatar,
    id: team?.id,
    firsName: team?.name,
  }
}
