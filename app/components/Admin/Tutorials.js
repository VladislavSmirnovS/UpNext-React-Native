import React from 'react'
import Tutorial from 'components/Tutorials/Admin'
import useTutorials from 'hooks/useTutorials'

export default () => {
  const [isTutorialShow, hideTutorial] = useTutorials('admin', 'launch')

  return <Tutorial isVisible={isTutorialShow} onHide={hideTutorial} />
}
