import styled from 'styled-components'
import { Dimensions } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import Styles from 'appearance/styles'

const { width, height } = Dimensions.get('window')

export default () => {
  return (
    <SkeletonPlaceholder>
      <View style={{ padding: PADDING }}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent="center">
          <SkeletonPlaceholder.Item
            width={TEAM_AVATAR_SIZE}
            height={TEAM_AVATAR_SIZE}
            borderRadius={TEAM_AVATAR_SIZE}
          />
          <View style={{ padding: VIEW_PADDING }}>
            <SkeletonPlaceholder.Item
              width={
                width -
                PADDING * 2 -
                TEAM_AVATAR_SIZE -
                VIEW_PADDING * 2 -
                COIN_SIZE -
                COIN_BALACE_WIDTH
              }
              height={30}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width={70}
              height={20}
              borderRadius={4}
              marginTop={VIEW_PADDING}
            />
          </View>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent="center">
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={width - 100}
            height={300}
            borderRadius={Styles.MAIN_BORDER_RADIUS}
          />
        </SkeletonPlaceholder.Item>
      </View>
    </SkeletonPlaceholder>
  )
}
const View = styled.View``

const PADDING = 23
const VIEW_PADDING = 5
const COIN_SIZE = 32
const COIN_BALACE_WIDTH = 20
const TEAM_MEMBERS_AVATAR_SIZE = 40
const TEAM_AVATAR_SIZE = 80
const VIDEO_WIDTH = 200
