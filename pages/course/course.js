// pages/course/course.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iphoneFlag: ''
  },
  //精品课程
  courseList: common.throttle(function(e){
    var text = e.currentTarget.dataset.text;
    wx.setStorageSync('text', text)
    wx.navigateTo({
      url: '../courseList/courseList'
    })
  },2000),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var boole = wx.getStorageSync('boole')
    this.setData({
      iphoneFlag: boole
    })
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