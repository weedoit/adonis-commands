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

class ModuleGenerator extends BaseGenerator {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    return 'make:module {name}'
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new module'
  }

  getRoot (name, file) {
    return path.join(this.helpers.appPath(), 'Modules', name, file);
  }

  /**
   * handle method will be executed by ace. Here we
   * create the controller to controller directory.
   * @param  {Object} args
   * @param  {Object} options
   *
   * @public
   */
  * handle (args, options) {
    const name = args.name;

    yield this._wrapWrite('empty', this.getRoot(name, 'Controllers/.gitkeep'));
    yield this._wrapWrite('empty', this.getRoot(name, 'Middlewares/.gitkeep'));
    yield this._wrapWrite('empty', this.getRoot(name, 'Models/Hooks/.gitkeep'));
    yield this._wrapWrite('empty', this.getRoot(name, 'Database/migrations/.gitkeep'));
    yield this._wrapWrite('empty', this.getRoot(name, 'Database/seeds/.gitkeep'));
    yield this._wrapWrite('factory', this.getRoot(name, 'Database/factory.js'));
    yield this._wrapWrite('empty', this.getRoot(name, 'Views/.gitkeep'));

    yield this._wrapWrite('empty', this.getRoot(name, 'Ws/Controllers/.gitkeep'));
    yield this._wrapWrite('kernel', this.getRoot(name, 'Ws/kernel.js'), {ws: true});
    yield this._wrapWrite('routes', this.getRoot(name, 'Ws/socket.js'), {ws: true});

    yield this._wrapWrite('kernel', this.getRoot(name, 'kernel.js'));
    yield this._wrapWrite('routes', this.getRoot(name, 'routes.js'));
  }

}

module.exports = ModuleGenerator
