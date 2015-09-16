'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const ServiceProvider = require('adonis-fold').ServiceProvider

class GeneratorProvider extends ServiceProvider{

  *register() {

    /**
     * binding a new command to ioc container, which will scaffold a new controller
     */
    this.app.bind('Adonis/Addons/Generator:Controller', function () {
      return require('../src/Generators').Controller
    })

    /**
     * binding a new command to ioc container, which will scaffold a new terminal command
     */
    this.app.bind('Adonis/Addons/Generator:Command', function () {
      return require('../src/Generators').Model
    })

    /**
     * binding a new command to ioc container, which will scaffold a model
     */
    this.app.bind('Adonis/Addons/Generator:Model', function () {
      return require('../src/Generators').Model
    })


    /**
     * binding a new command to ioc container, which will scaffold a middleware
     */
    this.app.bind('Adonis/Addons/Generator:Middleware', function () {
      return require('../src/Generators').Middleware
    })

  }

}

module.exports = GeneratorProvider
