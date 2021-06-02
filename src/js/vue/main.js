var fs = require('fs')
var path = require('path')

var VueMain = class {
  static appPath = path.join(__dirname, './js/vue/app')

  static componentsPath = path.join(__dirname, './js/vue/components')

  static getAppPath = function (name) {
    return path.join(VueMain.appPath, name)
  }

  static getComponentPath = function (name) {
    return path.join(VueMain.componentsPath, name)
  }

  static loadTemplate = function (name) {
    return fs.readFileSync(VueMain.getAppPath(name + '.html')).toLocaleString()
  }

  static loadComponent = function (name) {
    return 'url:' + VueMain.getComponentPath(name + '.vue')
  }
  static setup = function () {
    require(VueMain.getAppPath('app.js'))
    require(VueMain.getAppPath('methods.js'))
  }
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

VueMain.setup()
