// pages/login/login.js
var common = require("../../utils/util.js");
var interValObj;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    code: '',
    text: '点击获取',
    captchaDisabled: false
  },
  //清空
  empty:function () {
    this.setData({
      value: '',
    })
  },
  getPhone:function (e) {
    var that = this,val;
    val = e.detail.value
    that.setData({
      value: val
    })
  },
  getcode:function (e) {
    var that = this,val;
    val = e.detail.value
    that.setData({
      code: val
    })
  },
  getCode:function (e) {
    var that = this, timer = 60;
    if (common.is_mobile(that.data.value)){
      common.ajax({
        url: 'Home/Login/sendRegisterCode',
        data: {
          mobile: that.data.value
        },
        success: function (res) {
          if (res.status == 'ERROR'){
            wx.showToast({
              title: '该手机号已经绑定',
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
      that.setData({
        captchaDisabled: true
      });
      that.setData({
        text: timer + '秒后重新发送'
      });
      wx.showToast({
        title: '发送成功'
      });
      var interval = setInterval(function () {
        if (timer == 0) {
          clearInterval(interval);
          that.setData({
            text: '点击获取',
            captchaDisabled: false
          })
        } else {
          timer--;
          that.setData({
            text: timer + '秒后重新发送'
          })
        }
      }, 1000);
    }else{
      wx.showToast({
        title: '请输入电话号码',
        icon: 'none',
        duration: 2000
      })
    }
  },
  submint:function(){
    var that = this;
    var mobile = that.data.value,
        code = that.data.code;
    common.ajax({
      url: 'Home/Login/changeMobile',
      userinfo: true,
      data: {
        mobile: mobile,
        code: code
      },
      success:function(res){
        if(res.errorCode == '100011'){
          wx.showToast({
            title: '手机号或验证码错误',
            icon: 'none',
            duration: 2000
          })
        } else if (res.errorCode == '100012'){
          wx.showToast({
            title: '验证码失效',
            icon: 'none',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '绑定手机号成功',
            icon: 'none',
            duration: 2000
          })
          that.changeParentData()
        }
      }
    })
  },
  changeParentData: function () {
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.changeData();//触发父页面中的方法
    }
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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