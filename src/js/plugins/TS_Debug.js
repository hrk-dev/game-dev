//=========================================================
// TS_Debug
//=========================================================

/*:ja
 * @plugindesc
 * デバッグ用の処理
 */


(function() {
	
	TS_Debug = {};
	
	TS_Debug.MessageSkip = false;
	
	TS_Debug.scenarioLoad = function() {
		
		this.scenarioList = [];
		
		var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/scenario/');
		if (path.match(/^\/([A-Z]\:)/)) {
			path = path.slice(1);
		}
		path = decodeURIComponent(path);
		
		//var lang_val = $gameVariables.value(TS_GameConfig.LanguageVal);
		var lang_val = $gameVariables.value(11);
		var fs = require('fs');
		var filepath = path+'scenario_all.txt';
		var file_data = fs.readFileSync(filepath, 'utf-8');
		var s_list = file_data.split('\n');
		
		for(var i=0, len=s_list.length; i<len; i++){
			var text = s_list[i];
			// 空の文字列
			text = text.replace(/[\n\r]/g,"");
			text = text.replace(/.txt/g,"");
			text = text.trim();
			if( text.trim() == "" || text.trim() == '\r' ) continue;
			
			this.scenarioList.push(text);
			
		}
		
		
		TS_Debug.MessageSkip = true;
	};
	
	TS_Debug.setScenario = function() {
		this.scenario = this.scenarioList.shift();
		
		if(this.scenario == undefined){
			TS_Debug.MessageSkip = false;
		}
	};
	
	
	
})();
