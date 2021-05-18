//=============================================================================
// DestinationWindow.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015-2017 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.2.1 2017/05/22 専用ウィンドウスキンを指定した状態でセーブ＆ロードした際にテキスト色が黒くなる問題を修正
// 1.2.0 2017/05/03 アイコン表示機能、横幅自動調整機能を追加、別の目標を指定したときに重なって表示される問題を修正
// 1.1.0 2017/05/02 メニュー画面にも表示できる機能を追加
// 1.0.0 2017/05/02 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================


/*:
 * @plugindesc 行动目标窗口插件(修改)
 * @author トリアコンタン 翻译xuhao1996 修改Blacktunes
 *
 * @param 目标窗口开关ID
 * @desc 是行动目标窗口显示的开关ID
 * @type number
 * @default 1
 *
 * @param 事件中关闭
 * @desc 在执行事件的时候关闭窗口。
 * @type boolean
 * @default true
 *
 * @param 窗口X坐标
 * @desc 窗口X坐标
 * @type number
 * @default 24
 *
 * @param 窗口Y坐标
 * @desc 窗口Y坐标
 * @type number
 * @default 24
 *
 * @param 窗口透明度
 * @desc 窗口的透明度。
 * @type number
 * @default 255
 *
 * @param 渐隐时间
 * @desc 窗口的淡入/淡出时间（帧数）。
 * @type number
 * @default 8
 *
 * @param 字体大小
 * @desc 窗口的字体大小。
 * @type number
 * @default 22
 *
 * @param 默认文字
 * @desc 主目标的默认文字
 * @default 随便逛逛吧
 *
 * @help 在地图上显示行动目标窗口。
 * 因为它可以显示包括控制字符在内的任何字符串，所以可以用于各种目的。
 * 要显示的内容是插件命令，是否显示它们由开关控制。
 *
 * 插件命令详细信息
 * 从事件命令“插入命令”执行。
 *（参数之间用空格分隔）
 *
 * DW_SET id icon msg 设置第一或第二行为msg
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function() {
    'use strict';
    var pluginName    = 'DestinationWindow';
    var metaTagPrefix = 'DW_';

    //=============================================================================
    // ローカル関数
    //  プラグインパラメータやプラグインコマンドパラメータの整形やチェックをします
    //=============================================================================
    var getParamString = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return '';
    };

    var getParamNumber = function(paramNames, min, max) {
        var value = getParamString(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value) || 0).clamp(min, max);
    };

    var getParamBoolean = function(paramNames) {
        return JSON.parse(getParamString(paramNames))
    };

    var getArgNumber = function(arg, min, max) {
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(arg) || 0).clamp(min, max);
    };

    var concatAllArguments = function(args) {
        return args.reduce(function(prevValue, arg) {
            return prevValue + ' ' + arg;
        }, '');
    };

    var setPluginCommand = function(commandName, methodName) {
        pluginCommandMap.set(metaTagPrefix + commandName, methodName);
    };

    //=============================================================================
    // パラメータの取得と整形
    //=============================================================================
    var param               = {};
    param.showingSwitchId   = getParamNumber(['ShowingSwitchId', '目标窗口开关ID'], 0);
    param.windowX           = getParamNumber(['WindowX', '窗口X坐标']);
    param.windowY           = getParamNumber(['WindowY', '窗口Y坐标']);
    param.windowOpacity     = getParamNumber(['WindowOpacity', '窗口透明度']);
    param.fadeFrame         = getParamNumber(['FadeFrame', '渐隐时间'], 1);
    param.fontSize          = getParamNumber(['FontSize', '字体大小'], 12);
    param.closeEventRunning = getParamBoolean(['CloseEventRunning', '事件中关闭']);
    param.default           = getParamString(['default', '默认文字']);

    var pluginCommandMap = new Map();
    setPluginCommand('SET', 'setDestination');

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンドを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        var pluginCommandMethod = pluginCommandMap.get(command.toUpperCase());
        if (pluginCommandMethod) {
            this[pluginCommandMethod](args);
        }
    };

    Game_Interpreter.prototype.setDestination = function (args) {
        if (args.length < 2) return
        const id = Number(args.shift())
        const icon = args.shift()
        $gameSystem.setDestinationIcon(id, icon)
        $gameSystem.setDestination(id, args.join(' '))
    };

    //=============================================================================
    // Game_System
    //  目標テキストを追加定義します。
    //=============================================================================
    Game_System.prototype.setDestination = function (type, value) {
        if (type == 2) {
            if (!this.getDestination(1)) {
                this._destinationText_1 = param.default;
            }
            this._destinationText_2 = value;
        } else {
            if (!value && this.getDestination(2)) {
                this._destinationText_1 = param.default;
            } else {
                this._destinationText_1 = value;
            }
        }
    };

    Game_System.prototype.getDestination = function (type) {
        if (type == 2) {
            return this._destinationText_2 || '';
        } else {
            return this._destinationText_1 || '';
        }
    };

    Game_System.prototype.setDestinationIcon = function (type, value) {
        if (type == 2) {
            this._destinationIconIndex_2 = value;
        } else {
            this._destinationIconIndex_1 = value;
        }
    };

    Game_System.prototype.getDestinationIcon = function (type) {
        if (type == 2) {
            return this._destinationIconIndex_2 || '';
        } else {
            return this._destinationIconIndex_1 || '';
        }
    };

    //=============================================================================
    // Scene_Map
    //  行動目標ウィンドウを生成します。
    //=============================================================================
    var _Scene_Map_createMapNameWindow      = Scene_Map.prototype.createMapNameWindow;
    Scene_Map.prototype.createMapNameWindow = function() {
        this.createDestinationWindow();
        _Scene_Map_createMapNameWindow.apply(this, arguments);
    };

    Scene_Map.prototype.createDestinationWindow = function() {
        this._destinationWindow = new Window_Destination(param.windowX, param.windowY, 100);
        this.addChild(this._destinationWindow);
    };

    // //=============================================================================
    // // Scene_Menu
    // //  メニュー画面にも表示できるようにします。
    // //=============================================================================
    // var _Scene_Menu_create = Scene_Menu.prototype.create;
    // Scene_Menu.prototype.create = function () {
    //     _Scene_Menu_create.apply(this, arguments);
    //     this.createDestinationWindow();
    // };

    // Scene_Menu.prototype.createDestinationWindow = function () {
    //     var y, width, height;
    //     if (this._commandWindow.maxCols() === 1) {
    //         y = this._commandWindow.y + this._commandWindow.height;
    //         width = this._commandWindow.width;
    //         height = null;
    //     } else {
    //         y = this._goldWindow.y;
    //         width = param.windowWidth;
    //         height = this._goldWindow.height;
    //     }
    //     this._destinationWindow = new Window_Destination(0, y, width, height);
    //     this.addWindow(this._destinationWindow);
    // };


    //=============================================================================
    // Window_Destination
    //  行動目標ウィンドウです。
    //=============================================================================
    function Window_Destination() {
        this.initialize.apply(this, arguments);
    }

    Window_Destination.prototype             = Object.create(Window_Base.prototype);
    Window_Destination.prototype.constructor = Window_Destination;

    Window_Destination.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height || this.fittingHeight(1));
        this._text1 = '';
        this._text2 = '';
        this._iconIndex1 = 0;
        this._iconIndex2 = 0;
        this._change = false
        this.update();
        this.opacity = this.isVisible() ? 255 : 0;
    };

    Window_Destination.prototype.lineHeight = function() {
        return Math.max(this.standardFontSize() + 8, Window_Base._iconHeight);
    };

    Window_Destination.prototype.standardFontSize = function() {
        return param.fontSize || Window_Base.prototype.standardFontSize.call(this);
    };

    Window_Destination.prototype.standardBackOpacity = function() {
        return param.windowOpacity || Window_Base.prototype.standardBackOpacity.call(this);
    };

    Window_Destination.prototype.standardPadding = function() {
        return 12;
    };

    Window_Destination.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        if (!this.windowskin.isReady()) return;
        this.updateText();
        this.updateOpacity();
    };

    Window_Destination.prototype.updateOpacity = function() {
        if (this.isVisible()) {
            this.setOpacity(this.opacity + this.getFadeValue());
        } else {
            this.setOpacity(this.opacity - this.getFadeValue());
        }
        this.visible = (this.opacity > 0);
    };

    Window_Destination.prototype.updateText = function() {
        var text1 = this.convertEscapeCharacters($gameSystem.getDestination(1));
        var text2 = this.convertEscapeCharacters($gameSystem.getDestination(2));
        var iconIndex1 = getArgNumber(this.convertEscapeCharacters($gameSystem.getDestinationIcon(1)), 0);
        var iconIndex2 = getArgNumber(this.convertEscapeCharacters($gameSystem.getDestinationIcon(2)), 0);
        if (this._text1 === text1 && this._iconIndex1 === iconIndex1 && this._text2 === text2 && this._iconIndex2 === iconIndex2) return;

        if (!!text1 !== !!this._text1 || !!text2 !== !! this._text2) {
            this._change = true
        }
        if (!this._text1) {
            this._change = true
        }
        this._text1      = text1;
        this._iconIndex1 = iconIndex1;
        this._text2 = text2;
        this._iconIndex2 = iconIndex2;
        if (this._change) {
            if (!this._text2) {
                this.move(param.windowX, param.windowY, this.contents.fontSize * this._text1.length + (iconIndex1 > 0 ? Window_Base._iconWidth + this.standardPadding() * 3 : this.standardPadding() * 2), this.fittingHeight(1))
            } else {
                this.move(param.windowX, param.windowY, Math.max(this.contents.fontSize * this._text1.length + (iconIndex1 > 0 ? Window_Base._iconWidth + this.standardPadding() * 3 : this.standardPadding() * 2), this.contents.fontSize * this._text2.length + (iconIndex2 > 0 ? Window_Base._iconWidth + this.standardPadding() * 3 : this.standardPadding() * 2)), this.fittingHeight(2))
            }
            this.updatePadding();
            this.updateBackOpacity();
            this.updateTone();
            this.createContents();
            this._change = !this._change
        }
        this.drawDestination();
    };

    Window_Destination.prototype.drawDestination = function() {
        this.contents.clear();
        var x_1 = 0;
        var x_2 = 0;
        var y = this.contentsHeight() / 2 - this.contents.fontSize / 2 - 4;
        if (this._iconIndex1 > 0) {
            if (this._text2) {
                this.drawIcon(this._iconIndex1, x_1, y - this.standardPadding() - 4);
            } else {
                this.drawIcon(this._iconIndex1, x_1, y);

            }
            x_1 += Window_Base._iconWidth;
        }
        if (this._iconIndex2 > 0) {
            this.drawIcon(this._iconIndex2, x_2, y * 2 - 1);
            x_2 += Window_Base._iconWidth;
        }
        this.resetTextColor();
        if (!this._text2) {
            this.drawText(this._text1, x_1, y, this.contentsWidth() - x_1, 'left');
        } else {
            this.drawText(this._text1, x_1, y - this.standardPadding() - 4, this.contentsWidth() - x_1, 'left');
            this.changeTextColor('#ccc')
            this.drawText(this._text2, x_2, y * 2 - 1, this.contentsWidth() - x_2, 'left');

        }
    };

    Window_Destination.prototype.setOpacity = function(value) {
        this.opacity         = value;
        this.contentsOpacity = value;
    };

    Window_Destination.prototype.getFadeValue = function() {
        return 255 / param.fadeFrame
    };

    Window_Destination.prototype.isVisible = function() {
        return $gameSwitches.value(param.showingSwitchId) && !this.isEventRunning() && (!!this._text1 || !!this._iconIndex1 || !!this._text2 || !!this._iconIndex2);
    };

    Window_Destination.prototype.isEventRunning = function() {
        return $gameMap.isEventRunning() && param.closeEventRunning;
    };
})();
