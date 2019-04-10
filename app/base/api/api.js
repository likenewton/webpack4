// 每个页面都会执行的函数
// rem 布局
let REM = function(win) {
  let winDoc = win.document
  let winDocDoc = winDoc.documentElement
  let psdW = 750 / 100
  let evtFn = 'orientationchange' in win ? 'orientationchange' : 'resize'
  let setSize = function() {
    let pageW = winDocDoc.clientWidth || 320
    pageW > 750 && (pageW = 750)
    winDocDoc.style.fontSize = pageW / psdW + 'px'
  }
  setSize()
  win.addEventListener(evtFn, setSize)
  winDoc.addEventListener('DOMContentLoaded', setSize)
}
REM(window)

// 以下注入页面通用依赖
import '../style/base.scss' // 基础样式表
import Units from './units.js' // 工具类函数
import STATIC from './static.js' // 静态数据
import $ from 'jquery/dist/jquery.min' // 工具
import template from 'art-template/lib/template-web.js' // 模板引擎

module.exports = {
  $,
  Units,
  STATIC,
  template
}
