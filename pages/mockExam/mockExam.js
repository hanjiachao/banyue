// pages/mockExam/mockExam.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    integral: false,
    grade: '',
    bind_status: '',
    ar_id: '',
    ar_title: '',
    infoList: [],
    ca_id: '',
    role: '',
    ca_time: '',
    homePageFlag: false
  },
  //获取绑定状态
  getlogin:function(){
    var that = this
    common.ajax({
      url: 'Home/User/getUserData',
      userinfo: true,
      loading: '加载中......',
      success:res=>{
        that.setData({
          bind_status: res.result.list.bind_status
        })
        if(that.data.bind_status == '已绑定'){
          that.setData({
            flag: false
          })
        }
      }
    })
  },
  //获取页面信息
  getNews:function(){
    var that = this
    var list = []
    common.ajax({
      url: 'Home/Question/getMoldTestCate',
      loading: '加载中......',
      userinfo: true,
      success:res=>{
        for(var i in res.result.list){
          list.push({
            ca_id: res.result.list[i].ca_id,
            ca_name: res.result.list[i].ca_name,
            ca_image: res.result.list[i].ca_image,
            ca_path: res.result.list[i].ca_path,
            next_list: res.result.list[i].next_list
          })
        }
        that.setData({
          grade: res.result.integral,
          ar_id: res.result.message.ar_id,
          ar_title: res.result.message.ar_title,
          infoList: list 
        })
      }
    })
  },
  //最新消息详情
  comdetail:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.ar_id
    wx.navigateTo({
      url: '../comdetails/comdetails?id=' + id + '&title=' + '最新消息'
    })
  },
  //绑定消息
  register: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  abolish: function () {
    var that = this;
    that.setData({
      flag: false
    })
  },
  //答题
  answer:function(e){
    var ca_id = e.currentTarget.dataset.ca_id,
        third = e.currentTarget.dataset.third,
        role = e.currentTarget.dataset.role,
        ca_time = e.currentTarget.dataset.ca_time,
        pay_status = e.currentTarget.dataset.status;
    var that = this
    that.setData({
      ca_id: ca_id,
      role: role,
      ca_time: ca_time
    })
    if (that.data.bind_status != '已绑定'){
      that.setData({
        flag: true
      })
    }else{
      if(!third){
        if (that.data.grade != '0' && pay_status == '未支付') {
          that.setData({
            integral: true
          })
        } else {
          wx.navigateTo({
            url: '../answer/answer?ca_id=' + this.data.ca_id + '&role=' + this.data.role + '&ca_time=' + this.data.ca_time,
          })
        }
      }else{
        that.setData({
          integral: false
        })
        wx.navigateTo({
          url: '../classify/classify?ca_id=' + ca_id,
        })
      }
    }
  },
  //消耗积分弹窗
  close:function(){
    var that = this
    that.setData({
      integral: false
    })
  },
  consume:function(){
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
  homePage: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getlogin()
    that.getNews()
  },
  changeData: function () {
    this.onLoad();
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
    this.onLoad();
    var scenario = wx.getStorageSync("scenario")
    if (scenario.scene == 1007 || scenario.scene == 1008) {
      this.setData({
        homePageFlag: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.onLoad();
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