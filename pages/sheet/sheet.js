// pages/sheet/sheet.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sr_id: '',
    time: '',
    count: '',
    infoList: ''
  },
  //获取答题卡信息
  getSheetInfo:function(){
    var that = this
    common.ajax({
      url: 'Home/Question/getAnswerRecord',
      userinfo: true,
      loading: '加载中......',
      data: {
        sr_id: that.data.sr_id
      },
      success:res=>{
        that.setData({
          count: res.result.count,
          infoList: res.result.list
        })
      }
    })
  },
  //返回答题页面
  returns:function(){
    wx.navigateBack()
  },
  submit:function(){
    wx.redirectTo({
      url: '../grade/grade?sr_id=' + this.data.sr_id + '&time=' + this.data.time,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      sr_id: options.sr_id,
      time: options.time
    })
    that.getSheetInfo()
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