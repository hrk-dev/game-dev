/*:
 * @plugindesc 文字居中
 * @author Blacktunes
 *
 * @help This plugin does not provide plugin commands.
 */

(function () {
  Window_Command.prototype.itemTextAlign = function () {
    return 'center';
  };

  Window_Base.prototype.drawText = function (text, x, y, maxWidth, align) {
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align || 'center');
  };

  Window_ChoiceList.prototype.drawItem = function (index) {
    var rect = this.itemRectForText(index);
    if ($gameMessage.choicePositionType() === 1) {
      this.drawText(this.commandName(index), rect.x, rect.y, rect.width, 'center');
    } else {
      this.drawTextEx(this.commandName(index), rect.x, rect.y);
    }
  };

  Window_ChoiceList.prototype.updatePlacement = function () {
    var positionType = $gameMessage.choicePositionType();
    var messageY = this._messageWindow.y;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    switch (positionType) {
      case 0:
        this.x = 0;
        break;
      case 1:
        this.x = (Graphics.boxWidth - this.width) / 2;
        break;
      case 2:
        this.x = Graphics.boxWidth - this.width;
        break;
    }
    if (positionType === 1) {
      this.y = (Graphics.height - this.windowHeight()) / 2
    } else {
      if (messageY >= Graphics.boxHeight / 2) {
        this.y = messageY - this.height;
      } else {
        this.y = messageY + this._messageWindow.height;
      }
    }
  };
})();