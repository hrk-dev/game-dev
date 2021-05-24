/*:
 * @plugindesc 修改游戏菜单
 * @author Blacktunes
 */

(function () {
  var _Scene_Menu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function () {
    _Scene_Menu_create.call(this);
    this._commandWindow.opacity = 0;
    this._commandWindow.y = (Graphics.height - this._commandWindow.height) / 2;
  };
  Scene_Menu.prototype.start = function () {
  };

  Scene_Menu.prototype.createStatusWindow = function () {
  };

  Scene_Menu.prototype.commandPersonal = function () {
  };

  Scene_Menu.prototype.commandFormation = function () {
  };

  Scene_Menu.prototype.createGoldWindow = function () {
  };

  Window_MenuCommand.prototype.windowWidth = function () {
    return Graphics.boxWidth;
  };

  Window_MenuCommand.prototype.windowHeight = function () {
    return 96
  };

  Window_MenuCommand.prototype.itemRect = function (index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = 96;
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + this.textPadding() * 3;
    return rect;
  };

  Window_MenuCommand.prototype.maxCols = function () {
    return 4;
  };

  Window_MenuCommand.prototype.numVisibleRows = function () {
    return 1;
  };
})()