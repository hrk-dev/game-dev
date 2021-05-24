/*:
 * @plugindesc 多周目存档
 * @author Blacktunes
 */

DataManager.loadLoop = function (saveId) {
  const map = Object.create($gameMap)
  if (DataManager.loadGame(saveId)) {
    SoundManager.playLoad();
    $gameMap = map
    this._loadSuccess = true;
  }
}