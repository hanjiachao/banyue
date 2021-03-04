// pages/search/search.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hot_list: [{
      se_id: '',
      se_content: ''
    }],
    cate: [{
      ca_id: '',
      ca_name: ''
    }],
    history_list: [{
      se_id: '',
      se_content: ''
    }]
  },
  close:function(){
    wx.navigateBack()
  },
  getInfo: function () {
    var that = this
    common.ajax({
      url: 'Home/Index/getSearchData',
      userinfo: true,
      success: function (res) {
        var hotList = [];
        var cate = [];
        var historyList = [];
        for(var i = 0; i < res.result.hot_list.length;i++){
          hotList.push({
            se_id: res.result.hot_list[i].se_id,
            se_content: res.result.hot_list[i].se_content
          })
        }
        for (var i = 0; i < res.result.cate.length; i++) {
          cate.push({
            ca_id: res.result.cate[i].ca_id,
            ca_name: res.result.cate[i].ca_name
          })
        }
        for (var i = 0; i < res.result.history_list.length; i++) {
          historyList.push({
            se_id: res.result.history_list[i].se_id,
            se_content: res.result.history_list[i].se_content
          })
        }
        that.setData({
          hot_list: hotList,
          cate: cate,
          history_list: historyList
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 搜索触发
  onShowtap: function (e) {
    var val = e.detail.value
    if(val != ""){
      wx.navigateTo({
        url: '../search-result/search-result?val=' + val,
      })
    }else{
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 2000
      })
    }
  },
  click: function (e) {
    var name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../search-result/search-result?val=' + name,
    })
  },
  //删除历史
  delete: function () {
    var that = this;
    common.ajax({
      url: 'Home/Index/delSearchRecord',
      userinfo: true,
      success: function (res) {
        console.log(res.result.msg)
        that.setData({
          history_list: ""
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getInfo();
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