// 该文件正式版需要修改相应事件和开关ID

var socket = io('http://127.0.0.1?type=game&key=zheshimima')

socket.on('connect', () => {
  console.log('已连接至服务器')
})

socket.on('door', () => {
  if ($gameSwitches) {
    const flag = !!$gameSwitches._data[3]
    $gameSwitches.setValue(3, !flag)
  }
})

socket.on('bg', (flag) => {
  if ($gameSwitches) {
    if (flag) {
      $gameTemp.reserveCommonEvent(7)
    } else {
      $gameTemp.reserveCommonEvent(6)
    }
  }
})

Object.defineProperty(SceneManager, '_scene', {
  set: (scene) => {
    SceneManager.__scene = scene
    socket.emit('set-start', scene.constructor.name === 'Scene_Map')
  },
  get: () => {
    return SceneManager.__scene
  }
})
