/*:
 * @plugindesc 主界面效果修改
 * @author Blacktunes
 */
(function () {
  Scene_Title.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createForeground();
    this.createWindowLayer();
    this.createCommandWindow();
    this._command_x = this._commandWindow.x
    this._commandWindow.x -= this._commandWindow.windowWidth()
  };

  Scene_Title.prototype.update = function () {
    if (!this.isBusy()) {
      this._commandWindow.open();
    }
    if (this._commandWindow.x < this._command_x) {
      this._commandWindow.x += 3
    }
    Scene_Base.prototype.update.call(this);
  };

  Scene_Title.prototype.createBackground = function () {
    const globalInfo = DataManager.loadGlobalInfo() || [];
    this._backSprite1 = new Sprite(ImageManager.loadPicture(globalInfo[0] && globalInfo[0].title ? globalInfo[0].title : ''));
    this._backSprite2 = new Sprite(ImageManager.loadPicture(''));
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
  };

  Scene_Title.setTitle = function (name) {
    const globalInfo = DataManager.loadGlobalInfo() || [];
    globalInfo[0] = { ...globalInfo[0], ...{ title: name } };
    DataManager.saveGlobalInfo(globalInfo);
  };

  Window_TitleCommand.prototype.drawText = function (text, x, y, maxWidth) {
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), 'left');
  };
})()