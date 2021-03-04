// pages/collect/collect.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlImg: '../../image/icon8.png',
    currentTab: 0,
    typeid: null,
    page: 0,
    page1: 0,
    page2: 0,
    height: "",
    disp: "none",
    courseList: [],
    yearsList: [],
    onlineList: [],
    isIos: ''
  },
  // 遮罩
  show: function () {
    this.setData({
      disp: "block"
    })
  },
  hide: function () {
    this.setData({
      disp: "none"
    })
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
    if (event.currentTarget.dataset.current == '0'){
      var list = []
      that.getCollect('0', '课程', '',list)
    }
  },
  select:function(e){
    var that = this
    var list = []
    that.setData({
      page: 0,
      courseList: ''
    })
    if (this.data.typeid == e.currentTarget.dataset.type) {
      return false;
    } else {
      this.setData({
        typeid: e.currentTarget.dataset.type
      })
    }
    if (e.currentTarget.dataset.type == '0') {
      that.getCollect('0', '课程', '拼团',list)
    }
    if (e.currentTarget.dataset.type == '1') {
      that.getCollect('0', '课程', '精品', list)
    }
    if (e.currentTarget.dataset.type == '2') {
      that.getCollect('0', '课程', '免费', list)
    }
  },
  // // 展开
  unwind: function (e) {
    const that = this
    const id = e.currentTarget.dataset.ca_id
    const yearsList = that.data.yearsList
    for (let i = 0, len = yearsList.length; i < len; ++i) {
      if (yearsList[i].ca_id === id) {
        yearsList[i].open = !yearsList[i].open

      } else {
        yearsList[i].open = false
      }
    }
    that.setData({
      yearsList
    })
  },

  //获取课程收藏列表
  getCollect:function(index,type,role,list){
    var that = this
    common.ajax({
      url: 'Home/User/getCollectionList',
      userinfo: true,
      loading: '加载中......',
      data: {
        page: index,
        limit: 12,
        type: type,
        role: role
      },
      success:res=>{
        console.log(res)
        if (res.result.list == null){
          wx.showToast({
            title: '已加载全部课程',
            icon: 'none',
            duration: 3000
          })
        }
        for(var i in res.result.list){
          list.push({
            v_cover: res.result.list[i].v_cover,
            v_id: res.result.list[i].v_id,
            v_label: res.result.list[i].v_label,
            v_name: res.result.list[i].v_name,
            v_validity: res.result.list[i].v_validity,
            v_type: res.result.list[i].v_type,
            v_see_num: res.result.list[i].v_see_num,
            v_group_price: res.result.list[i].v_group_price,
            v_price: res.result.list[i].v_price,
            residue_num: res.result.list[i].residue_num,
            v_buy_num: res.result.list[i].v_buy_num
          })
        }
        that.setData({
          courseList: list
        })
      }
    })
  },
  goCourse:function(e){
    var text = e.currentTarget.dataset.type
    var v_id = e.currentTarget.dataset.v_id
    wx.setStorageSync('v_id', v_id)
    wx.setStorageSync('text', text)
    wx.navigateTo({
      url: '../courseDetails/courseDetails',
    })
  },
  //获取历年真题
  getCollectionQuestion:function(page){
    var that = this
    common.ajax({
      url: 'Home/User/getCollectionQuestion',
      loading: '加载中......',
      userinfo: true,
      data: {
        page: page,
        limit: 12
      },
      success:res=>{
        that.setData({
          yearsList: res.result.list
        })
      }
    })
  },
  //获取在线模考
  getCollectionMoldTest: function (page){
    var that = this
    common.ajax({
      url: 'Home/User/getCollectionMoldTest',
      loading: '加载中......',
      userinfo: true,
      data: {
        page: page,
        limit: 12
      },
      success: res => {
        that.setData({
          onlineList: res.result.list
        })
      }
    })
  },
  //查看收藏详情
  details:function(e){
    wx.navigateTo({
      url: '../collectDetails/collectDetails?cate_id=' + e.currentTarget.dataset.cate_id + "&type=" + e.currentTarget.dataset.type,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var list = []
    var isIos = wx.getStorageSync('appModel').indexOf("Android") != -1
    that.getCollect('0', '课程', '',list)
    that.getCollectionQuestion(that.data.page1)
    that.getCollectionMoldTest(that.data.page2)
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
    var list = that.data.courseList
    if(that.data.currentTab == '0'){
      that.getCollect(++that.data.page, '课程', '',list)
    }
    if (that.data.typeid == '0') {
      that.getCollect(++that.data.page, '拼团', '', list)
    }
    if (that.data.typeid == '1') {
      that.getCollect(++that.data.page, '精品', '', list)
    }
    if (that.data.typeid == '2') {
      that.getCollect(++that.data.page, '免费', '', list)
    }
  },
})