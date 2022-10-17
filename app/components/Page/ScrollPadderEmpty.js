import styled from 'styled-components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  width: 100%;
  display: flex;
  flex-direction: column;
`
