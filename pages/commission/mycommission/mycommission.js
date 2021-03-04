// pages/commission/commission.js
var common = require("../../../utils/util.js");
var WxParse = require('../../../wxParse/wxParse.js');
var list = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag1: false,
    flag2: false,
    page: 0,
    count_sale: "",
    account: "",
    count_account: "",
    rule: "",
    infoList: [],
    settlement: "",
    val: ''
  },
  //攻略
  strategy:function(){
    this.setData({
      flag2: true
    })
  },
  shut:function(){
    this.setData({
      flag2: false
    })
  },
  //提现
  withdrawal:function(){
    if (Number(this.data.account) >= Number(this.data.rule)){
      this.setData({
        flag1: true
      })
    }else{
      wx.showToast({
        title: '佣金满' + this.data.rule + '才可提现',
        icon: 'none',
        duration: 3000
      })
    }
  },
  close:function(){
    this.setData({
      flag1: false
    })
  },
  //跳转历史
  history:function(){
    wx.navigateTo({
      url: '../settlement/settlement',
    })
  },
  getinfo:function(){
    var that = this
    list = that.data.infoList
    common.ajax({
      url: 'Home/User/getMyCommission',
      userinfo: true,
      loading: '加载中.....',
      data: {
        page: that.data.page++,
        limit: 12
      },
      success:function(res){
        var content = res.result.content;
        WxParse.wxParse('content', 'html', content, that, 0);
        if(res.result.list.length == '0'){
          wx.showToast({
            title: '已加载全部',
            icon: 'none',
            duration: 3000
          })
        }
        for(var i = 0;i < res.result.list.length;i++){
          list.push({
            name: res.result.list[i].bi_associated_data,
            timer: res.result.list[i].bi_add_time,
            bi_price: res.result.list[i].bi_price,
            bi_remark: res.result.list[i].bi_remark
          })
        }
        that.setData({
          count_sale: res.result.count_sale,
          account: res.result.account,
          count_account: res.result.count_account,
          rule: res.result.rule,
          infoList: list,
          settlement: res.result.count_account - res.result.account
        })
      }
    })
  },
  //提现金额
  getvalue:function(e){
    var that = this
    var val = e.detail.value
    that.setData({
      val: val
    })
  },
  allValue:function(){
    var that = this
    that.setData({
      val: that.data.account
    })
  },
  applyFor:function(){
    var that = this
    if (that.data.val == '') {
      wx.showToast({
        title: '请输入提现金额！',
        icon: 'none',
        duration: 3000
      })
    }else{
      if (Number(that.data.account) >= Number(that.data.val)) {
        common.ajax({
          url: 'Home/User/applyWithdrawals',
          userinfo: true,
          data: {
            price: that.data.val
          },
          success: function (res) {
            if (res.status == 'SUCCESS') {
              wx.showToast({
                title: '申请提交成功,请耐心等待审核',
                icon: 'none',
                duration: 3000
              })
              that.setData({
                flag1: false,
                val: ''
              })
              that.onLoad()
            } else {
              wx.showToast({
                title: res.result.msg,
                icon: 'none',
                duration: 3000
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '提现金额不能大于最大提现金额',
          icon: 'none',
          duration: 3000
        })
      }
    }
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
    var that = this
    that.getinfo()
  },
})