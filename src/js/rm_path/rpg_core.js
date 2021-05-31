/**
 * 默认返回非nwjs以禁用nwjs相关代码
 */
Utils.isNwjs = function () {
  return false
};

/**
 * VUE层视频播放进度
 * 待修改
 */
Graphics._playVideo = function (src) {
  this._video.src = src;
  this._video.onloadeddata = this._onVideoLoad.bind(this);
  this._video.onerror = this._videoLoader;
  this._video.onended = this._onVideoEnd.bind(this);
  this._video.load();
  this._videoLoading = true;
  if (VueMain.app) {
    VueMain.app.$refs.video.show = true
    this._video.oncanplay = () => {
      VueMain.app.$refs.video.duration = this._video.duration | 0
    }
    this._video.ontimeupdate = () => {
      VueMain.app.$refs.video.current = this._video.currentTime | 0
    }
  }
};

/**
 * VUE适配
 * 待修改
 */
Graphics._updateRealScale = function () {
  if (this._stretchEnabled) {
    var h = window.innerWidth / this._width;
    var v = (window.innerHeight - 30) / this._height;
    if (h >= 1 && h - 0.01 <= 1) h = 1;
    if (v >= 1 && v - 0.01 <= 1) v = 1;
    this._realScale = Math.min(h, v);

    if (VueMain.app) {
      VueMain.app.main.width = this._width * this._realScale
      VueMain.app.main.height = this._height * this._realScale
      VueMain.app.main.scale = this._realScale
      const margin = (window.innerHeight - 30 - VueMain.app.main.height) / 2;
      VueMain.app.main.margin = `${margin + 30}px auto ${margin}px auto`
    }
  } else {
    this._realScale = this._scale;
  }
};

/**
 * 默认开启自适应
 */
Graphics._defaultStretchMode = function () {
  return true
};

/**
 * 标题栏适配
 */
Graphics._createModeBox = function () {
  var box = document.createElement('div');
  box.id = 'modeTextBack';
  box.style.position = 'absolute';
  box.style.left = '5px';
  box.style.top = '35px';
  box.style.width = '119px';
  box.style.height = '58px';
  box.style.background = 'rgba(0,0,0,0.2)';
  box.style.zIndex = 9;
  box.style.opacity = 0;

  var text = document.createElement('div');
  text.id = 'modeText';
  text.style.position = 'absolute';
  text.style.left = '0px';
  text.style.top = '41px';
  text.style.width = '119px';
  text.style.fontSize = '12px';
  text.style.fontFamily = 'monospace';
  text.style.color = 'white';
  text.style.textAlign = 'center';
  text.style.textShadow = '1px 1px 0 rgba(0,0,0,0.5)';
  text.innerHTML = this.isWebGL() ? 'WebGL mode' : 'Canvas mode';

  document.body.appendChild(box);
  box.appendChild(text);

  this._modeBox = box;
};

/**
 * 标题栏适配
 */
Graphics._centerElement = function (element) {
  var width = element.width * this._realScale;
  var height = element.height * this._realScale;
  element.style.position = 'absolute';
  const margin = (window.innerHeight - 30 - height) / 2;
  element.style.margin = `${margin + 30}px auto ${margin}px auto`;
  element.style.top = 0;
  element.style.left = 0;
  element.style.right = 0;
  element.style.bottom = 0;
  element.style.width = width + 'px';
  element.style.height = height + 'px';
};

/**
 * 视频播放结束隐藏VUE层
 */
Graphics._onVideoEnd = function () {
  if (VueMain.app) {
    VueMain.app.$refs.video.show = false
  }
  this._updateVisibility(false);
};

/**
 * 禁用F3 F4
 */
Graphics._onKeyDown = function (event) {
  if (!event.ctrlKey && !event.altKey) {
    if (event.keyCode === 112) {
        event.preventDefault();
        this._switchFPSMeter();
    }
  }
};
