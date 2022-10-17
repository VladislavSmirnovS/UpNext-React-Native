import styled from 'styled-components'
import { Dimensions } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { AVATAR_SIZE, IMAGE_SIZE } from 'components/MyProfile/TopUserInfo'
import Styles from 'appearance/styles'

const { height } = Dimensions.get('window')

export default () => {
  return (
    <SkeletonPlaceholder>
      <View style={{ padding: 10 }}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              borderRadius={AVATAR_SIZE}
            />

            <SkeletonPlaceholder.Item marginLeft={10}>
              <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
              <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} borderRadius={4} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              borderRadius={IMAGE_SIZE}
            />
            <SkeletonPlaceholder.Item
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              borderRadius={IMAGE_SIZE}
              marginLeft={5}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </View>

      <View style={{ padding: 10 }}>
        <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
        <SkeletonPlaceholder.Item
          marginTop={5}
          width="100%"
          height={height - 330}
          borderRadius={Styles.MAIN_BORDER_RADIUS}
        />
      </View>

      <View style={{ padding: 10 }}>
        <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />

        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={5}>
          <SkeletonPlaceholder.Item
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            borderRadius={AVATAR_SIZE}
          />
          <SkeletonPlaceholder.Item
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            borderRadius={AVATAR_SIZE}
            marginLeft={5}
          />
          <SkeletonPlaceholder.Item
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            borderRadius={AVATAR_SIZE}
            marginLeft={5}
          />
        </SkeletonPlaceholder.Item>
      </View>
    </SkeletonPlaceholder>
  )
}

const View = styled.View``

export const TopPlaceholder = () => {
  return (
    <SkeletonPlaceholder>
      <View style={{ padding: 10 }}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              borderRadius={AVATAR_SIZE}
            />

            <SkeletonPlaceholder.Item marginLeft={10}>
              <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
              <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} borderRadius={4} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              borderRadius={IMAGE_SIZE}
            />
            <SkeletonPlaceholder.Item
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              borderRadius={IMAGE_SIZE}
              marginLeft={5}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </View>
    </SkeletonPlaceholder>
  )
}

export const CardPlaceholder = () => {
  return (
    <SkeletonPlaceholder>
      <View style={{ padding: 10, width: '100%' }}>
        <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
        <SkeletonPlaceholder.Item
          marginTop={6}
          width="100%"
          height={height - 350}
          borderRadius={Styles.MAIN_BORDER_RADIUS}
        />
      </View>
    </SkeletonPlaceholder>
  )
}

export const NetworkPlaceholder = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={10}>
        <SkeletonPlaceholder.Item
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          borderRadius={AVATAR_SIZE}
        />
        <SkeletonPlaceholder.Item
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          borderRadius={AVATAR_SIZE}
          marginLeft={5}
        />
        <SkeletonPlaceholder.Item
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          borderRadius={AVATAR_SIZE}
          marginLeft={5}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}
