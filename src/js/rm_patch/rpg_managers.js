/**
 * 读取GlobalInfo时去除空数据
 */
DataManager.loadGlobalInfo = function () {
  var json;
  try {
    json = StorageManager.load(0);
  } catch (e) {
    console.error(e);
    return [];
  }
  if (json) {
    var globalInfo = JSON.parse(json);
    for (var i = 1; i <= this.maxSavefiles(); i++) {
      if (!StorageManager.exists(i)) {
        delete globalInfo[i];
      }
    }
    globalInfo = globalInfo.filter(i => i)
    return globalInfo;
  } else {
    return [];
  }
};

/**
 * ID大于100时视为周目存档
 */
DataManager.saveGameWithoutRescue = function (savefileId) {
  const saveContents = this.makeSaveContents()
  var json = JsonEx.stringify(saveContents);
  if (json.length >= 200000) {
    console.warn('Save data too big!');
  }
  StorageManager.save(savefileId, json);
  var globalInfo = this.loadGlobalInfo() || [];
  if (savefileId < 100) {
    this._lastAccessedId = savefileId;
    globalInfo[savefileId] = this.makeSavefileInfo();
  } else {
    const loop = savefileId - 100
    globalInfo[0] = { ...globalInfo[0] }
    if (!globalInfo[0].loop || globalInfo[0].loop < loop) {
      globalInfo[0].loop = loop
    }
  }
  this.saveGlobalInfo(globalInfo);
  return true;
};

DataManager.loadGameWithoutRescue = function (savefileId) {
  if (this.isThisGameFile(savefileId) || savefileId > 100) {
    var json = StorageManager.load(savefileId);
    this.createGameObjects();
    this.extractSaveContents(JsonEx.parse(json));
    if (savefileId < 100) {
      this._lastAccessedId = savefileId;
    }
    return true;
  } else {
    return false;
  }
};

StorageManager.isLocalMode = function () {
  return true
};

StorageManager.localFileDirectoryPath = function () {
  var path = require('path');

  const base = __dirname.replace(path.sep + 'app.asar', '')
  return path.join(base, 'save/');
};

StorageManager.localFilePath = function (savefileId) {
  var name;
  if (savefileId < 0) {
    name = 'config.rpgsave';
  } else if (savefileId === 0) {
    name = 'global.rpgsave';
  } else if (savefileId > 0 && savefileId < 100) {
    name = 'file%1.rpgsave'.format(savefileId);
  } else {
    name = 'loop%1.rpgsave'.format(savefileId);
  }
  return this.localFileDirectoryPath() + name;
};

StorageManager.webStorageKey = function (savefileId) {
  if (savefileId < 0) {
    return 'RPG Config';
  } else if (savefileId === 0) {
    return 'RPG Global';
  } else if (savefileId > 0 && savefileId < 100) {
    return 'RPG File%1'.format(savefileId);
  } else {
    return 'RPG LOOP%1'.format(savefileId);
  }
};

DataManager.makeSavefileInfo = function() {
  var info = {};
  info.globalId   = this._globalId;
  info.title      = $dataSystem.gameTitle;
  info.characters = $gameParty.charactersForSavefile();
  info.faces      = $gameParty.facesForSavefile();
  info.playtime   = $gameSystem.playtimeText();
  info.timestamp  = Date.now();
  // 周目信息
  info.loop       = $gameSystem.loop
  console.log(info)
  return info;
};

SceneManager.onKeyDown = function (event) {
  if (!event.ctrlKey && !event.altKey) {
    switch (event.keyCode) {
      case 116:   // F5
        if (electron) {
          electron.ipcRenderer.send('app:reload')
        }
        break;
      case 123:   // F12
        if (electron) {
          electron.ipcRenderer.send('app:dev')
        }
        break;
    }
  }
};