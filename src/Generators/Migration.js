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
const i = require('inflect')
const path = require('path')
const modules = require('../ModuleList')

class MigrationGenerator extends BaseGenerator {
  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    const createFlag = '{-c,--create=@value:Create a new table}'
    const tableFlag = '{-t,--table=@value:Select table for alteration}'
    const connectionFlag = '{-c,--connection=@value:Specify connection to be used for migration}'
    const templateFlag = '{--template=@value:Path to custom template for migration file}'
    const moduleFlag = '{-M,--module=@value:Define the module of migration}'
    return `make:migration {name} ${moduleFlag} ${createFlag} ${tableFlag} ${connectionFlag} ${templateFlag}`
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new migration file'
  }

  /**
   * called by ace automatically. It will create a new
   * migrations file inside the migrations directory.
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
      moduleName = yield this.choice('What module this model belongs ?', modules.getModules().map((m) => {
        return {
            name: m,
            value: m
        }
      })).print()
    }

    const name = args.name
    const entity = this._makeEntityName(name, 'migration', false)
    const toPath = path.join(this.helpers.appPath(), `Modules/${moduleName}/Database/migrations`, `${new Date().getTime()}_${name}.js`)
    const template = options.template || 'migration'
    const table = options.create || options.table || i.underscore(entity.entityName)
    const templateOptions = {
      table: table,
      create: !!options.create,
      name: entity.entityName,
      className: i.camelize(table),
      connection: options.connection
    }
    yield this._wrapWrite(template, toPath, templateOptions)
  }
}

module.exports = MigrationGenerator
