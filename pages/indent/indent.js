// pages/indent/indent.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_type: '',
    order_no: '',
    v_cover: '',
    v_name: '',
    v_price: '',
    v_group_price: '',
    v_min_price: '',
    change: '',
    integral: '',
    setIntegral: '',
    offset_price: '',
    money: '',
    flag: true,
    shade: false,
    selected1: false,
    selected2: false,
    selected3: false,
    successful: false,
    text: '',
    moneyNum: ''
  },
  //获取订单详情
  getOrderDetail: function (order_no){
    var that = this
    common.ajax({
      url: 'Home/Video/getDetailByOrderNo',
      userinfo: true,
      data: {
        order_no: order_no
      },
      success:function(res){
        var text = res.result.order_type == '精品' ? '课程' : '拼团'
        that.setData({
          order_type: res.result.order_type,
          v_cover: res.result.list.v_cover,
          v_name: res.result.list.v_name,
          v_price: res.result.list.v_price,
          v_group_price: res.result.list.v_group_price,
          v_min_price: res.result.list.v_min_price, //最低金额
          change: res.result.change,  //积分换算
          integral: res.result.integral,
          text: text,
        })
        if (res.result.order_type == '精品'){
          that.setData({
            money: res.result.list.v_price,
            moneyNum: res.result.list.v_price
          })
        }else{
          that.setData({
            money: res.result.list.v_group_price,
            moneyNum: res.result.list.v_group_price
          })
        }
      }
    })
  },
  //使用积分
  shiyongjifen:function (e) {
    var that = this
    if(that.data.selected1){
      that.setData({
        selected1: false,
        flag: true
      })
    }else{
      that.setData({
        selected1: true,
        flag: false
      })
    }
  },
  getIntegral:function (e) {
    var val = e.detail.value
    var that = this
    var num = that.data.money
    var offset_price = val / that.data.change
    var money = parseFloat((num - offset_price).toFixed(10))
    if(that.data.v_min_price > money){
      wx.showToast({
        title: '积分抵现不能小于最低金额',
        icon: 'none',
        duration: 2000
      })
    }else{
      this.setData({
        setIntegral: val,
        offset_price: offset_price,
        moneyNum: money
      })
    }
  },
  //阅读协议
  agreement:function(){
    this.setData({
      shade: true
    })
  },
  close:function(){
    this.setData({
      shade: false
    })
  },
  //支付调用
  pay:function(){
    var that = this
    common.ajax({
      url: 'Home/Pay/confirmOrderPay',
      userinfo: true,
      data: {
        order_no: that.data.order_no,
        pay_price: that.data.moneyNum,
        offset_price: that.data.offset_price,
        use_integral: that.data.setIntegral
      },
      success: function (res) {
        wx.requestPayment({
          timeStamp: res.result.wxpay_data.timeStamp.toString(),
          nonceStr: res.result.wxpay_data.nonceStr,
          package: res.result.wxpay_data.package,
          signType: 'MD5',
          paySign: res.result.wxpay_data.paySign,
          success(res) {
            that.setData({
              successful: true
            })
          },
          fail(res) {
            wx.showToast({
              title: '支付失败，请重新支付',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  },
  payWay:function(){
    var that = this
    if(!that.data.selected2){
      that.setData({
        selected2: true
      })
    }else{
      that.setData({
        selected2: false
      })
    }
  },
  yuedu:function(){
    var that = this
    if (!that.data.selected3) {
      that.setData({
        selected3: true
      })
    } else {
      that.setData({
        selected3: false
      })
    }
  },
  //成功后触发的函数
  leave:function(){
    var that = this
    if(that.data.order_type == '精品'){
      wx.redirectTo({
        url: '../myCourses/myCourses',
      })
    }else{
      wx.navigateTo({
        url: '../myTeam/myTeam',
      })
    }
  },
  returns:function(){
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.changeData();//触发父页面中的方法
    }
    wx.navigateBack()
  },
  //提交订单
  submit:common.throttle(function(e){
    var that = this
    if (!that.data.selected1) {
      that.setData({
        setIntegral: ''
      })
    }
    if (that.data.selected2 & that.data.selected3) {
      that.pay()
    } else {
      wx.showToast({
        title: '请完整信息',
        icon: 'none',
        duration: 2000
      })
    }
  },2000),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      order_no: options.orderNo
    })
    that.getOrderDetail(options.orderNo)
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