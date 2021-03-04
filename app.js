//app.js
var common = require("utils/util.js");
App({
  getOpenid: function (share_code, wxUserinfo) {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          common.ajax({
            url: 'Home/Login/getOpenid',
            data: { code: res.code },
            userinfo: false,
            success: function (res) {
              if (res.status == 'SUCCESS') {
                that.globalData.openid = res.result.openid;
                that.getVersion('1.0.0.10')
                // if (!common.get_userinfo()){
                //   wx.redirectTo({
                //     url: '/pages/authorize/authorize',
                //   })
                // }
                if (res.result.register_status) {
                  common.set_userinfo(res.result)
                  var scenario = wx.getStorageSync("scenario")
                  if (scenario.scene == 1007 || scenario.scene == 1008) {
                    var msg = '',router = scenario.path
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
                } else {
                  that.getToken(wxUserinfo,share_code,res.result)
                }
              }
            }
          })
        } else {
          console.log('登录失败')
        }
      }
    });
  },
  getToken: function (userInfo,share_code,info) {
    var that = this
    var info = info
    common.ajax({
      url:'Home/Login/wxRegister',
      loading: '登录中......',
      data:{
        openid: that.globalData.openid,
        nickname: userInfo.nickName,
        headimg: userInfo.avatarUrl,
        share_code: share_code
      },
      success: function (res) {
        info.access_token = res.result.access_token
        common.set_userinfo(info)
        var scenario = wx.getStorageSync("scenario")
        if (scenario.scene == 1007 || scenario.scene == 1008) {
          var msg = '', router = scenario.path
          for (var i in scenario.query) {
            msg += i + '=' + scenario.query[i] + '&'
          }
          msg = msg.substr(0, msg.length - 1);
          wx.redirectTo({
            url: '/' + router + "?" + msg,
          })
        } else {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
  },
  getVersion: function (version) {
    var that = this
    common.ajax({
      url: 'Home/Index/versionContrast',
      data: {
        version:version
      },
      success:res=>{
        var boole = res.result.boole
        wx.setStorageSync('boole', boole)
      }
    })
  },
  onLaunch: function (options) {
    var that = this;
    //购买设置
    that.getVersion('1.0.0.10')
    wx.getSystemInfo({
      success: res => {
        var model = res.system;
        wx.setStorageSync('appModel', model);
      }
    })
  },
  onShow: function (options) {
    var scenario = options
    wx.setStorageSync('scenario', scenario)
    if (scenario.scene == 1007 || scenario.scene == 1008) {
      if (common.get_userinfo()){
        console.log(1111)
      }else{
        wx.showToast({
          title: '您还没有登录',
          icon: 'none',
          duration: 1500
        })
        setTimeout(()=>{
          wx.redirectTo({
            url: '/pages/authorize/authorize',
          })
        },1000)
      }
    }
  },
  onHide: function (options) {
    // console.log(options)
  },
  globalData: {
    timer: 'timer',
    longitude: '',
    latitude: '',
    lng: '',
    lat: '',
    address: '',
    userInfo: null,
    openid: '',
    user_code: '',
    status_wx: '',
    version: '1.0.0',
    token: '',
    v_id: '',
    videoFlag: true,
    show_time: '',
    url: 'http://byxcx.chenchaoweb.cn/index.php/'
  }
})