// pages/download/download.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    infoList: []
  },
  getdownload:function(list){
    var that = this
    common.ajax({
      url: 'Home/User/getMyDownloadList',
      loading: '加载中......',
      userinfo: true,
      data: {
        page: that.data.page++,
        limit: 12
      },
      success:res=>{
        if (res.result.list.length == '0'){
          wx.showToast({
            title: '已加载全部',
            icon: 'none',
            duration: 3000
          })
        }
        for(var i = 0;i < res.result.list.length;i++){
          list.push({
            id: res.result.list[i].mr_id,
            name: res.result.list[i].name,
            timer: res.result.list[i].mr_add_time,
            path: res.result.list[i].mr_path
          })
        }
        that.setData({
          infoList: list
        })
      }
    })
  },
  //打开文件
  click:function(e){
    var path = e.currentTarget.dataset.path
    ///打开文档
    wx.openDocument({
      filePath: path,
      success: function (res) {
        console.log('打开文档成功')
      },
      fail:res=>{
        wx.showToast({
          title: '打开失败，您可能已经删除了！',
          icon: 'none',
          duration: 3000
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
    that.getdownload(list)
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
    that.getdownload(list)
  },
})