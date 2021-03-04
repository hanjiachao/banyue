// pages/downloadList/downloadList.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    v_id: '',
    page: 0,
    infoList: []
  },
  //获取下载列表
  getdownloadList:function(list){
    var that = this
    common.ajax({
      url: 'Home/User/getMaterialList',
      userinfo: true,
      loading: '加载中......',
      data: {
        v_id: that.data.v_id,
        page: that.data.page++,
        limit: 12
      },
      success:res=>{
        if(res.result.list.length == '0'){
          wx.showToast({
            title: '已经加载全部列表',
            icon: 'none',
            duration: 3000
          })
        }
        for(var i = 0;i < res.result.list.length;i++){
          list.push({
            ma_id: res.result.list[i].ma_id,
            ma_path: res.result.list[i].ma_path,
            ma_title: res.result.list[i].ma_title
          })
        }
        that.setData({
          infoList: list
        })
      }
    })
  },
  //下载文件
  download:function(e){
    wx.downloadFile({
      url: e.currentTarget.dataset.path,
      success: function (res) {
        wx.showToast({
          title: '下载成功',
          icon: 'success',
          duration: 3000
        })
        var filePath = res.tempFilePath
        wx.saveFile({
          tempFilePath: filePath,
          success(res) {
            const savedFilePath = res.savedFilePath
            common.ajax({
              url: 'Home/User/addDownloadRecord',
              userinfo: true,
              data: {
                ma_id: e.currentTarget.dataset.ma_id,
                path: savedFilePath
              },
              success: res => {
                console.log("Ablesons")
              }
            })
            wx.getSavedFileList({
              success: function (res) {
                
              }
            })
            // 打开文档
            wx.openDocument({
              filePath: savedFilePath,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          },
          fail:function(res){
            
          }
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
    that.setData({
      v_id: options.v_id
    })
    that.getdownloadList(list)
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
    that.getdownloadList(list)
  },
})