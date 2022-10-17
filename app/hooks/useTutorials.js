import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { saveTutorials, setUserTutorials } from 'store/user/user.actions'
import { useUserId, useUserTutorials, useUserInitialized } from 'store/user/user.uses'
import storage from 'services/storage'

export default (tutorialName, parentTutorialName, additionalCheck) => {
  const dispatch = useDispatch()

  const userId = useUserId()
  const userTutorials = useUserTutorials()
  const isUserInitialized = useUserInitialized()

  const [isTutorialShow, setIsTutorialShow] = useState(false)

  const [currentTutorial, setCurrentTutorial] = useState(true)
  const [parentTutorial, setParentTutorial] = useState(false)

  // useEffect(() => {
  //   // clear tutorials
  //   dispatch(saveTutorials([]))
  //   setTutorialsWithoutUser([])
  // }, [])

  useEffect(() => {
    if (isUserInitialized) {
      isUser() ? getCurrentTutorialForUser() : getCurrentTutorialWithoutUser()
    }
  }, [userTutorials, isUserInitialized, tutorialName])

  useEffect(() => {
    if (isUserInitialized) {
      isUser() ? getParentTutorialForUser() : getParentTutorialWithoutUser()
    }
  }, [userTutorials, isUserInitialized, parentTutorialName])

  useEffect(() => {
    if (isTutorial()) {
      setIsTutorialShow(!currentTutorial)
    }
  }, [currentTutorial, parentTutorial, additionalCheck])

  const isUser = () => {
    return isUserInitialized && userId
  }

  const getCurrentTutorialForUser = () => {
    setCurrentTutorial(userTutorials?.[tutorialName])
  }

  const getCurrentTutorialWithoutUser = async () => {
    const tutorials = await getTutorialsWithoutUser()
    setCurrentTutorial(tutorials?.[tutorialName])
  }

  const getParentTutorialForUser = () => {
    setParentTutorial(userTutorials?.[parentTutorialName])
  }

  const getParentTutorialWithoutUser = async () => {
    const tutorials = await getTutorialsWithoutUser()
    setParentTutorial(tutorials?.[parentTutorialName])
  }

  const isTutorial = () => {
    const isParent = !parentTutorialName || (parentTutorialName && parentTutorial)

    const isAddCheckUndefined = typeof additionalCheck === 'undefined'
    const isAdditional = isAddCheckUndefined || (!isAddCheckUndefined && additionalCheck)

    return isParent && isAdditional
  }

  const hideTutorial = () => {
    if (isUser()) {
      hideTutorialForUser()
    } else {
      hideTutorialWithoutUser()
    }
    setIsTutorialShow(false)
  }

  const getNewTutorialsForUser = () => {
    const tutorials = userTutorials || {}
    return { ...tutorials, [tutorialName]: true }
  }

  const hideTutorialForUser = () => {
    const newTutorials = getNewTutorialsForUser()
    dispatch(saveTutorials(newTutorials))
  }

  const getNewTutorialsWithoutUser = async () => {
    const tutorials = (await getTutorialsWithoutUser()) || {}
    return { ...tutorials, [tutorialName]: true }
  }

  const hideTutorialWithoutUser = async () => {
    const newTutorials = await getNewTutorialsWithoutUser()
    await setTutorialsWithoutUser(newTutorials)
    dispatch(setUserTutorials(newTutorials))
  }

  return [isTutorialShow, hideTutorial]
}

const getTutorialsWithoutUser = async () => {
  const tutorialsString = await storage.getTutorials()
  return JSON.parse(tutorialsString)
}

const setTutorialsWithoutUser = async tutorials => {
  await storage.setTutorials(JSON.stringify(tutorials || []))
}
