/*:
 * @plugindesc 打开游戏显示LOGO，根据官方插件MadeWithMv修改，增加跳过功能
 * @author Dan 'Liquidize' Deptula & Blacktunes
 *
 * @help This plugin does not provide plugin commands.
 *
 * @param 是否显示LOGO图
 * @type boolean
 * @default true
 *
 * @param LOGO图片
 * @default logo
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 是否显示自定义图片
 * @type boolean
 * @default false
 *
 * @param 自定义图片
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 渐隐时长
 * @default 120
 * @type Number
 *
 * @param 渐入时长
 * @default 120
 * @type Number
 *
 * @param 显示时长
 * @default 160
 * @type Number
 *
 */

//-----------------------------------------------------------------------------
// Scene_Splash
//
// This is a constructor, implementation is done in the inner scope.

function Scene_Splash() {
    this.initialize.apply(this, arguments);
}

(function () {
    const ShowLogo = {};
    ShowLogo.Parameters = PluginManager.parameters('ShowLogo');
    ShowLogo.ShowLogo = JSON.parse(ShowLogo.Parameters['是否显示LOGO图']);
    ShowLogo.LogoImage = String(ShowLogo.Parameters['LOGO图片']);
    ShowLogo.ShowCustom = JSON.parse(ShowLogo.Parameters['是否显示自定义图片']);
    ShowLogo.CustomImage = String(ShowLogo.Parameters['自定义图片']);
    ShowLogo.FadeOutTime = Number(ShowLogo.Parameters['渐隐时长']) || 120;
    ShowLogo.FadeInTime = Number(ShowLogo.Parameters['渐入时长']) || 120;
    ShowLogo.WaitTime = Number(ShowLogo.Parameters['显示时长']) || 160;

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //
    // The scene class for dealing with the game boot.

    var _Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
    Scene_Boot.prototype.loadSystemImages = function () {
        _Scene_Boot_loadSystemImages.call(this);
        if (ShowLogo.ShowLogo) {
            ImageManager.loadSystem(ShowLogo.LogoImage);
        }
        if (ShowLogo.ShowCustom) {
            ImageManager.loadSystem(ShowLogo.CustomImage);
        }
    };

    var _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        if ((ShowLogo.ShowLogo || ShowLogo.ShowCustom) && !DataManager.isBattleTest() && !DataManager.isEventTest()) {
            SceneManager.goto(Scene_Splash);
        } else {
            _Scene_Boot_start.call(this);
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Splash
    //
    // The scene class for dealing with the splash screens.

    Scene_Splash.prototype = Object.create(Scene_Base.prototype);
    Scene_Splash.prototype.constructor = Scene_Splash;

    Scene_Splash.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
        this._mvSplash = null;
        this._customSplash = null;
        this._mvWaitTime = ShowLogo.WaitTime;
        this._customWaitTime = ShowLogo.WaitTime;
        this._mvFadeOut = false;
        this._mvFadeIn = false;
        this._waitTime = Math.min(ShowLogo.FadeInTime, ShowLogo.FadeOutTime)
        this._customFadeOut = false;
        this._customFadeIn = false;
        this._skip = false
        if (ShowLogo.ShowLogo || ShowLogo.ShowCustom) {
            document.addEventListener('keydown', this.skip.bind(this), {
                once: true
            });
            document.addEventListener('mousedown', this.skip.bind(this), {
                once: true
            });
        }
    };

    Scene_Splash.prototype.skip = function () {
        if (this._skip) return
        this._skip = true
        if (ShowLogo.ShowLogo) {
            if (this._mvFadeOut) {
                this._fadeDuration = 20
            } else {
                this._mvFadeOut = true;
                this.startFadeOut(0, false)
            }
            if (ShowLogo.ShowCustom) {
                if (this._waitTime <= 0) {
                    if (this._customFadeOut) {
                        this._fadeDuration = 20
                    } else {
                        this._customFadeOut = true;
                        this.startFadeOut(0, false)
                    }
                    this._customWaitTime = 0
                } else {
                    this._customFadeOut = true;
                    this._customWaitTime = 0
                    this.removeChild(this._customSplash)
                }
            }
            this._mvWaitTime = 0
        } else {
            if (ShowLogo.ShowCustom) {
                this.removeChild(this._customSplash)
                if (this._customFadeOut) {
                    this._fadeDuration = 20
                } else {
                    this._customFadeOut = true;
                    this.startFadeOut(0, false)
                }
                this._customWaitTime = 0
            }
        }
    }

    Scene_Splash.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createSplashes();
    };

    Scene_Splash.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        SceneManager.clearStack();
        if (this._mvSplash != null) {
            this.centerSprite(this._mvSplash);
        }
        if (this._customSplash != null) {
            this.centerSprite(this._customSplash);
        }
    };

    Scene_Splash.prototype.update = function () {
        if (ShowLogo.ShowLogo) {
            this._mvSplash.opacity = 255;
            if (!this._mvFadeIn) {
                this.startFadeIn(ShowLogo.FadeInTime, false);
                this._mvFadeIn = true;
            } else {
                if (this._mvWaitTime > 0 && this._mvFadeOut == false) {
                    this._mvWaitTime--;
                } else {
                    if (this._mvFadeOut == false) {
                        this._mvFadeOut = true;
                        this.startFadeOut(ShowLogo.FadeOutTime, false);
                    }
                }
            }
        }

        if (ShowLogo.ShowCustom) {
            if (ShowLogo.ShowLogo && this._mvFadeOut == true) {
                if (this._waitTime > 0) {
                    this._waitTime--
                } else {
                    if (!this._customFadeIn && this._fadeDuration == 0) {
                        this._customSplash.opacity = 255;
                        this.startFadeIn(ShowLogo.FadeInTime, false);
                        this._customFadeIn = true;
                    } else {
                        if (this._customWaitTime > 0 && this._customFadeOut == false) {
                            this._customWaitTime--;
                        } else {
                            if (this._customFadeOut == false) {
                                this._customFadeOut = true;
                                this.startFadeOut(ShowLogo.FadeOutTime, false);
                            }
                        }
                    }
                }
            } else if (!ShowLogo.ShowLogo) {
                if (!this._customFadeIn) {
                    this._customSplash.opacity = 255;
                    this.startFadeIn(ShowLogo.FadeInTime, false);
                    this._customFadeIn = true;
                } else {
                    if (this._customWaitTime > 0 && this._customFadeOut == false) {
                        this._customWaitTime--;
                    } else {
                        if (this._customFadeOut == false) {
                            this._customFadeOut = true;
                            this.startFadeOut(ShowLogo.FadeOutTime, false);
                        }
                    }
                }
            }
        }

        if (ShowLogo.ShowCustom) {
            if (ShowLogo.ShowLogo && this._mvFadeOut == true && this._customFadeOut == true) {
                this.gotoTitleOrTest();
            } else if (!ShowLogo.ShowLogo && this._customFadeOut == true) {
                this.gotoTitleOrTest();
            }
        } else {
            if (this._mvFadeOut == true) {
                this.gotoTitleOrTest();
            }
        }

        Scene_Base.prototype.update.call(this);
    };

    Scene_Splash.prototype.createSplashes = function () {
        if (ShowLogo.ShowLogo) {
            this._mvSplash = new Sprite(ImageManager.loadSystem(ShowLogo.LogoImage));
            this._mvSplash.opacity = 0;
            this.addChild(this._mvSplash);
        }
        if (ShowLogo.ShowCustom) {
            this._customSplash = new Sprite(ImageManager.loadSystem(ShowLogo.CustomImage));
            this._customSplash.opacity = 0;
            this.addChild(this._customSplash);
        }
    };

    Scene_Splash.prototype.centerSprite = function (sprite) {
        sprite.x = Graphics.width / 2;
        sprite.y = Graphics.height / 2;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
    };

    Scene_Splash.prototype.gotoTitleOrTest = function () {
        Scene_Base.prototype.start.call(this);
        SoundManager.preloadImportantSounds();
        if (DataManager.isBattleTest()) {
            DataManager.setupBattleTest();
            SceneManager.goto(Scene_Battle);
        } else if (DataManager.isEventTest()) {
            DataManager.setupEventTest();
            SceneManager.goto(Scene_Map);
        } else {
            this.checkPlayerLocation();
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Title);
            Window_TitleCommand.initCommandPosition();
        }
        this.updateDocumentTitle();
    };

    Scene_Splash.prototype.updateDocumentTitle = function () {
        document.title = $dataSystem.gameTitle;
    };

    Scene_Splash.prototype.checkPlayerLocation = function () {
        if ($dataSystem.startMapId === 0) {
            throw new Error('Player\'s starting position is not set');
        }
    };

})();