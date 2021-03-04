// pages/question/question.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: '',
    flag: false,
    bind_status: ''
  },
  getnumber:function(){
    var that = this
    common.ajax({
      url: 'Home/Question/getQuestionStatistical',
      loading: '加载中',
      success:res=>{
        that.setData({
          count: res.result.subject_count
        })
      }
    })
  },
  exams:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../exams/exams',
    })
  },
  //在线模考
  mockexam:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../mockExam/mockExam',
    })
  },
  mistakes:function(){
    var that = this
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    if (that.data.bind_status == '已绑定') {
      wx.navigateTo({
        url: '../mistakes/mistakes',
      })
    } else {
      that.setData({
        flag: true
      })
    }
  },
  //绑定消息
  register: function () {
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../login/login',
    })
  },
  abolish: function () {
    var that = this;
    that.setData({
      flag: false
    })
  },
  getuserinfo: function () {
    var that = this;
    common.ajax({
      url: 'Home/User/getUserData',
      userinfo: true,
      success: function (res) {
        that.setData({
          bind_status: res.result.list.bind_status
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getnumber()
    this.getuserinfo()
  },
  changeData: function () {
    this.onLoad();
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
    this.setData({
      flag: false
    })
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