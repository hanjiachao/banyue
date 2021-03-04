// pages/notice/notice.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    city: '',
    cate_id: '',
    province: '',
    city: '',
    county: '',
    skey: '',
    page: 0,
    classify: [],
    infoList: [],
    popup: false
  },
  click: function (e) {
    var that = this
    var list = [];
    var cur = e.currentTarget.dataset.id
    if (that.data.currentTab == cur) {
      return false
    } else {
      that.setData({
        currentTab: cur,
        cate_id: e.currentTarget.dataset.ca_id,
        page: 0
      })
    }
    that.getNotice(that.data.cate_id, that.data.province, that.data.city, that.data.county, '', '', list)
  },
  //选择位置
  site:function(){
    wx.navigateTo({
      url: '../site/site',
    })
  },
  //获取分类列表
  getList:function(){
    var that = this
    var list = []
    common.ajax({
      url: 'Home/Index/getArticleCate',
      loading: '加载中......',
      data: {
        type: '招考公告'
      },
      success:res=>{
        for(var i in res.result.list){
          list.push({
            ca_id: res.result.list[i].ca_id,
            ca_name: res.result.list[i].ca_name
          })
        }
        that.setData({
          classify: list
        })
      }
    })
  },
  //获取讲坛动态列表
  getNotice:function(cate_id,province,city,county,skey,order,list){
    var that = this
    common.ajax({
      url: 'Home/Index/getArticleList',
      loading: '加载中......',
      data: {
        type: '招生考试',
        cate_id: cate_id,
        province: province,
        city: city,
        county: county,
        skey: skey,
        page: that.data.page++,
        limit: 6,
        order: order
      },
      success:res=>{
        if(res.result.list.length == '0'){
          that.setData({
            popup: true
          })
          setTimeout(function () {
            that.setData({
              popup: false
            })
          }, 2000)
        }
        for(var i in res.result.list){
          list.push({
            ar_id: res.result.list[i].ar_id,
            ar_label: res.result.list[i].ar_label,
            ar_title: res.result.list[i].ar_title,
            date: res.result.list[i].date,
            ar_browse: res.result.list[i].ar_browse
          })
        }
        that.setData({
          infoList: list
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var list = []
    var province = wx.getStorageSync('province');
    var city = wx.getStorageSync('city');
    var county = wx.getStorageSync('county');
    if(city == ''){
      common.location(function (res) {
        common.ajax({
          url: 'Home/Index/getAddressPosition',
          data: {
            lat: res.latitude,
            lng: res.longitude
          },
          success: res => {
            var city = res.result.list.result.addressComponent.city
            that.setData({
              city: city,
              page: 0
            })
            that.getNotice(that.data.cate_id, '', city, '', '', '', list)
          }
        })
      })
    }else{
      that.setData({
        city: city,
        page: 0
      })
      that.getNotice(that.data.cate_id, province, city, county, '', '', list)
    }
    that.getList()
  },
  comdetails:function(e){
    wx.navigateTo({
      url: '../comdetails/comdetails?id=' + e.currentTarget.dataset.ar_id + '&title=' + '招考公告',
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
    var that = this
    that.onLoad()
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
    var list = that.data.infoList
    that.getNotice(that.data.cate_id, that.data.province, that.data.city, that.data.county, '', '', list)
  },
})