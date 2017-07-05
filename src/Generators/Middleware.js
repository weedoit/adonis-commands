'use strict'

/**
 * adonis-commands
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const BaseGenerator = require('./Base')
const path = require('path')
const modules = require('../ModuleList')

class MiddlewareGenerator extends BaseGenerator {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    const templateFlag = '{--template=@value:Path to custom template for middleware file} {-M,--module=@value:Define the module of middleware}'
    return `make:middleware {name} ${templateFlag}`
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new middleware for Http requests'
  }

  /**
   * handle method will be executed by ace. Here we create
   * the middleware inside middleware directory.
   *
   * @param  {Object} args
   * @param  {Object} options
   *
   * @public
   */
  * handle (args, options) {
    let moduleName = options.module || null;

    /**
     * Prompting for controller module if not already defined
     */
    if (!moduleName) {
      moduleName = yield this.choice('What module this middleware belongs ?', modules.getModules().map((m) => {
        return {
            name: m,
            value: m
        }
      })).print()
    }

    const name = args.name
    const entity = this._makeEntityName(name, 'middleware', false)
    const toPath = path.join(this.helpers.appPath(), `Modules/${moduleName}/Middlewares`, `${entity.entityPath}.js`)
    const template = options.template || 'middleware'
    const templateOptions = {
      name: entity.entityName
    }
    yield this._wrapWrite(template, toPath, templateOptions)
  }

}

module.exports = MiddlewareGenerator
