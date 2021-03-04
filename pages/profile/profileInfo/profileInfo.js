// pages/profile/profileInfo/profileInfo.js
var common = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    sex: '',
    birth: '',
    card_type: '',
    part_time: '',
    education: '',
    academy: '',
    major: '',
    graduate_year: ''
  },
  write:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../write/write?id=' + id,
    })
  },
  getinfo:function(){
    var that = this
    common.ajax({
      url: 'Home/User/getUserData',
      userinfo: true,
      loading: '加载中......',
      success:res=>{
        that.setData({
          nickname: res.result.list.nickname,
          sex: res.result.list.sex,
          birth: res.result.list.birth,
          card_type: res.result.list.card_type,
          part_time: res.result.list.part_time,
          education: res.result.list.education,
          academy: res.result.list.academy,
          major: res.result.list.major,
          graduate_year: res.result.list.graduate_year
        })
      }
    })
  },
  //刷新页面
  refresh:function(){
    this.onLoad()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getinfo()
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