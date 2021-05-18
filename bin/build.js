const fs = require('fs-extra')
const path = require('path')

const s = Date.now()
const from_src = path.resolve(__dirname, '../src')
const from_build = path.resolve(__dirname, '../build')
const to = path.resolve(__dirname, '../dist')

fs.ensureDirSync(to)
fs.copySync(from_src, to)
const e_src = Date.now()
console.log(`[${(e_src - s) / 1000}s] RM done`)

fs.copySync(from_build, to)
const e_build = Date.now()
console.log(`[${(e_build - e_src) / 1000}s] Electron done`)
