/*:
 * @plugindesc 主页按钮
 * @author Blacktunes
 *
 * @param 按钮标题A
 * @default 制作组
 *
 * @param 按钮A公共事件ID
 * @default 1
 * @type number
 *
 * @param 按钮标题B
 * @default 寂しい
 *
 * @param 按钮B公共事件ID
 * @default 2
 * @type number
 *
 * @param 回忆之间组按钮标题
 * @default 回忆之间
 *
 * @param 回忆之间公共事件ID
 * @default 3
 * @type number
 *
 * @help
 * SET_CREDITS Boolean 是否显示标题A(false为显示B)
 * SET_CREDITS_NORMAL Boolean 是否显示正常的制作组
 * SET_MEMOR Boolean 是否显示回忆之间
 */


(function () {
	const _globalInfo = DataManager.loadGlobalInfo() || [];
	_globalInfo[0] = { ...{ memory: false, credits: false, normal: false }, ..._globalInfo[0] };
	DataManager.saveGlobalInfo(_globalInfo);

	var Credits = {};
	Credits.Parameters = PluginManager.parameters('Credits');

	var _makeCommandList = Window_TitleCommand.prototype.makeCommandList;
	Window_TitleCommand.prototype.makeCommandList = function () {
		const globalInfo = DataManager.loadGlobalInfo() || [];

		_makeCommandList.call(this);
		if (globalInfo[0] && globalInfo[0].credits) {
			this.addCommand(String(Credits.Parameters['按钮标题A'] || '制作组'), 'mcredits_A')
		} else {
			this.addCommand(String(Credits.Parameters['按钮标题B'] || '寂しい'), 'mcredits_B')
		}
		if (globalInfo[0] && globalInfo[0].memory) {
			this.addCommand(String(Credits.Parameters['回忆之间组按钮标题'] || '回忆之间'), 'memory');
		}
		this.addCommand('Exit', 'exit_game');
	};


	var _credits = Scene_Title.prototype.createCommandWindow;

	Scene_Title.prototype.fadeSpeed = function () {
		return 1
	}

	Scene_Title.prototype.createCommandWindow = function () {
		_credits.call(this);
		this._commandWindow.setHandler('mcredits_A', this.commandCreditsA.bind(this));
		this._commandWindow.setHandler('mcredits_B', this.commandCreditsB.bind(this));
		this._commandWindow.setHandler('memory', this.commandMemory.bind(this));
		this._commandWindow.setHandler('exit_game', this.commandExit.bind(this));
	};

	Scene_Title.prototype.nextRound = function (loop) {
		if (DataManager.loadGame(loop)) {
			SoundManager.playLoad();
			this.fadeOutAll();
			if ($gameSystem.versionId() !== $dataSystem.versionId) {
				$gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
				$gamePlayer.requestMapReload();
			}
			SceneManager.goto(Scene_Map);
			this._loadSuccess = true;
			$gameTemp.reserveCommonEvent(loop === 101 ? 5 : 6)
		} else {
			DataManager.setupNewGame();
			this._commandWindow.close();
			this.fadeOutAll();
			$gameTemp.reserveCommonEvent(loop === 101 ? 5 : 6)
		}
	};

	Scene_Title.prototype.commandCreditsA = function () {
		DataManager.setupNewGame();
		this._commandWindow.close();
		this.fadeOutAll();
		SceneManager.goto(Scene_Map);
		$gameTemp.reserveCommonEvent(Number(Credits.Parameters['按钮A公共事件ID'] || 1))
	};

	Scene_Title.prototype.commandCreditsB = function () {
		DataManager.setupNewGame();
		this._commandWindow.close();
		this.fadeOutAll();
		SceneManager.goto(Scene_Map);
		$gameTemp.reserveCommonEvent(Number(Credits.Parameters['按钮B公共事件ID'] || 2))
	};

	Scene_Title.prototype.commandMemory = function () {
		DataManager.setupNewGame();
		this._commandWindow.close();
		this.fadeOutAll();
		SceneManager.goto(Scene_Map);
		$gameTemp.reserveCommonEvent(Number(Credits.Parameters['回忆之间公共事件ID'] || 3))
	};

	Scene_Title.prototype.commandExit = function () {
		SceneManager.exit()
	};

	var _credits_command = {
		'SET_MEMOR': 'setMemoryButton',
		'SET_CREDITS': 'setCreditsButton',
		'SET_CREDITS_NORMAL': 'setCreditsNormal'
	}

	var _credits_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_credits_pluginCommand.apply(this, arguments);
		if (_credits_command[command.toUpperCase()]) {
			$gameSystem[_credits_command[command.toUpperCase()]](JSON.parse(args[0]));
		}
	};

	Game_System.prototype.setMemoryButton = function (flag) {
		const globalInfo = DataManager.loadGlobalInfo() || [];
		globalInfo[0] = { ...globalInfo[0], ...{ memory: flag } };
		DataManager.saveGlobalInfo(globalInfo);
	};

	Game_System.prototype.setCreditsButton = function (flag) {
		const globalInfo = DataManager.loadGlobalInfo() || [];
		globalInfo[0] = { ...globalInfo[0], ...{ credits: flag } };
		DataManager.saveGlobalInfo(globalInfo);
	};

	Game_System.prototype.setCreditsNormal = function (flag) {
		const globalInfo = DataManager.loadGlobalInfo() || [];
		globalInfo[0] = { ...globalInfo[0], ...{ normal: flag } };
		DataManager.saveGlobalInfo(globalInfo);
	};
})()
