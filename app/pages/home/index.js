import { $, Units, STATIC, template } from '../../base/api/api.js'
import './style.scss'

console.log(Units)
console.log(STATIC)
console.log(template)
console.log($)

class Home {
  constructor() {
    this.data = {
      webpackVersion: STATIC.webpackVersion
    }
    this.render()
  }

  render() {
    // text前加@号可以渲染html
    $('.jq').html(template.compile(`{{@text}}`)({
      text: `<p class="ellipsis">我是通过jq注入进来的 by webpackVersion : ${this.data.webpackVersion}</p>`
    }))
  }

  static Init() {
    return new Home()
  }
}

Home.Init()