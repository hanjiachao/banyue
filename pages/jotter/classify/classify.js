// pages/jotter/classify/classify.js
var common = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    ca_ids: '',
    infoList: '',
    title: '',
    number: '',
    ca_id: '',
    remove: '否'
  },
  //获取信息列表
  getThirdCate: function () {
    var that = this
    common.ajax({
      url: 'Home/Question/getThirdCate',
      loading: '加载中......',
      userinfo: true,
      data: {
        ca_id: that.data.ca_ids,
        type: '错题'
      },
      success: res => {
        that.setData({
          infoList: res.result.list
        })
      }
    })
  },
  answer: function (e) {
    var that = this
    that.setData({
      flag: true,
      title: e.currentTarget.dataset.title,
      number: e.currentTarget.dataset.count,
      ca_id: e.currentTarget.dataset.ca_id
    })
  },
  start: function (e) {
    wx.navigateTo({
      url: '../write/write?ca_id=' + e.currentTarget.dataset.ca_id + "&remove=" + this.data.remove,
    })
  },
  checkboxChange: function (e) {
    var that = this
    if (e.detail.value[0] == '否') {
      that.setData({
        remove: '是'
      })
    } else {
      that.setData({
        remove: '否'
      })
    }
  },
  close: function () {
    this.setData({
      flag: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      ca_id: options.ca_ids
    })
    that.getThirdCate()
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