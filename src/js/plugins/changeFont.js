Window_Base.prototype.standardFontFace = function () {
  if ($gameSystem.isChinese()) {
    return 'GameFont, SimHei, Heiti TC, sans-serif';
  } else if ($gameSystem.isKorean()) {
    return 'GameFont, Dotum, AppleGothic, sans-serif';
  } else {
    return 'GameFont';
  }
};

Window_TitleCommand.prototype.drawText = function (text, x, y, maxWidth) {
  this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), 'left');
};
