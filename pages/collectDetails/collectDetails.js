// pages/collectDetails/collectDetails.js
var common = require("../../utils/util.js");
var time = 0;
var touchDot = 0;
var interval = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    cate_id: '',
    type: '',
    title: '',
    sr_id: '',
    su_id: '',
    eb_id: '',
    count: '',
    su_question: '',
    su_A: '',
    su_B: '',
    su_C: '',
    su_D: '',
    su_answer: '',
    su_parsing: '',
    su_role: '',
    options1: '../../image/options_a.png',
    options2: '../../image/options_b.png',
    options3: '../../image/options_c.png',
    options4: '../../image/options_d.png',
    b_type: ''
  },

  //获取题的解析
  getparsing: function (order) {
    var that = this
    common.ajax({
      url: 'Home/User/getCollectionDetail',
      loading: '加载中......',
      userinfo: true,
      data: {
        type: that.data.type,
        cate_id: that.data.cate_id,
        su_id: that.data.su_id,
        order: order
      },
      success: res => {
        that.setData({
          count: res.result.count,
          su_question: res.result.list.su_question,
          su_A: res.result.list.su_A,
          su_B: res.result.list.su_B,
          su_C: res.result.list.su_C,
          su_D: res.result.list.su_D,
          su_id: res.result.list.su_id,
          su_answer: res.result.list.su_answer,//正确答案
          su_parsing: res.result.list.su_parsing,
          su_role: res.result.list.su_role,
          b_type: res.result.list.b_type
        })
        wx.setNavigationBarTitle({
          title: that.data.b_type
        })
        if (res.result.list.su_answer.indexOf("A") != -1) {
          that.setData({
            options1: '../../image/options_a_active.png'
          })
        }
        if (res.result.list.su_answer.indexOf("B") > -1) {
          that.setData({
            options2: '../../image/options_b_active.png'
          })
        }
        if (res.result.list.su_answer.indexOf("C") > -1) {
          that.setData({
            options3: '../../image/options_c_active.png'
          })
        }
        if (res.result.list.su_answer.indexOf("D") > -1) {
          that.setData({
            options4: '../../image/options_d_active.png'
          })
        }
      }
    })
  },
  error:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  explain:function(){
    wx.redirectTo({
      url: '../collect/collect',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      cate_id: options.cate_id,
      type: options.type
    })
    that.getparsing("")
    
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
    clearInterval(interval);
    time = 0;
  },


  // 触摸开始事件
  touchStart: function (e) {
    touchDot = e.touches[0].pageX;
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸结束事件
  touchEnd: function (e) {
    var touchMove = e.changedTouches[0].pageX;
    var that = this
    // 向左滑动   
    if (touchMove - touchDot <= -40 && time < 10) {
      if (that.data.index < that.data.count) {
        that.setData({
          index: ++that.data.index,
          options1: '../../image/options_a.png',
          options2: '../../image/options_b.png',
          options3: '../../image/options_c.png',
          options4: '../../image/options_d.png',
        })
        that.getparsing("下一个")
      } else {
        wx.showToast({
          title: '恭喜您看完这套题了',
          icon: 'none',
          duration: 2000
        })
      }
    }
    // 向右滑动  
    if (touchMove - touchDot >= 40 && time < 10) {
      if (that.data.index != '1') {
        that.setData({
          index: --that.data.index,
          options1: '../../image/options_a.png',
          options2: '../../image/options_b.png',
          options3: '../../image/options_c.png',
          options4: '../../image/options_d.png',
        })
        that.getparsing("上一个")
      } else {
        wx.showToast({
          title: '已经是第一题！',
          icon: 'none',
          duration: 2000
        })
      }
    }
    clearInterval(interval);
    time = 0;
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