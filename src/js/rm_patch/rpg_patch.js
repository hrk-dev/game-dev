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
  static loadLoop (saveId) {
    const map = $gameMap
    if (DataManager.loadGame(saveId)) {
      SoundManager.playLoad()
      $gameMap = map
      $gameSystem.onAfterLoad()
    }
  }
}