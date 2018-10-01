'use strict'

const Imperium = require('imperium')
const { ServiceProvider } = require('@adonisjs/fold')

class ImperiumProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.singleton('Adonis/Addons/Imperium', () => new Imperium())
    this.app.alias('Adonis/Addons/Imperium', 'Imperium')

    this.app.bind('Adonis/Middleware/Is', () => {
      const Is = require('../src/Middleware/Is')
      return new Is()
    })

    this.app.bind('Adonis/Middleware/Can', () => {
      const Can = require('../src/Middleware/Can')
      return new Can()
    })

    this.app.bind('Adonis/Middleware/ImperiumInit', () => {
      const ImperiumInit = require('../src/Middleware/ImperiumInit')
      return new ImperiumInit()
    })
  }
}

module.exports = ImperiumProvider
