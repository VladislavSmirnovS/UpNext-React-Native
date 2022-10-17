import { useIsFeedExist } from 'store/feed/feed.uses'
import useTutorials from 'hooks/useTutorials'

export default () => {
  const isSwipeTutorial = useIsFeedExist()

  const [isLaunchTutorialShow, hideLaunchTutorial] = useTutorials('launch')
  const [isSwipeTutorialShow, hideSwipeTutorial] = useTutorials(
    'feed_swipe',
    'launch',
    isSwipeTutorial,
  )

  return { isLaunchTutorialShow, isSwipeTutorialShow, hideLaunchTutorial, hideSwipeTutorial }
}
