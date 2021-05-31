VueMain.setTitleColor = function (color) {
  VueMain.app.$refs.title.color = color
}

VueMain.setTitle = function (title) {
  VueMain.app.$refs.title.title = title
}

/**
 * test
 */
VueMain.titleTest = function () {
  VueMain.app.$refs.title.titleTest()
}

VueMain.startEnding = function () {
  VueMain.app.$refs.ending.startEnding()
}

/**
 * test
 */
VueMain.showDanmu = function () {
  VueMain.app.$refs.danmu.showDanmu()
}

/**
 * test
 */
VueMain.stopDanmu = function () {
  VueMain.app.$refs.danmu.stopDanmu()
}
