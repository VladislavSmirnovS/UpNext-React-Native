import codePush from 'react-native-code-push'

export default {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
  updateDialog: {
    title: 'Version Update',
    mandatoryUpdateMessage: 'A new version of the app is available.',
  },
}
