var electron = require('electron')
var fs = require('fs')
var path = require('path')

function VueMain() {
  throw new Error('This is a static class')
}

VueMain.viewPath = path.join(__dirname, './js/vue/view')

VueMain.componentsPath = path.join(__dirname, './js/vue/components')

VueMain.getViewPath = function (name) {
  return path.join(this.viewPath, name)
}

VueMain.getComponentsPath = function (name) {
  return path.join(this.componentsPath, name)
}

VueMain.getViewTemplate = function (name) {
  return fs.readFileSync(this.getViewPath(name + '.html')).toLocaleString()
}

VueMain.getComponentsTemplate = function (name) {
  return fs.readFileSync(this.getComponentsPath(name + '.html')).toLocaleString()
}

VueMain.setup = function() {
  const compontensList = fs.readdirSync(this.componentsPath)
  compontensList.forEach(name => {
    if (name.endsWith('.js')) {
      require(this.getComponentsPath(name))
    }
  })
  require(this.getViewPath('app.js'))
  require(path.join(__dirname, './js/vue/methods.js'))
}

VueMain.setup()
