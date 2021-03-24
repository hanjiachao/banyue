var common = require("../../utils/util.js");
const app = getApp()
Page({
  data: {
    userInfo: {},
    share_code:"",
    logo:"",
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
	path: '',
	params: ''
  },
  onLoad: function (options) {
    var that = this;
    var scenario = wx.getStorageSync("scenario")
    // 查看是否授权
    var url = ''
	// if(options.path && options.params){
	// 	let params = JSON.parse(options.params)
	// 	let paramsStr = '?'
	// 	for(let key in params){
	// 		paramsStr += `${key}=${params[key]}&`
	// 	}
	// 	paramsStr = paramsStr.slice(0,paramsStr.length - 1)
	// 	this.setData({
	// 		path: options.path,
	// 		params: options.params,
	// 		paramsStr: paramsStr
	// 	})
	// 	return false
	// }
    if (options.share_code == '' || options.share_code == undefined) {
      that.setData({
        share_code: ''
      })
    } else {
      wx.setStorageSync('shareCode', options.share_code)
      that.setData({
        share_code: options.share_code
      })
    }
    if (scenario.scene == 1007 || scenario.scene == 1008) {
      that.setData({
        share_code: scenario.query.share_code
      })
    }
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       common.ajax({
    //         url: 'Home/Login/getOpenid',
    //         data: { code: res.code },
    //         userinfo: false,
    //         success: function (res) {
    //           if (res.status == 'SUCCESS') {
    //             getApp().globalData.openid = res.result.openid;
    //             if (res.result.register_status) {
    //               common.set_userinfo(res.result)
    //               wx.switchTab({
    //                 url: '/pages/index/index'
    //               })
    //             }
    //           }
    //         }
    //       })
    //     } else {
    //       console.log('登录失败')
    //     }
    //   }
    // });
    if (common.get_userinfo()) {
      // setTimeout(function () {
		  that.goNext()
      // }, 400)
    }
  },
  goNext: function(){
	  // if(this.data.path && this.data.params){
	  // 	wx.redirectTo({
	  // 		url: `/${this.data.path}${this.data.paramsStr}`
	  // 	})
	  // }else{
	  	// wx.switchTab({
	  	  // url: '/pages/index/index'
	  	// })
	  // }
	  let scenario = wx.getStorageSync("scenario")
	  console.log(scenario)
	  if (scenario && scenario.scene == 1011) {
	    var msg = '',router = scenario.path
		if(router == 'pages/authorize/authorize'){
			wx.switchTab({
			  url: '/pages/index/index'
			})
			return false
		}
	    for(var i in scenario.query){
	      msg += i + '=' + scenario.query[i] + '&'
	    }
	    msg = msg.substr(0, msg.length - 1);
	    wx.redirectTo({
	      url: '/' + router + "?" + msg,
	    })
	  }else{
	    wx.switchTab({
	      url: '/pages/index/index'
	    })
	  }
  },
  bindGetUserInfo: function (e) {
    var wxUserinfo = e.detail.userInfo
    wx.setStorageSync('userObj', wxUserinfo);
    var share_code = wx.getStorageSync("shareCode")
    if (wxUserinfo) {
      var that = this;
      getApp().getOpenid(share_code, wxUserinfo);
      wx.setStorageSync('flag', true)
	  console.log('if')
    } else {
		console.log('else')
		this.goNext()
      // wx.showModal({
      //   title: '警告',
      //   content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      //   showCancel: false,
      //   confirmText: '返回授权',
      //   success: function (res) {
      //     if (res.confirm) {
      //       console.log('用户点击了“返回授权”')
      //     }
      //   }
      // })
    }
  }
})