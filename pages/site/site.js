// pages/site/site.js
var common = require("../../utils/util.js");
var index = [0, 0, 0];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces: '',
    citys: '',
    countys: '',
    province: '',
    city: '',
    county: ''
  },
  bindChange: function (event) {
    var that = this
    var val = event.detail.value;
    if (index[0] != val[0]) {
      index = val;      
      that.getCity(that.data.provinces[val[0]].id);
    } else {
      if (index[1] != val[1]) {
        index = val;
        that.getCounty(that.data.citys[val[1]].id)
      }
    }



    this.setData({
      province: that.data.provinces[index[0]].name,
      city: that.data.citys[val[1]].name,
      county: that.data.countys[val[2]].name
    })
    var province = that.data.provinces[index[0]].name;
    wx.setStorageSync('province', province)
    var city = that.data.citys[index[1]].name;
    wx.setStorageSync('city', city)
  },
  //获取省分数据
  getProvince:function(){
    var that = this
    var provinces = []
    common.ajax({
      url: 'Home/Index/getCity',
      loading: '加载中......',
      data: {
        id: 0
      },
      success: res => {
        for (var i in res.result.list) {
          provinces.push({
            name: res.result.list[i].name,
            id: res.result.list[i].id
          })
        }
        that.setData({
          provinces: provinces,
        })
        that.getCity(res.result.list[0].id)
      }
    })
  },
  //获取城市数据
  getCity:function(id){
    var that = this
    var citys = []
    common.ajax({
      url: 'Home/Index/getCity',
      loading: '加载中......',
      data: {
        id: id
      },
      success: res => {
        for (var i in res.result.list) {
          citys.push({
            name: res.result.list[i].name,
            id: res.result.list[i].id
          })
        }
        var city = citys[index[1]].name
        that.setData({
          citys: citys,
          city: city
        })
        wx.setStorageSync('city', city)
        that.getCounty(res.result.list[0].id)
      }
    })
  },
  //获取县区数据
  getCounty:function(id){
    var that = this
    var countys = []
    common.ajax({
      url: 'Home/Index/getCity',
      loading: '加载中......',
      data: {
        id: id
      },
      success: res => {
        for (var i in res.result.list) {
          countys.push({
            name: res.result.list[i].name,
            id: res.result.list[i].id
          })
        }
        var county = countys[index[2]].name
        that.setData({
          countys: countys,
          county: county
        })
        wx.setStorageSync('county', county)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setStorageSync('province', '')
    wx.setStorageSync('city', '')
    wx.setStorageSync('county', '')
    index = [0,0,0]
    // 初始化调用
    that.getProvince(0)
    that.setData({
      province: '北京',
      city: '北京市',
      county: '东城区'
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

  },
})