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
const i = require('inflect')
const modules = require('../ModuleList')

class ViewGenerator extends BaseGenerator {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    const moduleFlag = '{-M,--module=@value:Define the module of view}'
    const extendFlag = '{-e, --extend?=@value:Extend a parent view}'
    const templateFlag = '{--template=@value:Path to custom template for view template}'
    return `make:view {name} ${moduleFlag} ${extendFlag} ${templateFlag}`
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new template view by optionally extending a master view'
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
      moduleName = yield this.choice('What module this view belongs ?', modules.getModules().map((m) => {
        return {
            name: m,
            value: m
        }
      })).print()
    }

    const name = args.name
    const entity = this._makeEntityName(name, 'view', false)
    const templateName = entity.entityPath.replace(new RegExp(`${entity.entityName}$`), i.decapitalize(entity.entityName))
    const toPath = path.join(this.helpers.appPath(), `Modules/${moduleName}/Views`, `${templateName}.njk`)
    const template = options.template || 'view'
    const templateOptions = {
      extend: options.extend
    }
    yield this._wrapWrite(template, toPath, templateOptions)
  }

}

module.exports = ViewGenerator
