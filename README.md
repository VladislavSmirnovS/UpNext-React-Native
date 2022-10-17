# UpNext

Mobile app for android and ios.
UpNext is an international young entrepreneurs platform that enables teens from around the world to team up with like-minded peers and build together digital solutions to real-world problems

## Description

Mobile application for teenagers with a contest to create the first mvp.
If you have a cool idea for your startup but don't know where to start, this app will help you with. Create a short video about your idea and find investors wide world. Get 15k coins and win contest - our company Builder create first mvp for you.

## Installation

- Clone the repo on your computer. In your terminal, cd into the directory you just added
- To install all dependencies, run:

```
npm install

```

only for ios

```
cd ios
pods install

```

## Development

(use Visual Studio Code)

- Install and use prettier
- Use absolute path
  set alias in `babel.config.js` file and do not forget add this alias to `jsconfig.json` for vs code settings

or

```
npm run start
```

in other tab

```
npm run android
```

## Branch and commit guideline

Branch name: `Task-number-task-description` Template: `61901-upgrade-libraries`<br>

Commit message: `[Task number || HOTFIX]Task Type: description changes` Template: `[61901]Fix: upgrade libraries and fix bug`

### Task type

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

### Config

You can set true degug flag in `config.js` for not send analitics and not create some actions
This is a list of not working services and actions when IS_DEBUG is true

- code push
- sentry
- branch track events
- track events
- track session

```
IS_DEBUG: true

```

### Debug

Reactotron https://github.com/infinitered/reactotron/blob/v2.17.1/docs/quick-start-react-native.md

## Production

1. Add existing private signing key file under the `android/app` directory in your project folder

Create apk

```
npm run release

```

Create aab

```
npm run bundle

```

You can find builds in these folders:

- android/app/build/outputs/apk/release
- android/app/build/outputs/bundle/release

## Existing Errors

1. check in /react-native/react-native-share/package.json
   remove this line `react-native": "src/index.tsx`
