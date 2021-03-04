// pages/integral/integral.js
var common = require("../../utils/util.js");
var WxParse = require('../../wxParse/wxParse.js');
var list = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    page: 0,
    itemList: [],
    integral: '',
  },
  //积分详情
  details:function(){
    this.setData({
      flag:false
    })
  },
  //关闭积分详情
  close:function(){
    this.setData({
      flag:true
    })
  },
  getinfo:function(){
    var that = this
    common.ajax({
      url: 'Home/User/getMyIntegral',
      userinfo: true,
      loading: '加载中......',
      data: {
        limit: 14,
        page: that.data.page++
      },
      success:function(res){
        if(res.result.list.length == '0'){
          wx.showToast({
            title: '已加载全部',
            icon: 'none',
            duration: 3000
          })
        }
        var rule = res.result.content;
        WxParse.wxParse('rule', 'html', rule, that, 0);
        for(var i = 0;i < res.result.list.length;i++){
          list.push({
            bi_add_time: res.result.list[i].bi_add_time,
            bi_price: res.result.list[i].bi_price,
            bi_remark: res.result.list[i].bi_remark
          })
        }
        that.setData({
          itemList: list,
          integral: res.result.integral
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getinfo()
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
    that.getinfo()
  },
})