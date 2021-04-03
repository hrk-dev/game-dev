/*:
* @author 日月星辰
* @author https://rpg.blue/thread-390550-1-1.html
* @plugindesc 屏幕截图&模糊 工具
* @help
* 1. 在事件中显示名为 snap 的图片即可获取全屏截图 （可随便放一张图片，推荐为空）
* 2. 在事件中显示名为 blur 的图片即可获取全屏截图并模糊 （同上）
* 3. 在事件中使用插件指令： blurPart x, y, w, h, opacity, id,
*    即可获取区域截图并模糊，保存至id号图片
*
* @param blurLevel
* @desc 模糊的等级，越高越糊，推荐范围[1,5]，默认1
* @default 1
*/
 
var params = PluginManager.parameters('SnapBlur');
 
var blurLevel = Number(params['blurLevel'] || 1);
 
var x;
var y;
var w;
var h;
 
(function() {
Sprite_Picture.prototype.loadBitmap = function() {
  if (this._pictureName === "snap") {
    this.bitmap = SceneManager.snap();
  } else if (this._pictureName === "blur" ){
    this.bitmap = SceneManager.snap();
    for (var i = 0; i < blurLevel; i++)
      this.bitmap.blur();
  } else if (this._pictureName === "blurPart") {
    this.bitmap = SceneManager.snap();
    for (var i = 0; i < blurLevel; i++)
      this.bitmap.blurArea(x, y, w, h);
  } else {
    this.bitmap = ImageManager.loadPicture(this._pictureName);
  }
};
})();
 
var alias_command = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  alias_command.call(this, command, args);
  if (command === 'blurPart') {
    x = parseInt(args[0]);
    y = parseInt(args[1]);
    w = parseInt(args[2]);
    h = parseInt(args[3]);
 
    var opacity = parseInt(args[4]);
    var id = parseInt(args[5]);
 
    $gameScreen.showPicture(id, "blurPart" ,0, 0, 0, 100, 100, opacity, 0, x, w, y, h);
  }
  return true;
};
 
Bitmap.prototype.blurArea = function(x, y, w, h) {
    for (var i = 0; i < 2; i++) {
        var canvas = this._canvas;
        var context = this._context;
        var tempCanvas = document.createElement('canvas');
        var tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = w + 2;
        tempCanvas.height = h + 2;
        tempContext.drawImage(canvas, x, y, w, h, 1, 1, w, h);
        tempContext.drawImage(canvas, x, y, w, 1, 1, 0, w, 1);
        tempContext.drawImage(canvas, x, y, 1, h, 0, 1, 1, h);
        tempContext.drawImage(canvas, x, h - 1, w, 1, 1, h + 1, w, 1);
        tempContext.drawImage(canvas, w - 1, y, 1, h, w + 1, 1, 1, h);
        context.save();
        context.fillStyle = 'black';
        context.fillRect(x, y, w, h);
        context.globalCompositeOperation = 'lighter';
        context.globalAlpha = 1 / 9;
        for (var yy = 0; yy < 3; yy++) {
            for (var xx = 0; xx < 3; xx++) {
                context.drawImage(tempCanvas, xx, yy, w, h, x, y, w, h);
            }
        }
        context.restore();
    }
    this._setDirty();
};