var socket = io('http://localhost?k=hrk')

socket.on('connect', () => {
  console.log('已连接至服务器')
})

socket.on('open-door', () => {
  if ($gameSwitches) {
    $gameSwitches.setValue(3, true)
    console.log('收到开门指令')
  }
})
socket.on('close-door', () => {
  if ($gameSwitches) {
    $gameSwitches.setValue(3, false)
    console.log('收到关门指令')
  }
})

socket.on('bg-on', () => {
  if ($gameSwitches) {
    $gameTemp.reserveCommonEvent(6)
    console.log('收到改变背景指令')
  }
})

socket.on('bg-off', () => {
  if ($gameSwitches) {
    $gameTemp.reserveCommonEvent(7)
    console.log('收到恢复背景指令')
  }
})
