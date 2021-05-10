/*:
 * @plugindesc 制作组
 * @author Blacktunes
 *
 * @param 公共事件ID
 * @default 1
 * @type number
 *
 * @param 标题
 * @desc 标题选项的名称用语。
 * @default 制作组
 *
 */

var Credits = {};
Credits.Parameters = PluginManager.parameters('Credits');

var _makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function () {
	_makeCommandList.call(this);
	this.addCommand(String(Credits.Parameters['标题'] || "Credits"), 'mcredits');
};


var _credits = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function () {
	_credits.call(this);
	this._commandWindow.setHandler('mcredits', this.commandMCredits.bind(this));
};

// 公共事件
Scene_Title.prototype.commandMCredits = function () {
	DataManager.setupNewGame();
	this._commandWindow.close();
	this.fadeOutAll();
	SceneManager.goto(Scene_Map);
	$gameTemp.reserveCommonEvent(Number(Credits.Parameters['公共事件ID'] || "Credits"), 1)
};
