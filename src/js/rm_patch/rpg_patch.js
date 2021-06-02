var electron = require('electron')

/**
 * 额外添加的RM方法
 */
var Patch = class {
  static startWait() {
    Game_Interpreter.prototype._wait = true
  }
  static stopWait() {
    Game_Interpreter.prototype._wait = false
  }
  /**
   * 加载周目存档
   */
  static loadLoop(saveId) {
    const map = $gameMap
    if (DataManager.loadGame(saveId)) {
      SoundManager.playLoad()
      $gameMap = map
      $gameSystem.onAfterLoad()
    }
  }
  /**
   * 打开URL
   */
  static openUrl(url) {
    electron.shell.openExternal(url)
  }
  /**
   * 修改全局存档数据
   */
  static addGlobalInfo(data) {
    const globalInfo = DataManager.loadGlobalInfo() || []
    globalInfo[0] = { ...globalInfo[0], ...data }
    DataManager.saveGlobalInfo(globalInfo)
  }
}