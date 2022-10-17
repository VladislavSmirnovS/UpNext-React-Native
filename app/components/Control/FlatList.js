import styled from 'styled-components'
import { FlatList } from 'react-native'
import Styles from 'appearance/styles'

export default styled(FlatList).attrs({
  contentContainerStyle: { paddingBottom: 150, flexGrow: 1 },
})`
  width: 100%;
  padding: ${p => (p.noPadding ? 0 : Styles.PAGE_PADDING)};
  ${p => (p.paddingTop ? `padding-top:${p.paddingTop}` : '')}
`
