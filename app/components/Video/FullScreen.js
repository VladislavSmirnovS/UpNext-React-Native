import { Dimensions } from 'react-native'
import styled from 'styled-components'
import { AVAILABLE_HEIGHT } from 'components/Control/DeviceHeight'

const { width } = Dimensions.get('window')

export default styled.View`
  height: ${p => (p.height ? p.height : `${AVAILABLE_HEIGHT}px`)};
  width: ${width}px;
  justify-content: center;
`
