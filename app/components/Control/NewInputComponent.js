import styled, { css } from 'styled-components'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'

export default styled.TextInput`
    ${Texts.sizes.TitleSize}
    height: ${p => p.height || 20}px;
    color: ${Colors.MENU_PURPLE};
    flex: 1;
    width: ${p => p.width || 'auto'};
    ${p =>
      p.noPadding &&
      css`
        padding: 0;
      `}
      padding-left:5;
    
`
