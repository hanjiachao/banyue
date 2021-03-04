// pages/commission/settlement/settlement.js
var common = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    list: []
  },
  getinfo:function(list){
    var that = this
    common.ajax({
      url: 'Home/User/getBillRecord',
      userinfo: true,
      loading: '加载中......',
      data: {
        type: '结算',
        linit: 12,
        page: that.data.page++
      },
      success:function(res){
        for(var i = 0;i < res.result.list.length;i++){
          list.push({
            money: res.result.list[i].price,
            timer: res.result.list[i].bi_add_time
          })
        }
        that.setData({
          list: list
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var list = []
    that.getinfo(list)
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
  onReachBottom: function (list) {
    var that = this
    var list = that.data.list
    that.getinfo()
  },
})