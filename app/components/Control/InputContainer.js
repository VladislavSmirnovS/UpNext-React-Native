import styled from 'styled-components'
import Colors from 'appearance/colors'

export default styled.View`
  background-color: ${p => p.backgroundColor || Colors.INPUT_BACKGROUND_GREY};
  border-color: ${p => p.borderColor || Colors.INPUT_BORDER_GREY};
  border-width: ${p => p.borderWidth || 0.3}px;
  borderBottomWidth: ${p => (p.borderBottom ? 2 : 0.3)};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${p => p.height || 53.7}px;
  border-radius: 2px;
  padding-left: ${p => (p.containerNoPadding ? 0 : 16.7)}px;
  padding-right: ${p => (p.containerNoPadding ? 0 : 16.7)}px;
  width: ${p => p.width || 'auto'};
`
