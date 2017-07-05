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

class HookGenerator extends BaseGenerator {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    return 'make:hook {name} {-m,--method=@value:Method to create on hook} {-M,--module=@value:Define the module of hook}'
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new hook for your models'
  }

  /**
   * handle method will be executed by ace. Here we
   * create the hook inside hooks directory.
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
      moduleName = yield this.choice('What module this hook belongs ?', modules.getModules().map((m) => {
        return {
            name: m,
            value: m
        }
      })).print()
    }

    const name = args.name
    const entity = this._makeEntityName(name, 'hook', false)
    const toPath = path.join(this.helpers.appPath(), `Modules/${moduleName}/Model/Hooks`, `${entity.entityPath}.js`)
    const templateOptions = {
      name: entity.entityName,
      method: options.method || 'methodName'
    }

    yield this._wrapWrite('hook', toPath, templateOptions)
  }

}

module.exports = HookGenerator
