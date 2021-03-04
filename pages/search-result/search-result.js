// pages/search-result/search-result.js
var common = require("../../utils/util.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideFlag1: true,
    showFlag1: false,
    hideFlag2: true,
    showFlag2: false,
    hideFlag3: true,
    showFlag3: false,
    currentTab: 2,
    height: "",
    page: 0,
    isIos: '',
    list1:[{
      v_id: '',
      v_cover: '',
      flag: '',
      v_name: '',
      v_group_price: '',
      v_price: '',
      v_see_num: ''
    }],
    list2:[{
      v_id: '',
      v_cover: '',
      flag: '',
      v_name: '',
      v_see_num: ''
    }],
    list3:[{
      v_id: '',
      v_cover: '',
      flag: '',
      v_name: '',
      v_price: '',
      v_see_num: ''
    }]
  },
  //火热拼团
  team : function (val) {
    var that = this;
    var list1 = [];
    common.ajax({
      url: 'Home/Video/getVideoList',
      userinfo: true,
      loading: '加载中......',
      data: {
        type: '拼团',
        cate_id: '',
        skey: val,
        page: that.data.page,
        limit: 6
      },
      success: function (res) {
        if(res.result.list.length == 0){
          console.log("ablesons")
          that.setData({
            hideFlag1: false,
            showFlag1: true
          })
        }
        for (var i = 0; i < res.result.list.length; i++) {
          list1.push({
            v_id: res.result.list[i].v_id,
            v_name: res.result.list[i].v_name,
            v_cover: res.result.list[i].v_cover,
            v_group_price: res.result.list[i].v_group_price,
            v_price: res.result.list[i].v_price,
            v_see_num: res.result.list[i].v_see_num
          })
        }
        that.setData({
          list1: list1
        })
      }
    })
  },
  //免费课程
  free: function (val) {
    var that = this;
    var list2 = [];
    common.ajax({
      url: 'Home/Video/getVideoList',
      userinfo: true,
      loading: '加载中......',
      data: {
        type: '免费',
        cate_id: '',
        skey: val,
        page: that.data.page,
        limit: 6
      },
      success: function (res) {
        if (res.result.list.length == 0) {
          that.setData({
            hideFlag2: false,
            showFlag2: true
          })
        }
        for (var i = 0; i < res.result.list.length; i++) {
          list2.push({
            v_id: res.result.list[i].v_id,
            v_name: res.result.list[i].v_name,
            v_cover: res.result.list[i].v_cover,
            v_see_num: res.result.list[i].v_see_num
          })
        }
        that.setData({
          list2: list2
        })
      }
    })
  },
  //精品课程
  boutique: function (val) {
    var that = this;
    var list3 = [];
    common.ajax({
      url: 'Home/Video/getVideoList',
      userinfo: true,
      loading: '加载中......',
      data: {
        type: '精品',
        cate_id: '',
        skey: val,
        page: that.data.page,
        limit: 6
      },
      success: function (res) {
        if (res.result.list.length == 0) {
          that.setData({
            hideFlag3: false,
            showFlag3: true
          })
        }
        for (var i = 0; i < res.result.list.length; i++) {
          list3.push({
            v_id: res.result.list[i].v_id,
            v_name: res.result.list[i].v_name,
            v_cover: res.result.list[i].v_cover,
            v_price: res.result.list[i].v_price,
            v_see_num: res.result.list[i].v_see_num
          })
        }
        that.setData({
          list3: list3
        })
      }
    })
  },
  goCourse1: function (e) {
    var text = e.currentTarget.dataset.type
    var v_id = e.currentTarget.dataset.v_id
    wx.setStorageSync('v_id', v_id)
    wx.setStorageSync('text', text)
    wx.navigateTo({
      url: '../courseDetails/courseDetails',
    })
  },
  goCourse2: function (e) {
    var text = e.currentTarget.dataset.type
    var v_id = e.currentTarget.dataset.v_id
    wx.setStorageSync('v_id', v_id)
    wx.setStorageSync('text', text)
    wx.navigateTo({
      url: '../courseDetails/courseDetails',
    })
  },
  goCourse3: function (e) {
    var text = e.currentTarget.dataset.type
    var v_id = e.currentTarget.dataset.v_id
    wx.setStorageSync('v_id', v_id)
    wx.setStorageSync('text', text)
    wx.navigateTo({
      url: '../courseDetails/courseDetails',
    })
  },
  //搜索
  onShowtap: function (e) {
    var val = e.detail.value
    var that = this;
    that.team(val)
    that.free(val)
    that.boutique(val)
  },
  //客服跳转
  service:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  //滑动切换
  swiperTab:function(event){
    this.setData({
       currentTab: event.detail.current
    })
  },
  //点击切换
  clickTab:function(event){
    if (this.data.currentTab == event.currentTarget.dataset.current){
      return false;
    }else{
      this.setData({
        currentTab: event.currentTarget.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var isIos = wx.getStorageSync('appModel').indexOf("Android") != -1
    that.setData({
      isIos: isIos
    })
    that.team(options.val)
    that.free(options.val)
    that.boutique(options.val)
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