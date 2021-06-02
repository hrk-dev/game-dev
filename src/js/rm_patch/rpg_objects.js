Game_Interpreter.prototype.isRunning = function () {
  return this._wait || !!this._list;
};

Game_Interpreter.prototype.update = function () {
  while (this.isRunning()) {
    if (this._wait) {
      break;
    }
    if (this.updateChild() || this.updateWait()) {
      break;
    }
    if (SceneManager.isSceneChanging()) {
      break;
    }
    if (!this.executeCommand()) {
      break;
    }
    if (this.checkFreeze()) {
      break;
    }
  }
};