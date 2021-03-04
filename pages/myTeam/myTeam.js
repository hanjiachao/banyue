// pages/myTeam/myTeam.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    page: 0,
    allList: [],
    iphoneFlag: false,
    qrcode: '',
    homePageFlag: false
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
    if (event.currentTarget.dataset.current == 0) {
      this.getTeamInfo('', arr)
    }
    if (event.currentTarget.dataset.current == 1) {
      this.getTeamInfo('待付款', arr)
    }
    if (event.currentTarget.dataset.current == 2) {
      this.getTeamInfo('待成团', arr)
    }
    if (event.currentTarget.dataset.current == 3) {
      this.getTeamInfo('已成团', arr)
    }
    if (event.currentTarget.dataset.current == 4) {
      this.getTeamInfo('未成团', arr)
    }
  },
  //获取拼团信息
  getTeamInfo:function(type,list){
    var that = this
    common.ajax({
      url: 'Home/User/getMyOrderGroup',
      userinfo: true,
      loading: '加载中......',
      data: {
        limit: 12,
        page: that.data.page++,
        status: type
      },
      success:function(res){
        console.log(res)
        if (res.result.list.length == 0) {
          wx.showToast({
            title: '已全部加载',
            icon: 'none',
            duration: 3000
          })
        }
        for (var i = 0; i < res.result.list.length; i++) {
          list.push({
            v_id: res.result.list[i].v_id,
            v_type: res.result.list[i].v_type,
            order_no: res.result.list[i].order_no,
            price: res.result.list[i].price,
            cover: res.result.list[i].cover,
            name: res.result.list[i].name,
            v_see_num: res.result.list[i].v_see_num,
            add_time: res.result.list[i].add_time,
            v_validity: res.result.list[i].v_validity,
            status: res.result.list[i].status,
            day_num: res.result.list[i].day_num,
            pay_time: res.result.list[i].pay_time,
            reason: res.result.list[i].reason,
            residue_num: res.result.list[i].residue_num,
            total_user: res.result.list[i].total_user,
            share_image: res.result.share_image,
            share_text: res.result.share_text,
            share_friend_image: res.result.share_friend_image
          })
        }
        that.setData({
          allList: list
        })
      }
    })
  },
  //付款payment
  payment:function(e){
    var that = this
    var appInfo = wx.getStorageSync("appModel");
    if (appInfo.indexOf("Android") != -1){
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
  //素材下载
  download: function (e) {
    var v_id = e.currentTarget.dataset.v_id
    wx.navigateTo({
      url: '../downloadList/downloadList?v_id=' + v_id
    })
  },
  //观看课程
  watch: function (e) {
    var v_id = e.currentTarget.dataset.v_id
    wx.navigateTo({
      url: '../live/live'
    })
    getApp().globalData.v_id = v_id
  },
  //分享share
  //查看课程详情
  liveDetails: function (e) {
    var that = this
    var text = e.currentTarget.dataset.type
    var v_id = e.currentTarget.dataset.v_id
    wx.setStorageSync('v_id', v_id)
    wx.setStorageSync('text', text)
    wx.navigateTo({
      url: '../courseDetails/courseDetails',
    })
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
  //二维码长按识别
  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.qrcode.split(','),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var list = []
    var isIos = wx.getStorageSync('appModel').indexOf("Android") != -1
    that.getTeamInfo('', list)
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
    var scenario = wx.getStorageSync("scenario")
    if (scenario.scene == 1007 || scenario.scene == 1008) {
      this.setData({
        homePageFlag: true
      })
    }
  },
  homePage: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
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
    var list = that.data.allList
    if (that.data.currentTab == 0) {
      that.getTeamInfo('', list)
    }
    if (that.data.currentTab == 1) {
      that.getTeamInfo('待付款', list)
    }
    if (that.data.currentTab == 2) {
      that.getTeamInfo('待成团', list)
    }
    if (that.data.currentTab == 3) {
      that.getTeamInfo('已成团', list)
    }
    if (that.data.currentTab == 4) {
      that.getTeamInfo('未成团', list)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    var share_code = wx.getStorageSync("share_code")
    return {
      title: "半月讲坛",
      imageUrl: that.data.share_image,
      desc: that.data.share_text,
      path: 'pages/course/course?share_code=' + share_code,
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function () {
        wx.showToast({
          title: '转发失败',
        })
      }
    }
  }
})