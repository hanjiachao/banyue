// pages/tuition/money/money.js
var common = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyFor: false,
    promote: false,
    audit: false,
    hdimg: '',
    qrcode: '',
    flag: false,
    content: '',
    sh_id: ''
  },
  apply: function () {
    wx.navigateTo({
      url: '../apply/apply',
    })
  },
  getmessage:function(){
    var that = this
    common.ajax({
      url: 'Home/Index/getSloganMessage',
      loading: '加载中......',
      success:res=>{
        that.setData({
          content: res.result.content
        })
      }
    })
  },
  getinfo:function(){
    var that = this
    common.ajax({
      url: 'Home/User/getUserShareData',
      userinfo: true,
      loading: "加载中.....",
      success:function(res){
        that.setData({
          hdimg: res.result.headimg
        })
        if (res.result.list == ''){
          that.setData({
            applyFor: true,
            audit: false,
            promote: false,
            flag: false
          })
        }else if(res.result.list.sh_status == '未审核'){
          that.setData({
            audit: true,
            applyFor: false,
            promote: false,
            flag: false
          })
        } else if (res.result.list.sh_status == '未通过'){
          that.setData({
            sh_id: res.result.list.sh_id,
            applyFor: true,
            flag: true,
            promote: false,
            audit: false
          })
        }else{
          that.setData({
            promote: true,
            applyFor: false,
            audit: false,
            flag: false,
            qrcode: res.result.list.sh_qrcode
          })
        }
      }
    })
  },
  //取消
  close:function(){
    wx.navigateBack({
      url: '../../index/index',
    })
  },
  //重新申请
  again:function(){
    var that = this
    wx.navigateTo({
      url: '../apply/apply?sh_id=' + that.data.sh_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getinfo()
    that.getmessage()
    that.setData({
      applyFor: true,
      audit: false,
      promote: false,
      flag: false
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
    this.onLoad()
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