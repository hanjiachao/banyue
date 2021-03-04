// pages/parsing/parsing.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '',
    su_id: '',
    count: '',
    su_question: '',
    su_norm: '',
    su_answer: '',
    su_score: '',
    value: '',
    placeholder: '0分'
  },
  //获取简答题解析
  getparsing:function(){
    var that = this
    common.ajax({
      url: 'Home/Question/getQuestionAnswer',
      loading: '加载中......',
      userinfo: true,
      data: {
        su_id: that.data.su_id
      },
      success:res=>{
        that.setData({
          count: res.result.count,
          su_question: res.result.list.su_question,
          su_norm: res.result.list.su_norm,
          su_answer: res.result.list.su_answer,
          su_score: res.result.list.su_score
        })
      }
    })
  },
  //评分分数
  getScore:function(e){
    this.setData({
      value: e.detail.value
    })
  },
  inputFocus:function(e){
    this.setData({
      placeholder: ''
    })
  },
  inputBlur:function(){
    this.setData({
      placeholder: '0分'
    })
  },
  //保存得分
  submit:function(){
    var that = this
    if(Number(that.data.su_score) >= Number(that.data.value)){
      wx.setStorageSync('score', that.data.value)
      wx.navigateBack()
    }else{
      wx.showToast({
        title: '您的评分标准不能超过' + that.data.su_score + '分',
        icon: 'none',
        duration: 3000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      index: options.index,
      su_id: options.su_id
    })
    that.getparsing()
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