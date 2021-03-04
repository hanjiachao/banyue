//index.js
var common = require("../../utils/util.js");
var list = [];
//获取应用实例
const app = getApp()
Page({
  data: {
    flag: false,
    height: '',
    disp: "none",
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
	bannerList: [],
    indicatorDots:true,
    autoPlay:true,
    circular:true,
    interval:3000,
    duration:1000,
    indicatorColor: '#fff',
    activeColor: '#03CA9E',
    pages: 0,
    tel:"",
    service_tel:"",
    qrcode:"",
    community:[{
      ar_id:"",
      ar_title:""
    }],
    notice:[{
      ar_id:"",
      ar_title:""
    }],
    noticeNum: 2,
    article:"Home/Index/getArticleList",
    courseList1: [],
    courseList2: [],
    messageUrl: '',
    text: "查看更多",
    bind_status: '',
    dakaFlag: true,
    experience: '',
    iphoneFlag: '',
    isIos: ''
  },
  show:function(){
    this.setData({
      disp:"block"
    })
  },
  hide:function(){
    this.setData({
      disp:"none"
    })
  },
  //绑定消息
  register: function () {
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../login/login',
    })
  },
  abolish: function () {
    var that = this;
    that.setData({
      flag: false
    })
  },
  //搜索跳转
  search:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //我的信息
  news:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../news/news',
    })
  },
  //课程
  course:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../course/course',
    })



    // if (!wx.getStorageSync("flag")) {
    //   common.toLogin()
    //   return false
    // }
    // if (wx.getStorageSync('boole')) {
    //   wx.navigateTo({
    //     url: '../course/course',
    //   })
    // } else {
    //   wx.showToast({
    //     title: '系统升级中，敬请期待！',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
  },
  //在线模考
  mockExam:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../mockExam/mockExam',
    })
  },
  //讲坛动态跳转
  dynamic:function(e){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  communitys:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../community/community',
    })
  },
  //错题本
  mistakes:function(){
    var that = this
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    if(that.data.bind_status == '已绑定'){
      wx.navigateTo({
        url: '../mistakes/mistakes',
      })
    }else{
      that.setData({
        flag: true
      })
    }
  },
  //历年真题
  exams:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../exams/exams',
    })
  },
  //赚学费
  tuition: function () {
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../tuition/money/money',
    })
  },
  //打卡
  daka:function(){
    var that = this
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    common.ajax({
      url: 'Home/User/getUserClock',
      userinfo: true,
      success: function (res) {
        if (res.status == 'SUCCESS') {
          that.setData({
            dakaFlag: false,
            experience: res.result.experience
          })
        } else {
          wx.showToast({
            title: '今日已打卡',
            icon: 'none',
            duration: 3000
          })
        }
      }
    })
  },
  //分享打卡到朋友圈
  shareTo: function () {
    var that = this
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    common.ajax({
      url: 'Home/User/getClockFootprint',
      userinfo: true,
      loading: '加载中......',
      success: function (res) {
        that.setData({
          shareImg: res.result.image
        })
      }
    })
    wx.downloadFile({
      url: that.data.shareImg,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权")
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          },
          complete(res) {
            console.log(res);
          }
        })
      }
    })
  },
  //关闭打卡
  close: function () {
    this.setData({
      dakaFlag: true
    })
  },
  //招考公告
  noticetap:function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  //答疑解惑
  issue: function(){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../issue/issue',
    })
  },
  //获取轮播图
  bannerList: function (msg) {
    var that = this;
    common.ajax({
      url: "Home/Index/getBannerList",
      loading: msg,
      success: function(res){
        // console.log(res)
        var list = [];
        if(res.status == "SUCCESS"){
          that.setData({
            bannerList: res.result.list
          })
        }else{
          wx.showToast({
            title: res.result.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  //客服详情
  service : function () {
    var that = this;
    common.ajax({
      url:"Home/Index/getServiceData",
      success: function (res) {
        that.setData({
          tel: res.result.tel,
          service_tel: res.result.service_tel,
          qrcode: res.result.qrcode,
        })
      }
    })
  },
  //轮播图加载
  imgH:function(e){
    var that = this
    var winWid = wx.getSystemInfoSync().windowWidth;
    var imgh = e.detail.height;
    var imgw = e.detail.width;
    var swiperH = winWid * imgh / imgw + "px"
    that.setData({
      height: swiperH
    })
  },
  //招考公告
  notice : function () {
    var that = this;
    common.ajax({
      url: that.data.article,
      data: {
        type:"招生考试",
        limit:that.data.noticeNum,
        page:0
      },
      success: function (res) {
        var list = []
        for(var i = 0; i < res.result.list.length;i++){
          list.push({
            ar_id: res.result.list[i].ar_id,
            ar_title: res.result.list[i].ar_title
          })
        }
        that.setData({
          notice : list
        })
      }
    })
  },
  //招考公告详情
  noticetDetails:function(e){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../comdetails/comdetails?id=' + e.currentTarget.dataset.ar_id + '&title=' + '招考公告',
    })
  },
  //讲坛社区
  community: function() {
    var that = this;
    common.ajax({
      url: that.data.article,
      data: {
        type: "讲坛社区",
        limit: that.data.noticeNum,
        page: 0
      },
      success: function (res) {
        var list = []
        for (var i = 0; i < res.result.list.length; i++) {
          list.push({
            ar_id: res.result.list[i].ar_id,
            ar_title: res.result.list[i].ar_title
          })
        }
        that.setData({
          community: list
        })
      }
    })
  },
  communitytap: function(res){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    wx.navigateTo({
      url: '../comdetails/comdetails?id=' + res.currentTarget.dataset.ar_id+'&title='+'讲坛社区',
    })
  },
  //课程数据
  getCoursesInfo:function(type){
    var that = this
    common.ajax({
      url: 'Home/Video/getVideoList',
      userinfo: true,
      data: {
        type: '拼团',
        page: that.data.pages++,
        limit: 7
      },
      success:function(res){
        if(res.result.list.length == 0){
          that.setData({
            text: "已全部加载"
          })
        }
        for(var i = 0;i < res.result.list.length;i++){
          list = list.concat({
            v_id: res.result.list[i].v_id,
            v_name: res.result.list[i].v_name,
            v_cover: res.result.list[i].v_cover,
            v_price: res.result.list[i].v_price,
            v_group_price: res.result.list[i].v_group_price,
            v_see_num: res.result.list[i].v_see_num
          })
        }
        that.setData({
          courseList2: list
        })
      }
    })
  },
  //查看更多
  more:function(){
    var that = this
    that.getCoursesInfo()
  },
  //查看课程详情
  check1:function(e){
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    var v_id = e.currentTarget.dataset.v_id
    wx.setStorageSync('v_id', v_id)
    wx.setStorageSync('text', "精品")
    wx.navigateTo({
      url: '../courseDetails/courseDetails',
    })
  },
  check2: function (e) {
    if (!wx.getStorageSync("flag")) {
      common.toLogin()
      return false
    }
    var v_id = e.currentTarget.dataset.v_id
    wx.setStorageSync('v_id', v_id)
    wx.setStorageSync('text', "拼团")
    wx.navigateTo({
      url: '../courseDetails/courseDetails',
    })
  },
  //获取是否有新消息
  getuserinfo: function () {
    var that = this;
    common.ajax({
      url: 'Home/User/getUserData',
      userinfo: true,
      success: function (res) {
        wx.setStorageSync('share_code', res.result.list.share_code)
        that.setData({
          bind_status: res.result.list.bind_status
        })
        if(res.result.list.unread_count != '0'){
          that.setData({
            messageUrl: '../../image/message.png'
          })
        }else{
          that.setData({
            messageUrl: '../../image/message_1.png'
          })
        }
      }
    })
  },
  //二维码长按识别
  previewImage:function(e){
    wx.previewImage({
      urls: this.data.qrcode.split(','),
    })
  },
  onLoad: function () {
    var that = this;
    var isIos = wx.getStorageSync('appModel').indexOf("Android") != -1
    that.bannerList("加载中.....")
    that.service()
    that.notice()
    that.community()
    that.getuserinfo()
    //精品课程
    common.ajax({
      url: 'Home/Video/getVideoList',
      userinfo: true,
      data: {
        type: '精品',
        page: 0,
        limit: 4
      },
      success: function (res) {
        var list = []
        for (var i = 0; i < res.result.list.length; i++) {
          list = list.concat({
            v_id: res.result.list[i].v_id,
            v_name: res.result.list[i].v_name,
            v_cover: res.result.list[i].v_cover,
            v_price: res.result.list[i].v_price,
            v_group_price: res.result.list[i].v_group_price,
            v_see_num: res.result.list[i].v_see_num
          })
        }
        that.setData({
          courseList1: list
        })
      },
      fail:function(res){
        console.log(res)
      },
      complete:function(res){
        console.log(res)
      }
    })
    that.getCoursesInfo()
    var boole = wx.getStorageSync('boole')
    that.setData({
      iphoneFlag: boole,
      isIos: isIos
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeData: function () {
    this.onLoad();
  },
  onShow: function () {
    this.onLoad()
    this.setData({
      flag: false
    })
  }
})
