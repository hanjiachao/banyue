// pages/grade/grade.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sr_id: '',
    time: '',
    title: '',
    count_score: '',
    get_score: '',
    timer: '',
    error_number: '',
    infoList: '',
    cate_id: ''
  },
  getinfo:function(){
    var that = this
    var that = this
    common.ajax({
      url: 'Home/Question/submitAnswersheet',
      userinfo: true,
      loading: '加载中......',
      data: {
        sr_id: that.data.sr_id,
        time: that.data.time
      },
      success: res => {
        that.setData({
          title: res.result.list.cate_name,
          cate_id: res.result.list.cate_id,
          count_score: res.result.list.count_score,
          get_score: res.result.list.get_score,
          timer: res.result.list.time,
          infoList: res.result.list.list,
          error_number: res.result.list.error_number
        })
      }
    })
  },
  //查看错题
  error:function(){
    var obj = {
      title: "查看错题",
      sr_id: this.data.sr_id
    }
    wx.setStorageSync('CheckTheParsing', obj)
    if(this.data.error_number != '0'){
      wx.navigateTo({
        url: '../explain/explain'
      })
    }else{
      wx.showToast({
        title: '您已全部正确！',
        icon: 'success',
        duration: 3000
      })
    }
  },
  //查看解析
  explain: function () {
    var obj = {
      title: "查看解析",
      sr_id: this.data.sr_id
    }
    wx.setStorageSync('CheckTheParsing', obj)
    wx.navigateTo({
      url: '../explain/explain'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      sr_id: options.sr_id,
      time: options.time
    })
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

  },
})