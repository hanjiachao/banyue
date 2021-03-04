// pages/news/news.js
var common = require("../../utils/util.js");
var list = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    newsList: []
  },
  //获取信息列表
  getNewsList:function(msg) {
    var that = this
    common.ajax({
      url: 'Home/User/getMessageList',
      userinfo: true,
      loading: '加载中.....',
      data: {
        page: that.data.page++,
        limit: 14
      },
      success: function (res) {
        if (res.result.list.length == 0){
          wx.showToast({
            title: '已全部加载',
            icon: 'none',
            duration: 3000
          })
        }
        for (var i = 0; i < res.result.list.length; i++) {
          list = list.concat({
            me_title: res.result.list[i].me_title,
            me_content: res.result.list[i].me_content,
            time: res.result.list[i].time
          })
        }
        that.setData({
          newsList: list
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getNewsList()
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
    var that = this
    that.getNewsList("加载中.....")
  },
})