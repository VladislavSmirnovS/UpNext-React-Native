import React from 'react'
import styled from 'styled-components'
import Loading from 'components/Page/Loading'

export default ({ height }) => (
  <LoadingWrapper height={height}>
    <Loading />
  </LoadingWrapper>
)

const LoadingWrapper = styled.View`
  height: ${p => (p.height ? p.height : 100)}px;
`
