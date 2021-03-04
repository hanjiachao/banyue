// pages/community/community.js
var common = require("../../utils/util.js");
var n = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    limit: 9,
    skey: '',
    communityList:[]
  },
  //信息列表
  community: function (page,skey,list){
    var that = this
    common.ajax({
      url:"Home/Index/getArticleList",
      loading: '加载中......',
      data:{
        type:"讲坛社区",
        page:page,
        limit:that.data.limit,
        skey:skey
      },
      success: function (res) {
        if(res.result.count == '0'){
          wx.showToast({
            title: '已加载全部！',
            icon: 'none',
            duration: 3000
          })
        }
        for(var i = 0;i < res.result.list.length;i++){
          list.push({
            ar_image: res.result.list[i].ar_image,
            markFlag: res.result.list[i].ar_stick == "是"?true:false,
            ar_title: res.result.list[i].ar_title,
            ar_id: res.result.list[i].ar_id,
            content: res.result.list[i].content,
            date: res.result.list[i].date
          })
        }
        that.setData({
          communityList: list
        })
      }
    })
  },
  //跳转详情
  comdetails: function (res) {
    wx.navigateTo({
      url: '../comdetails/comdetails?id=' + res.target.dataset.ar_id + '&title=' + '文章详情',
    })
  },
  // 搜索触发
  onShowtap: function (e) {
    var val = e.detail.value
    var that = this
    var list = []
    if (val != "") {
      that.setData({
        skey: val
      })
      that.community(that.data.page,val,list)
    } else {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var list = that.data.communityList
    that.community(that.data.page,'',list);
  },

  onReachBottom: function (res) {
    var that = this;
    var list = that.data.communityList
    ++n
    that.community(n,that.data.skey,list)
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