// pages/issue/issue.js
var common = require("../../utils/util.js");
var pageNo = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    limit: 0,
    list:[{
      id: '',
      open: false,
      qu_id: "Q1",
      qu_content: "",
      qu_answer: ""
    }]
  },
  unwind:function(e){
    const that = this
    const id = e.currentTarget.dataset.qu_id
    const list = that.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].qu_id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    that.setData({
      list
    })
  },
  getInfo: function (list) {
    var that = this
    console.log(that.data.limit)
    common.ajax({
      url: 'Home/Index/getQuestionList',
      loading: '加载中......',
      data: {
        page: that.data.page++,
        limit: 12
      },
      success: function (res) {
        if(res.result.list.length == 0){
          wx.showToast({
            title: '已加载全部',
            icon: 'none',
            duration: 3000
          })
        }
        for (var i = 0; i < res.result.list.length; i++) {
          list.push({
            open: false,
            id: "Q" + (++that.data.limit),
            qu_id: res.result.list[i].qu_id,
            qu_content: res.result.list[i].qu_content,
            qu_answer: res.result.list[i].qu_answer
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
    that.getInfo(list)
  },
  onReachBottom: function (res) {
    var that = this
    var list = that.data.list
    that.getInfo(list)
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
})