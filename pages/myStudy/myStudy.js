// pages/myStudy/myStudy.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    infoList: []
  },
  //获取学习列表
  getStudyList:function(list){
    var that = this
    common.ajax({
      url: 'Home/Video/getStudyRecord',
      userinfo: true,
      loading: '加载中......',
      data: {
        page: that.data.page++,
        limit: 12
      },
      success:res=>{
        if(res.result.list.length == '0'){
          wx.showToast({
            title: '已加载全部学习课程',
            icon: 'none',
            duration: 3000
          })
        }
        for(var i = 0;i < res.result.list.length;i++){
          list.push({
            v_id: res.result.list[i].v_id,
            v_cover: res.result.list[i].v_cover,
            v_name: res.result.list[i].v_name,
            progress: res.result.list[i].progress,
            study_duration: res.result.list[i].study_duration
          })
        }
        that.setData({
          infoList: list
        })
      }
    })
  },
  //继续观看
  clickTo:function(e){
    var v_id = e.currentTarget.dataset.v_id
    wx.navigateTo({
      url: '../live/live'
    })
    getApp().globalData.v_id = v_id
  },
  //刷新页面
  changeData: function () {
    wx.navigateTo({
      url: '../live/live'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var list = []
    that.getStudyList(list)
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
    var list = that.data.infoList
    that.getStudyList(list)
  },
})