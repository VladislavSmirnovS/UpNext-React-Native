import styled from 'styled-components'

export default styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${p => p.height || 35.7}px;
  padding-left: ${p => (p.containerNoPadding ? 0 : 16.7)}px;
  padding-right: ${p => (p.containerNoPadding ? 0 : 16.7)}px;
  width: ${p => p.width || 'auto'};
`
