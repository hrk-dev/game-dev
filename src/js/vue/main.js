var electron = require('electron')
var fs = require('fs')
var path = require('path')

function VueMain() {
  throw new Error('This is a static class')
}

VueMain.appPath = path.join(__dirname, './js/vue/app')

VueMain.componentsPath = path.join(__dirname, './js/vue/components')

VueMain.getAppPath = function (name) {
  return path.join(this.appPath, name)
}

VueMain.getComponentPath = function (name) {
  return path.join(this.componentsPath, name)
}

VueMain.loadTemplate = function (name) {
  return fs.readFileSync(this.getAppPath(name + '.html')).toLocaleString()
}

VueMain.loadComponent = function (name) {
  return 'url:' + this.getComponentPath(name + '.vue')
}

httpVueLoader.langProcessor.stylus = function (stylusText) {
  return new Promise((resolve, reject) => {
    stylus.render(stylusText.trim(), {}, (err, css) => {
      if (err) reject(err)
      resolve(css)
    })
  })
}

Vue.use(httpVueLoader)

VueMain.setup = function () {
  require(this.getAppPath('app.js'))
  require(this.getAppPath('methods.js'))
}

VueMain.setup()
