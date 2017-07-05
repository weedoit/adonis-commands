const modulesPath = './app/Modules';
const fs = require('fs');
const path = require('path');

module.exports = {
    getModules: function () {
        return fs.readdirSync(modulesPath).filter((f) => {
            return fs.lstatSync(path.join(modulesPath, f)).isDirectory();
        });
    }
}