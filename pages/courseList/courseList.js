// pages/courseList/courseList.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    limit: 9,
    currentTab: 0,
    jingpin: false,
    pintuan: false,
    mianfei: false,
    arr: [],
    tabList: [],
    courselist: [],
    barTitleText: '',
    array: "",
    flag1: true,
    flag2: false,
    iphoneFlag: false,
    pages: 0,
    ca_id: '',
    isIos: ''
  },
  click: function (e) {
    var that = this
    var list = [];
    var cur = e.currentTarget.dataset.ca_id
    var index = e.currentTarget.dataset.id
    if (that.data.currentTab == cur) {
      return false
    } else {
      console.log(cur)
      that.setData({
        currentTab: index,
        ca_id: cur,
        pages: 0
      })
    }
    that.getCourseList('加载中.....', that.data.barTitleText, e.currentTarget.dataset.ca_id, that.data.page, that.data.limit, list)
  },
  screen: function () {
    wx.navigateTo({
      url: '../screen/screen',
    })
  },
  //获取顶部分类
  getClassify: function () {
    var that = this
    common.ajax({
      url: 'Home/Index/getArticleCate',
      data: {
        type: '课程'
      },
      success: function (res) {
        var list = [];
        for (var i = 0; i < res.result.list.length; i++) {
          list.push({
            ca_id: res.result.list[i].ca_id,
            ca_name: res.result.list[i].ca_name
          })
        }
        that.setData({
          tabList: list
        })
      }
    })
  },
  //获取课程列表
  getCourseList: function (msg, type, id, page, limit, arr) {
    var that = this
    common.ajax({
      url: 'Home/Video/getVideoList',
      loading: msg,
      userinfo: true,
      data: {
        type: type,
        cate_id: id,
        page: page,
        limit: limit,
        list: that.data.array
      },
      success: function (res) {
        for (var i = 0; i < res.result.list.length; i++) {
          arr.push({
            v_id: res.result.list[i].v_id,
            v_name: res.result.list[i].v_name,
            v_price: res.result.list[i].v_price,
            v_cover: res.result.list[i].v_cover,
            v_group_price: res.result.list[i].v_group_price,
            v_see_num: res.result.list[i].v_see_num,
            v_validity: res.result.list[i].v_validity,
            v_label: res.result.list[i].v_label,
            residue_num: res.result.list[i].residue_num
          })
        }
        that.setData({
          courselist: arr
        })
        if (that.data.courselist.length == '0') {
          that.setData({
            flag1: false,
            flag2: true
          })
        } else {
          that.setData({
            flag1: true,
            flag2: false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var list = []
    var text = wx.getStorageSync('text')
    var boole = wx.getStorageSync("boole");
    var isIos = wx.getStorageSync('appModel').indexOf("Android") != -1
    if (Object.keys(options).length != 0) {
      var array = options.arr
      that.setData({
        array: array
      })
      that.getCourseList("加载中.....", text, "", that.data.page, that.data.limit, list)
    } else {
      that.getCourseList("加载中.....", text, "", that.data.page, that.data.limit, list)
    }
    that.setData({
      barTitleText: text,
      iphoneFlag: boole,
      isIos: isIos
    })
    if (text == "精品") {
      wx.setNavigationBarTitle({
        title: "精品课程"
      })
      that.setData({
        jingpin: true,
        pintuan: false,
        mianfei: false
      })
    } else if (text == "拼团") {
      wx.setNavigationBarTitle({
        title: "火热拼团"
      })
      that.setData({
        jingpin: false,
        pintuan: true,
        mianfei: false
      })
    } else {
      wx.setNavigationBarTitle({
        title: "课程列表"
      })
      that.setData({
        jingpin: false,
        pintuan: false,
        mianfei: true
      })
    }
    that.getClassify()
  },
  //
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //课程详情
  details: common.throttle(function (e) {
    var v_id = e.currentTarget.dataset.v_id;
    wx.setStorageSync('v_id', v_id)
    wx.navigateTo({
      url: '../courseDetails/courseDetails'
    })
  }, 2000),
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    that.getCourseList("加载中.....", that.data.barTitleText, that.data.ca_id, ++that.data.pages, that.data.limit, that.data.courselist)
  },
})