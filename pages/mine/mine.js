// pages/mine/mine.js
var common = require("../../utils/util.js");
var app = getApp
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexImg: "../../image/sex_1.png",
    nickname: '',
    headimg: '',
    learning_time: '',
    integral: '',
    learning_time: '',
    share_code: '',
    flag: true,
    flag1:false,
    shareImg: '',
    sex: '',
    experience: '',
    iphoneFlag: false
  },
  //打卡
  daka: function () {
    var that = this
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    common.ajax({
      url: 'Home/User/getUserClock',
      userinfo: true,
      success: function(res){
        if (res.status == 'SUCCESS'){
          that.setData({
            flag: false,
            experience: res.result.experience
          })
        }else{
          wx.showToast({
            title: '今日已打卡',
            icon: 'none',
            duration: 3000
          })
        }
      }
    })
  },
  //分享打卡到朋友圈
  shareTo:function(){
    var that = this
    common.ajax({
      url: 'Home/User/getClockFootprint',
      userinfo: true,
      loading: '加载中......',
      success:function(res){
        that.setData({
          shareImg: res.result.image
        })
      }
    })
    wx.downloadFile({
      url: that.data.shareImg,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权")
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          },
          complete(res) {
            console.log(res);
          }
        })
      }
    })
  },
  //关闭打卡
  close: function(){
    this.setData({
      flag: true
    })
  },

  //打卡足迹
  footprint: common.throttle(function (e) {
    var that = this
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    if (that.data.iphoneFlag) {
      wx.navigateTo({
        url: '../footprint/footprint',
      })
    } else {
      wx.showToast({
        title: '系统升级中，敬请期待！',
        icon: 'none',
        duration: 2000
      })
    }
  }, 1000),
  myInvite:function(){
    var that = this
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    if (that.data.iphoneFlag) {
      if (that.data.share_code == '') {
        that.setData({
          flag1: true
        })
      } else {
        wx.navigateTo({
          url: '../inviteList/inviteList',
        })
      }
    } else {
      wx.showToast({
        title: '系统升级中，敬请期待！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //我的积分
  integral:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../integral/integral',
    })
  },
  // 我的收藏
  collectTo: function () {
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  //我的课程
  myCoursesTo: function () {
    var that = this
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    if (that.data.iphoneFlag){
      wx.navigateTo({
        url: '../myCourses/myCourses',
      })
    }else{
      wx.showToast({
        title: '系统升级中，敬请期待！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //我的拼团
  myTeamTo:function(){
    var that = this
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    if (that.data.iphoneFlag) {
      wx.navigateTo({
        url: '../myTeam/myTeam',
      })
    } else {
      wx.showToast({
        title: '系统升级中，敬请期待！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //我的资料
  profile:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../profile/profileInfo/profileInfo',
    })
  },
  //我的推广
  promote:function(){
    var that = this
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    if (that.data.iphoneFlag) {
      if (that.data.share_code == '') {
        that.setData({
          flag1: true
        })
      } else {
        wx.navigateTo({
          url: '../promote/promote',
        })
      }
    } else {
      wx.showToast({
        title: '系统升级中，敬请期待！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  tuitionApply:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../tuition/money/money',
    })
  },
  tuitionClose:function(){
    var that = this
    that.setData({
      flag1: false
    })
  },
  //我的佣金
  commission:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../commission/mycommission/mycommission',
    })
  },
  //我的错题本
  mistakes:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../mistakes/mistakes',
    })
  },
  //我的下载
  download:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../download/download',
    })
  },
  //我的学习
  myStudy: function () {
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    if (this.data.iphoneFlag) {
      wx.navigateTo({
        url: '../myStudy/myStudy',
      })
    } else {
      wx.showToast({
        title: '系统升级中，敬请期待！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //获取我的信息
  getuserinfo:function () {
    var that = this;
    common.ajax({
      url: 'Home/User/getUserData',
      loading: '加载中......',
      userinfo: true,
      success:function (res) {
        that.setData({
          nickname: res.result.list.nickname,
          headimg: res.result.list.headimg,
          learning_time: res.result.list.learning_time,
          integral: res.result.list.integral,
          share_code: res.result.list.share_code,
          learning_time: res.result.list.learning_time,
          sex: res.result.list.sex
        })
        if (that.data.sex == '女') {
          that.setData({
            sexImg: '../../image/sex_2.png'
          })
        } else {
          that.setData({
            sexImg: "../../image/sex_1.png"
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var boole = wx.getStorageSync('boole')
    that.setData({
      iphoneFlag: boole
    })
    that.getuserinfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})