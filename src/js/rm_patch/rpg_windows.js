/**
 * 修改默认字体
 */
Window_Base.prototype.standardFontFace = function () {
  if ($gameSystem.isChinese()) {
    return 'GameFont, SimHei, Heiti TC, sans-serif';
  } else if ($gameSystem.isKorean()) {
    return 'GameFont, Dotum, AppleGothic, sans-serif';
  } else {
    return 'GameFont';
  }
};
