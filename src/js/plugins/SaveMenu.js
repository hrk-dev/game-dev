/*:
 * @plugindesc 美化存档页面
 * @author Blacktunes
 * 
 * @param 选择提示
 * @default Please select a file slot
 * 
 * @param 操作提示
 * @default Save / Load / Delete
 * 
 * @param 覆盖提示
 * @default Do you wish to overwrite this save file
 * 
 * @param 保存提示
 * @default Do you wish to save this
 * 
 * @param 读取提示
 * @default Do you wish to load this save file
 * 
 * @param 删除提示
 * @default Do you wish to delete this save file
 */

(function () {
  const Parameters = PluginManager.parameters('SaveMenu')
  const Param = {}
  Param.selectText = String(Parameters['选择提示'])
  Param.menuText = String(Parameters['操作提示'])
  Param.saveText = String(Parameters['保存提示'])
  Param.overwriteText = String(Parameters['覆盖提示'])
  Param.loadText = String(Parameters['读取提示'])
  Param.deleteText = String(Parameters['删除提示'])

  // 获取绘制文字长度
  Window_Base.prototype.textWidthEx = function (text) {
    return this.drawTextEx(text, 0, this.contents.height)
  }

  //=============================================================================
  // 修改存档列表样式
  //=============================================================================
  Window_SavefileList.prototype.drawContents = function (info, rect, valid) {
    this.contents.fontSize = 20
    var bottom = rect.y + rect.height
    var lineHeight = this.lineHeight()
    var y2 = bottom - lineHeight
    if (y2 >= lineHeight) {
      this.drawSavetime(info, rect.x, y2, rect.width)
      this.drawPlaytime(info, rect.x, y2, rect.width)
    }
  }

  Window_SavefileList.prototype.centerTop = function () {
    return (this.itemHeight() - this.lineHeight()) / 2
  }

  Window_SavefileList.prototype.drawFileId = function (id, x, y) {
    this.drawText(id, x, y + this.centerTop(), '20')
  }

  Window_SavefileList.prototype.drawSavetime = function (info, x, y, width) {
    if (info.timestamp) {
      this.drawText(`·${new Date(info.timestamp).toLocaleDateString().replace(/\//g, '-')} ${new Date(info.timestamp).toLocaleTimeString('zh-cn', { hour12: false })}`, x + 20, y - this.centerTop(), width, 'left')
    }
  }

  Window_SavefileList.prototype.drawPlaytime = function (info, x, y, width) {
    if (info.playtime) {
      this.drawText(`${info.playtime} · ${info.loop || 0}`, x, y - this.centerTop(), width, 'right')
    }
  }

  /**
   * 确认菜单
   */
  class Window_SaveConfirm extends Window_Command {
    initialize() {
      this.clearCommandList()
      this.makeCommandList()
      var width = this.windowWidth()
      var height = this.windowHeight()
      Window_Selectable.prototype.initialize.call(this, x, y, width, height)
      this.refresh()
      this.select(0)
      this.activate()
      this.openness = 0
    }
    makeCommandList() {
      this.addCommand('Yes', 'confirm')
      this.addCommand('No', 'cancel')
    }
    setData(text) {
      this._text = text
      var ww = this.textWidthEx(this._text) + this.standardPadding() * 2
      ww += this.textPadding() * 2
      this.width = ww
      this.refresh()
      this.x = (Graphics.boxWidth - this.width) / 2
      this.y = (Graphics.boxHeight - this.height) / 2
      this.drawTextEx(this._text, this.textPadding(), 0)
    }
    itemTextAlign() {
      return 'center'
    }
    windowHeight() {
      return this.fittingHeight(3)
    }
    itemRect(index) {
      var rect = Window_Selectable.prototype.itemRect.call(this, index)
      rect.y += this.lineHeight()
      return rect
    }
  }

  /**
   * 保存/读取选择菜单
   */
  class Window_MenuConfirm extends Window_Command {
    initialize() {
      this.clearCommandList();
      this.makeCommandList();
      var width = this.windowWidth();
      var height = this.windowHeight();
      Window_Selectable.prototype.initialize.call(this, x, y, width, height);
      this.refresh();
      this.select(0);
      this.activate();
      this.openness = 0
      this.x = (Graphics.boxWidth - this.width) / 2
      this.y = (Graphics.boxHeight - this.height) / 2
    }
    makeCommandList() {
      this.addCommand('Save', 'save')
      this.addCommand('Load', 'load')
      this.addCommand('Delete', 'delete')
    }
    itemTextAlign() {
      return 'center'
    }
    windowHeight() {
      return this.fittingHeight(3)
    }
  }

  /**
   * 顶部提示栏
   */
  class Save_Window_Help extends Window_Help {
    initialize(numLines) {
      var width = Graphics.boxWidth - 200
      var height = this.fittingHeight(numLines || 2)
      Window_Base.prototype.initialize.call(this, 100, 100, width, height)
      this._text = ''
    }
    refresh() {
      this.contents.clear()
      const width = this.textWidthEx(this._text, 0, 0) + this.standardPadding() * 2 + this.textPadding() * 2
      this.drawTextEx(this._text, (Graphics.boxWidth - 200 - width) / 2, 0)
    }
  }

  //=============================================================================
  // Scene_File
  //=============================================================================
  Scene_File.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this)
    DataManager.loadAllSavefileImages()
    this.createHelpWindow()
    this.createListWindow()
    this.createConfirmWindow()
    this.createMenuWindow()
  }

  Scene_File.prototype.createHelpWindow = function () {
    this._helpWindow = new Save_Window_Help(1)
    this._helpWindow.setText(Param.selectText)
    this.addWindow(this._helpWindow)
  }

  Scene_File.prototype.createListWindow = function () {
    var x = 100
    var y = this._helpWindow.height + 100
    var width = Graphics.boxWidth - 200
    var height = Graphics.boxHeight - y - 100
    this._listWindow = new Window_SavefileList(x, y, width, height)
    this._listWindow.setHandler('ok', this.onSavefileOk.bind(this))
    this._listWindow.setHandler('cancel', this.popScene.bind(this))
    this._listWindow.select(this.firstSavefileIndex())
    this._listWindow.setTopRow(this.firstSavefileIndex() - 2)
    this._listWindow.setMode(this.mode())
    this._listWindow.refresh()
    this.addWindow(this._listWindow)
  }

  Scene_File.prototype.createConfirmWindow = function () {
    this._confirmWindow = new Window_SaveConfirm()
    var win = this._confirmWindow
    win.setHandler('confirm', this.onConfirmOk.bind(this))
    win.setHandler('cancel', this.onConfirmCancel.bind(this))
    this.addWindow(this._confirmWindow)
  }

  Scene_File.prototype.createMenuWindow = function () {
    this._menuWindow = new Window_MenuConfirm()
    var win = this._menuWindow
    win.setHandler('save', this.onSave.bind(this))
    win.setHandler('load', this.onLoad.bind(this))
    win.setHandler('delete', this.onDelete.bind(this))
    win.setHandler('cancel', this.onCancel.bind(this))
    this.addWindow(this._menuWindow)
  }

  Scene_File.prototype.onConfirmOk = function () {
    this._confirmWindow.deactivate()
    this._confirmWindow.close()
    if (this._mode === 'save') {
      setTimeout(this.performActionSave.bind(this), 200)
    } else if (this._mode === 'load') {
      setTimeout(this.performActionLoad.bind(this), 200)
    } else if (this._mode === 'delete') {
      setTimeout(this.performActionDelete.bind(this), 200)
    } else {
      this.onConfirmCancel()
    }
  }

  Scene_File.prototype.performActionSave = function () {
    $gameSystem.onBeforeSave()
    if (DataManager.saveGame(this.savefileId())) {
      this.onSaveSuccess()
    } else {
      this.onSaveFailure()
    }
    this.onConfirmCancel()
  }

  Scene_File.prototype.performActionLoad = function () {
    if (DataManager.loadGame(this.savefileId())) {
      this.onLoadSuccess()
    } else {
      this.onLoadFailure()
    }
  }

  Scene_File.prototype.performActionDelete = function () {
    SoundManager.playBattleStart()
    StorageManager.remove(this.savefileId())
    this.onConfirmCancel()
    this._listWindow.refresh()
  }

  Scene_File.prototype.onConfirmCancel = function () {
    this._helpWindow.setText(Param.selectText)
    var index = this._listWindow.index()
    this._confirmWindow.deactivate()
    this._confirmWindow.close()
    this._listWindow.activate()
    this._listWindow.select(index)
  }

  Scene_File.prototype.startConfirmWindow = function (text) {
    SoundManager.playOk()
    this._confirmWindow.setData(text)
    this._confirmWindow.open()
    this._confirmWindow.activate()
    this._confirmWindow.select(0)
  }

  Scene_File.prototype.onSavefileOk = function () {
    this.onActionLoad()
  }

  Scene_File.prototype.onActionLoad = function () {
    this._mode = 'load'
    this.startConfirmWindow(Param.loadText)
  }

  Scene_File.prototype.onActionSave = function (text) {
    this._mode = 'save'
    this.startConfirmWindow(text)
  }

  Scene_File.prototype.onActionDelete = function () {
    this._mode = 'delete'
    this.startConfirmWindow(Param.deleteText)
  }

  Scene_File.prototype.onLoadSuccess = function () {
    SoundManager.playLoad()
    this.fadeOutAll()
    this.reloadMapIfUpdated()
    SceneManager.goto(Scene_Map)
    this._loadSuccess = true
  }

  Scene_File.prototype.reloadMapIfUpdated = function () {
    if ($gameSystem.versionId() === $dataSystem.versionId) return
    $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y)
    $gamePlayer.requestMapReload()
  }

  Scene_File.prototype.startMenuWindow = function (text) {
    SoundManager.playOk()
    this._menuWindow.open()
    this._menuWindow.activate()
    this._menuWindow.select(0)
  }

  Scene_File.prototype.onSave = function () {
    this.closeMenu()
    this.onActionSave(Param.overwriteText)
  }

  Scene_File.prototype.onLoad = function () {
    this.closeMenu()
    this.onActionLoad()
  }

  Scene_File.prototype.onDelete = function () {
    this.closeMenu()
    this.onActionDelete()
  }

  Scene_File.prototype.onCancel = function () {
    var index = this._listWindow.index()
    this.closeMenu()
    this._listWindow.activate()
    this._listWindow.select(index)
    this._helpWindow.setText(Param.selectText)
  }

  Scene_File.prototype.closeMenu = function () {
    this._menuWindow.deactivate()
    this._menuWindow.close()
  }

  //=============================================================================
  // Scene_Save and Scene_Load
  //=============================================================================
  Scene_Save.prototype.onSavefileOk = function () {
    var id = this.savefileId()
    if (StorageManager.exists(id)) {
      this._helpWindow.setText(Param.menuText)
      this.startMenuWindow()
    } else {
      this.onActionSave(Param.saveText)
    }
  }

  Scene_Save.prototype.onSaveSuccess = function () {
    SoundManager.playSave()
    StorageManager.cleanBackup(this.savefileId())
    this._listWindow.refresh()
  }

  Scene_Load.prototype.onLoadSuccess = function () {
    Scene_File.prototype.onLoadSuccess.call(this)
  }

  Scene_Load.prototype.onSavefileOk = function () {
    var id = this.savefileId()
    if (StorageManager.exists(id)) {
      Scene_File.prototype.onSavefileOk.call(this)
    } else {
      Scene_File.prototype.onConfirmCancel.call(this)
    }
  }
})()