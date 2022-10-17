import styled from 'styled-components'
import Styles from 'appearance/styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  width: 100%;
  padding: ${p => (p.noPadding ? '0px' : Styles.PAGE_PADDING)};
  display: flex;
  flex-direction: column;
`
