import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { InteractionManager } from 'react-native'
import Loading from 'components/Page/Loading'

export default ({ withoutInteractions, renderPlaceholder, children }) => {
  if (withoutInteractions) {
    return children
  }

  const [interactionsComplete, setInteractionsComplete] = useState(false)
  const [isColled, setIsColled] = useState(false)

  useEffect(() => {
    if (!interactionsComplete) {
      const timeout = setTimeout(() => {
        setIsColled(true)
        showComponent()
      }, 6000)

      InteractionManager.runAfterInteractions(() => {
        if (isColled) {
          return
        }
        clearTimeout(timeout)

        showComponent()
      })
    }
  }, [])

  const showComponent = () => {
    setInteractionsComplete(true)
  }

  if (!interactionsComplete) {
    return renderPlaceholder ? renderPlaceholder() : <Loader />
  }

  return children
}

const Loader = () => (
  <Container>
    <Loading />
  </Container>
)

const Container = styled.View`
  flex: 1;
`
