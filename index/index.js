const app = getApp()

Page({
  data: {
    name: '张三',
    gender:[
      {
        name: '男',
        value: '0',
        checked: true
      },
      {
        name: '女',
        value: '1',
        checked: false
      }
    ],
    skills: [{
        name: 'HTML',
        value: 'html',
        checked: true
      }, {
        name: 'CSS',
        value: 'css',
        checked: true
      }, {
        name: 'JavaScript',
        value: 'js',
        checked: false
      },
      {
        name: 'Photoshop',
        value: 'ps',
        checked: false
      },
    ],
    opinion: '测试'
  },

  onLoad: function(){
    wx.request({
      method: 'get',
      url: 'http://127.0.0.1:3000/',
      success: function (res) {
        console.log(res)
      }
    })
  },

  submit: function (e) {
    wx.request({
      method: 'post',
      url: 'http://127.0.0.1:3000/',
      data: e.detail.value,
      success: function (res) {
        console.log(res)
      }
    })
  },
})