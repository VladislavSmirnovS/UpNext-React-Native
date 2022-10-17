import styled from 'styled-components'
import Styles from 'appearance/styles'

const PageContent = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${p => (p.noPadding ? '0px' : Styles.PAGE_PADDING)};
`

export default PageContent
