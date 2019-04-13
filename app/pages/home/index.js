import { $, Units, STATIC, template } from '../../base/api/api.js'
import { Popup } from '../../components'
import './style.scss'

console.log('Units:', Units)
console.log('STATIC:', STATIC)

const popup = Popup.render({ // 弹框
  equipment: 'MOBILE', // 移动端框
  isShowCloseBtn: false,
  animateIn: 'fadeIn',
  animateOut: 'fadeOut',
  animateTime: 200,
})

class Home {
  constructor() {
    this.data = {
      webpackVersion: STATIC.webpackVersion,
      list: [{
        name: 'Newton',
        age: 29
      }, {
        name: 'Ailsa',
        age: 26
      }]
    }

    this._fn()
    this.render()
    this.addEvent()
  }

  render() {
    // text前加#号可以渲染html
    $('.jq').html(template.compile('<span>template:</span>{{text}}')({
      text: `<p class="ellipsis">我是通过jq注入进来的 by webpackVersion : ${this.data.webpackVersion}</p>`
    }))

  }

  addEvent() {
    $('button').click(() => {
      popup.confirm({
        body: `{{each data item}}<p>name: {{item.name}}, age: {{item.age}}</p>{{/each}}`,
        tplData: this.data.list
      })
    })

    $('.js-setcookie').click(() => {
      this.fn.setCookie({
        key: 'the_cookie',
        value: 'the_value'
      })
    })
  }

  _fn() {
    this.fn = {
      setCookie(para) {
        if (para.key && para.value) {
          document.cookie = `${para.key}=${para.value}`
        }
      }
    }
  }

  static Init() {
    return new Home()
  }
}

Home.Init()