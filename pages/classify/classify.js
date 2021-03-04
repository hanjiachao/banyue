// pages/subject/subject.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ca_ids: '',
    integral: false,
    grade: '',
    infoList: [],
    ca_id: '',
    role: '',
    ca_time: ''
  },
  //获取信息列表
  getThirdCate:function(){
    var that = this
    common.ajax({
      url: 'Home/Question/getThirdCate',
      loading: '加载中......',
      userinfo: true,
      data: {
        ca_id: that.data.ca_ids
      },
      success:res=>{
        that.setData({
          grade: res.result.integral,
          infoList: res.result.list
        })
      }
    })
  },
  // 答题
  answer: function (e){
    var that = this;
    var ca_id = e.currentTarget.dataset.ca_id,
      role = e.currentTarget.dataset.role,
      ca_time = e.currentTarget.dataset.ca_time,
      pay_status = e.currentTarget.dataset.status;
    that.setData({
      ca_id: ca_id,
      role: role,
      ca_time: ca_time,
    })
    if (that.data.grade != '0' && pay_status == '未支付') {
      that.setData({
        integral: true
      })
    } else {
      wx.navigateTo({
        url: '../answer/answer?ca_id=' + this.data.ca_id + '&role=' + this.data.role + '&ca_time=' + this.data.ca_time,
      })
    }
  },
  //消耗积分弹窗
  close: function () {
    var that = this
    that.setData({
      integral: false
    })
  },
  consume: function () {
    var that = this
    common.ajax({
      url: 'Home/Question/subjectIntegralPay',
      loading: '加载中......',
      userinfo: true,
      data: {
        ca_id: that.data.ca_id
      },
      success: res => {
        if (res.status == 'ERROR') {
          setTimeout(() => {
            wx.showToast({
              title: res.result.msg,
              icon: 'none',
              duration: 3000
            })
          }, 100)
        } else {
          that.setData({
            integral: false
          })
          wx.navigateTo({
            url: '../answer/answer?ca_id=' + this.data.ca_id + '&role=' + this.data.role + '&ca_time=' + this.data.ca_time,
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
    that.setData({
      ca_ids: options.ca_id
    })
    that.getThirdCate()
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
    this.getThirdCate()
    console.log(this.data.ca_ids)
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