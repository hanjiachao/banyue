// pages/integral/integral.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    list: [],
	showPage: false
  },
  getList:function(){
    common.ajax({
      url: 'Home/User/getShareUser',
      userinfo: true,
      loading: '加载中......',
      data: {
        limit: 10000,
        page: this.data.page++
      },
      success: res => {
        let list = res.result.list
        this.setData({
          list: list,
		  showPage: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.getList()
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
    
  }
})