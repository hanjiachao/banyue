// pages/myCourses/myCourses.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    page: 1,
    status: '',
    allList: [],
    iphoneFlag: false,
    qrcode: '',
    isIos: ''
  },
  //点击切换
  clickTab: function (event) {
    var arr = []
    if (this.data.currentTab == event.currentTarget.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: event.currentTarget.dataset.current,
        page: 0
      })
    }
    if(event.currentTarget.dataset.current == 0){
      this.getcourses('',0,arr)
    }
    if (event.currentTarget.dataset.current == 1) {
      this.getcourses('待支付',0, arr)
    }
    if (event.currentTarget.dataset.current == 2) {
      this.getcourses('已支付',0, arr)
    }
    if (event.currentTarget.dataset.current == 3) {
      this.getcourses('已取消',0, arr)
    }
  },
  //获取信息
  getcourses: function (status,page,list){
    var that = this
    common.ajax({
      url: 'Home/User/getMyClass',
      userinfo: true,
      loading: "加载中.....",
      data: {
        status: status,
        page: page,
        limit: 12
      },
      success:function (res) {
        if (res.result.list.length == 0) {
          wx.showToast({
            title: '已全部加载',
            icon: 'none',
            duration: 3000
          })
        }
        for(var i = 0;i < res.result.list.length;i++){
          list.push({
            or_id: res.result.list[i].or_id,
            or_order_no: res.result.list[i].or_order_no,
            v_price: res.result.list[i].v_price,
            v_cover: res.result.list[i].v_cover,
            v_id: res.result.list[i].v_id,
            v_type: res.result.list[i].v_type,
            v_name: res.result.list[i].v_name,
            v_see_num: res.result.list[i].v_see_num,
            or_add_time: res.result.list[i].or_add_time,
			or_end_time: res.result.list[i].or_end_time,
            v_validity: res.result.list[i].v_validity,
            or_status: res.result.list[i].or_status
          })
        }
        that.setData({
          allList: list
        })
      }
    })
  },
  //取消订单
  abolish:function(e){
    var list = []
    var that = this
    common.ajax({
      url: 'Home/User/cancelOrder',
      userinfo: true,
      data: {
        order_no: e.currentTarget.dataset.order_no
      },
      success:function(res){
        if(res.errorCode == '0'){
          wx.showToast({
            title: '您成功取消该订单',
            icon: 'none',
            duration: 3000
          })
          if (that.data.currentTab == 0) {
            that.getcourses('', 0, list)
          }
          if (that.data.currentTab == 1) {
            that.getcourses('待支付', 0, list)
          }
          if (that.data.currentTab == 2) {
            that.getcourses('已支付', 0, list)
          }
          if (that.data.currentTab == 3) {
            that.getcourses('已取消', 0, list)
          }
        }else{
          wx.showToast({
            title: '取消订单失败',
            icon: 'none',
            duration: 3000
          })
        }
      }
    })
  },
  //重新付款
  // again:function(e){
  //   var that = this
  //   var list = []
  //   common.ajax({
  //     url: 'Home/User/repaymentOrder',
  //     userinfo: true,
  //     data: {
  //       order_no: e.currentTarget.dataset.order_no
  //     },
  //     success:res =>{
  //       if (res.errorCode == '0') {
  //         wx.showToast({
  //           title: '订单状态更新成功',
  //           icon: 'none',
  //           duration: 3000
  //         })
  //         if (that.data.currentTab == 0) {
  //           that.getcourses('', 0, list)
  //         }
  //         if (that.data.currentTab == 1) {
  //           that.getcourses('待支付', 0, list)
  //         }
  //         if (that.data.currentTab == 2) {
  //           that.getcourses('已支付', 0, list)
  //         }
  //         if (that.data.currentTab == 3) {
  //           that.getcourses('已取消', 0, list)
  //         }
  //       } else {
  //         wx.showToast({
  //           title: '更新失败',
  //           icon: 'none',
  //           duration: 3000
  //         })
  //       }
  //     }
  //   })
  // },
  //二维码长按识别
  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.qrcode.split(','),
    })
  },
  //素材下载
  download:function(e){
    var v_id = e.currentTarget.dataset.v_id
    wx.navigateTo({
      url: '../downloadList/downloadList?v_id=' + v_id
    })
  },
  //观看课程
  watch:function(e){
    var v_id = e.currentTarget.dataset.v_id
    wx.navigateTo({
      url: '../live/live'
    })
    getApp().globalData.v_id = v_id
  },
  //苹果机型
  iphone: function () {
    this.setData({
      iphoneFlag: false
    })
  },
  iphoneSon: function () {
    this.setData({
      iphoneFlag: true
    })
  },


  //付款
  payment:function(e){
    var that = this
    var appInfo = wx.getStorageSync("appModel");
    if (appInfo.indexOf("Android") != -1) {
      that.setData({
        iphoneFlag: true
      })
      // wx.navigateTo({
      //   url: '../indent/indent?orderNo=' + e.currentTarget.dataset.order_no
      // })
    }else{
      that.setData({
        iphoneFlag: true
      })
    }
  },
  //查看课程详情
  liveDetails:function(e){
    var that = this
    var text = e.currentTarget.dataset.type
    var v_id = e.currentTarget.dataset.v_id
    wx.setStorageSync('v_id', v_id)
    wx.setStorageSync('text', text)
    wx.navigateTo({
      url: '../courseDetails/courseDetails',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var list = []
    var isIos = wx.getStorageSync('appModel').indexOf("Android") != -1
    that.getcourses('',0,list)
    common.ajax({
      url: "Home/Index/getServiceData",
      success: function (res) {
        that.setData({
          qrcode: res.result.qrcode
        })
      }
    })
    that.setData({
      isIos: isIos
    })
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

  onReachBottom: function () {
    var that = this
    var list = that.data.allList
    if (that.data.currentTab == 0) {
      that.getcourses('',that.data.page++, list)
    }
    if (that.data.currentTab == 1) {
      that.getcourses('待支付',that.data.page++, list)
    }
    if (that.data.currentTab == 2) {
      that.getcourses('已支付',that.data.page++, list)
    }
    if (that.data.currentTab == 3) {
      that.getcourses('已取消', that.data.page++, list)
    }
  },
})