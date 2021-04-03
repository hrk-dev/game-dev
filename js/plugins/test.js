(function () {
  Window_Base.prototype.drawText = function (text, x, y, maxWidth, align) {
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), 'center');
  };
}) ();