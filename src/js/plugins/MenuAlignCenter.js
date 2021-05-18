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
}) ();