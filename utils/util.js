//时间
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//时间
function formatDate(now) {
  var now = new Date(now * 1000);
  var year = now.getFullYear(); classlass
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  return year + "-" + zeroize(month) + "-" + zeroize(date) + " " + zeroize(hour) + ":" + zeroize(minute) + ":" + zeroize(second);
}
function zeroize(num) {
  return (String(num).length == 1 ? '0' : '') + num;
}

//电话正则
function is_mobile(mobile) {
  return /^1[3456789]\d{9}$/.test(mobile)
}


//获取本地缓存指定内容
function verify(callback, param) {
  wx.getStorage({
    key: 'userinfo',
    success: function (res) {
      var userinfo = get_userinfo();
      if (!userinfo) {
        login_by_wx(function (ret) {
          callback(ret)
        })
      } else {
        getApp().globalData.openid = JSON.parse(res.data).openid;
        callback(userinfo)
      }
    },
    fail: function (res) {
      login_by_wx(function (ret) {
        callback(ret)
      })
    }
  })
}

//设置用户信息
function set_userinfo(userinfo) {
  try {
    if (userinfo) {
      var expire_time = new Date().getTime() + 86400000 * 7;
      userinfo.expire_time = expire_time;
      //在本地存储信息
      wx.setStorageSync('userinfo', JSON.stringify(userinfo))
    } else {
      //清除本地缓存
      wx.clearStorageSync('userinfo')
    }
    return true
  } catch (e) {
    return false
  }
}
//获取用户信息
function get_userinfo() {
  try {
    var userinfo = wx.getStorageSync('userinfo')
    userinfo = JSON.parse(userinfo)
    var now_time = new Date().getTime();
    if (userinfo.expire_time < now_time) {
      return false
    } else {
      return userinfo
    }
  } catch (e) {
    return false
  }
}

function redirect_login(param) {
  redirect_to('/pages/index/index', param)
}
function redirect_to(router, param) {
  var tbar_list = ['/pages/index/index']
  if (tbar_list.indexOf(router) >= 0) {
    wx.switchTab({
      url: router
    })
  } else {
    var path_param = ''
    if (param) {
      for (var i in param) {
        path_param += i + '=' + param[i] + '&'
      }
      path_param = path_param.substr(0, path_param.length - 1);
    }
    var pages = getCurrentPages(),
      current_page = pages.pop()
    if (!param || !param['old_path']) {
      path_param = 'old_path=/' + current_page.route + '&' + path_param
    }
    wx.redirectTo({
      url: router + '?' + path_param
    })
  }
}
function login_by_wx(callback) {
  var flag = wx.getStorageSync("flag")
  var page = getCurrentPages()
  if(flag){
    getApp().getOpenid()
  }
}

//错误时显示消息提示框
function error(msg, callback) {
  wx.showToast({
    title: msg,
    icon: 'none',
    success: callback,
    duration: 2000
  })
}
//显示信息
function info(msg) {
  wx.hideLoading()
  setTimeout(function () {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 8000
    })
  }, 1)
}

//成功时显示的消息提示框
function success(msg, callback) {
  wx.showToast({
    title: msg,
    success: callback,
    duration: 2000
  })
}


function send_ajax(param) {
  var app_url = "https://byxcx.chenchaoweb.cn/index.php/";
  // var app_url = "http://byxcx.haozhicheng.weyoui.cn/index.php/";
  if (!param.url) {
    info('缺少地址')
  }
  app_url = app_url + param.url
  if (param.loading) {
    wx.showLoading({
      title: param.loading,
    })
  }
  var timer, timeout = 5000;
  if (!param.file) {
    var request = wx.request({
      url: app_url,
      data: param.data ? param.data : {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: param.type ? param.type : 'post',
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.errorCode == '100008') {
            console.log(res)
            info('您的登录信息已失效', function () {
              set_userinfo(null)
              param.userinfo = true
              ajax(param)
            })
            wx.login({
              success: function (res) {
                if (res.code) {
                  ajax({
                    url: 'Home/Login/getOpenid',
                    data: { code: res.code },
                    loading: '登录中...',
                    userinfo: false,
                    success: function (ret) {
                      console.log(ret)
                      if (ret.status == 'SUCCESS'){
                        getApp().globalData.token = ret.result.access_token;
                        console.log(ret)
                        set_userinfo(ret.result)
                        const pages = getCurrentPages()
                        const perpage = pages[pages.length - 1]
                        perpage.onLoad()
                      }
                    }
                  })
                }
              }
            })
          } else {
            if (param.success) {
              param.success(res.data)
            }
          }
        } else {
          if (param.fail) {
            param.fail(res)
          }
        }
      },
      fail: function (res) {
        if (param.fail) {
          param.fail(res)
        }
      },
      complete: function (res) {
        clearTimeout(timer)
        if (param.loading) {
          wx.hideLoading()
        }
      },
    })
  } else {
    timeout = 30000
    var request = wx.uploadFile({
      url: app_url,
      data: param.data ? param.data : {},
      name: param.file.name,
      filePath: param.file.path,
      formData: param.data ? param.data : {},
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.errorCode == '100008') {
            info('您的登录信息已失效', function () {
              set_userinfo(null)
              param.userinfo = true
              ajax(param)
            })
          } else {
            if (param.success) {
              param.success(res.data)
            }
          }
        } else {
          if (param.fail) {
            param.fail(res)
          }
        }
      },
      fail: function (res) {
        if (param.fail) {
          param.fail(res)
        }
      },
      complete: function (res) {
        clearTimeout(timer)
        if (param.loading) {
          wx.hideLoading()
        }
      },
    })
  }

  timer = setTimeout(function () {
    if (param.loading) {
      info('网络通讯故障，请重试')
    }
    request.abort()
  }, timeout)

}

function ajax(param) {
  if (param.userinfo) {
    verify(function (res) {
      if (!param.data) {
        param.data = {}
      }
      param.data.access_token = res.access_token
      send_ajax(param)
    }, param)
  } else {
    send_ajax(param)
  }
}

function toLogin(){
  wx.showModal({
    title: '提示',
    content: '您的授权信息有误。请前去授权！',
    showCancel: true,
    cancelText: '取消',
    confirmText: '授权',
    success: function (res) {
      if (res.confirm) {
        set_userinfo(null)
        wx.navigateTo({
          url: '/pages/authorize/authorize',
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}


var $app = "https://byxcx.chenchaoweb.cn/index.php/";

//获取环信账户
function user_huanxin(data, callback) {
  requestLoading("LoginBak/getHxData", data, '正在加载数据', function (res) {
    callback(res.info)
  }, function () {
    wx.showToast({
      title: '网络较慢，请重试'
    })
  })
}
//获取openid
function user_register(data, callback) {
  requestLoading("HomeCommon/getRegister", data, '正在加载数据', function (res) {
    callback(res)
  }, function () {
    wx.showToast({
      title: '网络较慢，请重试'
    })
  })
}

function location(callback) {
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      callback(res)
    }
  })
}

// 展示进度条的网络请求
// url:网络请求的url
// data:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function request(url, data, success, fail) {
  this.requestLoading(url, data, "", success, fail)
}
function requestLoading(url, data, message, success, fail, method, load) {
  wx.showNavigationBarLoading()
  if (message != "") {
    if (typeof load === 'undefined') {
      wx.showLoading({
        title: message,
      })
    }
  }
  wx.request({
    url: $app + url,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: method,
    success: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }
    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) { },
  })
}
function throttle(fn,gapTime){
  if(gapTime == null || gapTime == undefined){
    gapTime = 1500
  }
  let lastTime = null
  return function () {
    let nowTime = + new Date()
    if(nowTime - lastTime > gapTime || !lastTime){
      fn.apply(this, arguments)
      lastTime = nowTime
    }
  }
}
module.exports = {
  request: request,
  requestLoading: requestLoading,
  formatTime: formatTime,
  formatDate: formatDate,
  zeroize: zeroize,
  $app: $app,
  user_register: user_register,
  location: location,
  verify: verify,
  redirect_to: redirect_to,
  is_mobile: is_mobile,
  ajax: ajax,
  error: error,
  info: info,
  success: success,
  set_userinfo: set_userinfo,
  get_userinfo: get_userinfo,
  throttle: throttle,
  toLogin: toLogin
}