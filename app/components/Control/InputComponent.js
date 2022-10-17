import styled, { css } from 'styled-components'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'

export default styled.TextInput`
    ${Texts.sizes.TitleSize}
    height: ${p => p.height || 53.7}px;
    color: ${Colors.TEXT_DARK_BLUE};
    flex: 1;
    width: ${p => p.width || 'auto'};
    ${p =>
      p.noPadding &&
      css`
        padding: 0;
      `}
`
