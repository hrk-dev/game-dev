/*:
 * @plugindesc Namepop Ver 1.03 NPC名称显示
 * @author Morpho(dongdongDJH)
 * 
 * @help 
 * 在地图事件注释栏内填入 NAMEPOP|高度修正值|字体Size|字体颜色;
 * 高度修正值单位为1格，不填默认为1,字体大小不填默认为18;
 * 例：NAMEPOP|1|18|#00FF00 ; NAMEPOP||20 ; 
 * 注:一定要用‘|’分隔高度修正值和字体Size;
 * 若要调整描边 请直接在下方代码中调整 （ps：0.8是颜色的透明度，0-1）
 */
(function() {
	_Sprite_Character_prototype_initialize = Sprite_Character.prototype.initialize;
	Sprite_Character.prototype.initialize = function(character) {
		_Sprite_Character_prototype_initialize.call(this, character);
		this._tempCharacter = character;
		if (character instanceof Game_Event) {
			if (character.event().note.match("NAMEPOP") != null) {
				var notetext = character.event().note.split("|");
				this._namepopY = Number(notetext[1]) || 1;
				this._fontSize = Number(notetext[2]) || 18;
				this._BYcolor  =  notetext[3] || "#FFFFFF";
				this.createNamepopSet();
			}
		}
	};

	Sprite_Character.prototype.createNamepopSet = function() {
		var h = this._fontSize;
		this._namepopSprite = new Sprite();
		this._namepopSprite.bitmap = new Bitmap(h * 10, h);
		this._namepopSprite.bitmap.fontSize = h;
		this._namepopSprite.bitmap.outlineColor = "rgba(0, 0, 0, 0.8)"//描边颜色
		this._namepopSprite.bitmap.outlineWidth = 4;//字体描边
		this._namepopSprite.bitmap.textColor = this._BYcolor;//字体颜色
		this._namepopSprite.bitmap.drawText(this._tempCharacter.event().name, 0, 0, h * 10, h, 'center');
		this._namepopSprite.anchor.x = 0.5;
		this._namepopSprite.anchor.y = 1;
		this._namepopSprite.y = this.y - this._namepopY * 48;
		this.addChild(this._namepopSprite);
	};
	
 // ---- 新增跟随事件显示 ----
	_Sprite_Character_prototype_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
	Sprite_Character.prototype.setCharacterBitmap = function() {
		_Sprite_Character_prototype_setCharacterBitmap.call(this);
        if (this._tempCharacter instanceof Game_Event) {
			this._BYconditions = this._tempCharacter.findProperPageIndex();
			if(this._BYconditions >= 0 &&  this._namepopSprite){
				this._namepopSprite.visible = true;
			}else if(this._namepopSprite){
				this._namepopSprite.visible = false;
			}

		}
	};

  // ---- Game_Event ----
  // -------------------------------
	// _Game_Event_prototype_refresh = Game_Event.prototype.refresh;
	// Game_Event.prototype.refresh = function() {
	// 	_Game_Event_prototype_refresh.call(this);

	// };
}());