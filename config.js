const availableEnvironments = {
  localhost: '',
  development: 'dev.upnexteducation.com',
  production: '',
}

const Config = {
  /**
   * Defined the available app environments
   * @type {Object}
   */
  AVAILABLE_ENVIRONMENTS: availableEnvironments,

  /**
   * Define the selected environment
   * e.g.'localhost' | 'development' | 'production'
   * @type {String}
   */
  SELECTED_ENV: 'development',

  /**
   * Set to 'true' if you want to use debug mode
   *
   * @type {Boolean}
   */
  IS_DEBUG: true,

  /**
   * Set to 'true' if you want to use SSL/HTTPS
   * @type {Boolean}
   */
  USE_HTTPS: true,
}

module.exports = Config
