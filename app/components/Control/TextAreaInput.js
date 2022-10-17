import styled from 'styled-components'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'

export default styled.TextInput.attrs({
  multiline: true,
})`
  ${Texts.sizes.TitleSize};
  height: ${p => p.height || '100px'};
  color: ${Colors.TEXT_DARK_BLUE};
  background-color: ${Colors.INPUT_BACKGROUND_GREY};
  border-color: ${Colors.INPUT_BORDER_GREY};
  border-width: 0.3px;
  border-radius: 2px;
  padding-left: 16.7px;
  padding-right: 16.7px;
`
