module.exports = api => {
  const babelEnv = api.env()
  const plugins = [
    [
      'module-resolver',
      {
        root: ['./app/'],
        alias: {
          root: './',
          store: './app/store',
          services: './app/services',
          utils: './app/utils',
          components: './app/components',
          hooks: './app/hooks',
          appearance: './app/appearance',
          screens: './app/screens',
          navigation: './app/navigation',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
      },
    ],
  ]

  if (babelEnv !== 'development') {
    plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }])
  }

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
  }
}
