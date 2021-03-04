// pages/mistakes/mistakes.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    currentTab: 0,
    count: '',
    itemList: '',
    infoList: '',
    title: '',
    number: '',
    ca_id: '',
    remove: '否',
    pages: 0
  },
  //点击切换
  clickTab: function (event) {
    var that = this
    if (this.data.currentTab == event.currentTarget.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: event.currentTarget.dataset.current
      })
    }
  },
  //获取列表信息
  getOverTheYears: function (page){
    var that = this
    common.ajax({
      url: 'Home/Question/getErrorBookQuestionCate',
      loading: '加载中......',
      userinfo: true,
      data: {
        type: '错题',
        page: page,
        limit: 10
      },
      success:res=>{
        that.setData({
          count: res.result.count,
          itemList: res.result.list
        })
      }
    })
  },
  getonline:function(){
    var that = this
    common.ajax({
      url: 'Home/Question/getMoldTestCate',
      loading: '加载中......',
      userinfo: true,
      data: {
        type: '错题'
      },
      success:res=>{
        that.setData({
          infoList: res.result.list
        })
      }
    })
  },
  write:function(e){
    var that = this
    that.setData({
      flag: true,
      title: e.currentTarget.dataset.title,
      number: e.currentTarget.dataset.count,
      ca_id: e.currentTarget.dataset.ca_id
    })
  },
  start:function(e){
    wx.navigateTo({
      url: '../jotter/write/write?ca_id='+e.currentTarget.dataset.ca_id + "&remove=" + this.data.remove,
    })
  },
  checkboxChange:function(e){
    var that = this
    if(e.detail.value[0] == '否'){
      that.setData({
        remove: '是'
      })
    }else{
      that.setData({
        remove: '否'
      })
    }
  },
  close:function(){
    this.setData({
      flag: false
    })
  },
  answer:function(e){
    var that = this
    if(!e.currentTarget.dataset.third){
      that.setData({
        flag: true,
        title: e.currentTarget.dataset.title,
        number: e.currentTarget.dataset.count,
        ca_id: e.currentTarget.dataset.ca_id
      })
    }else{
      wx.navigateTo({
        url: '../jotter/classify/classify?ca_id=' + e.currentTarget.dataset.ca_id,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getOverTheYears(0)
    that.getonline()
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
    that.getOverTheYears(++that.data.pages)
  },
})