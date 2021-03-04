// pages/comdetails/comdetails.js
var common = require("../../utils/util.js");
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ar_title:"",
    date:"",
    ar_label:''
  },
  info:function(msg){
    var that = this
    common.ajax({
      url:"Home/Index/getArticleDetail",
      data: {
        ar_id:msg.id
      },
      success: function(res){
        console.log(res.result.list.ar_label)
        var article = res.result.list.ar_content;
        WxParse.wxParse('article', 'html', article, that, 0);
        that.setData({
          ar_title: res.result.list.ar_title,
          date: res.result.list.date,
          ar_label: res.result.list.ar_label
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.info(options)
    wx.setNavigationBarTitle({
      title: options.title,
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