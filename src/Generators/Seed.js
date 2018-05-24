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
const modules = require('../ModuleList')
const path = require('path')

class SeedGenerator extends BaseGenerator {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    const moduleFlag = '{-M,--module=@value:Define the module of seed}'
    return `make:seed {name} ${moduleFlag}`
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new seeder'
  }

  /**
   * handle method will be executed by ace. Here we
   * create the template inside views directory.
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
      moduleName = yield this.choice('What module this seed belongs ?', modules.getModules().map((m) => {
        return {
          name: m,
          value: m
        }
      })).print()
    }

    const name = args.name
    const entity = this._makeEntityName(name, 'seed', false)
    const toPath = path.join(this.helpers.appPath(), `Modules/${moduleName}/Database/migrations`, `${entity.entityName}Seeder.js`)
    const templateOptions = { name: entity.entityPath }
    yield this._wrapWrite('seed', toPath, templateOptions)
  }

}

module.exports = SeedGenerator
