// pages/exams/exams.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlImg: '../../image/icon8.png',
    infoList: [],
    integral: false,
    grade: '',
    ca_id: '',
    role: '',
    ca_time: '',
    homePageFlag: false,
    page: 0
  },
  // // 展开列表
  unwind: function (e) {
    const that = this
    const id = e.currentTarget.dataset.id
    const infoList = that.data.infoList
    for (let i = 0, len = infoList.length; i < len; ++i) {
      if (infoList[i].ca_id === id) {
        infoList[i].open = !infoList[i].open
        
      }else{
        infoList[i].open = false
      }
    }
    that.setData({
      infoList
    })
  },
  //获取列表信息
  getAllQuestionCate:function(page){
    var that = this
    var list = that.data.infoList
    common.ajax({
      url: 'Home/Question/getAllQuestionCate',
      loading: '加载中......',
      userinfo: true,
      data: {
        page: page,
        limit: 15,
        next_limit: 5,
      },
      success: res => {
        if(res.result.list.length == 0){
          wx.showToast({
            title: '已加载全部列表',
            icon: 'none',
            duration: 3000
          })
          return false
        }
        list = list.concat(res.result.list)
        that.setData({
          grade: res.result.integral,
          infoList: list
        })
      }
    })
  },
  // 答题
  answer:function(e){
    var that = this
    var ca_id = e.currentTarget.dataset.ca_id,
        role = e.currentTarget.dataset.role,
        ca_time = e.currentTarget.dataset.ca_time,
        pay_status = e.currentTarget.dataset.status;
    that.setData({
      ca_id: ca_id,
      role: role,
      ca_time: ca_time
    })
    if(that.data.grade != '0' && pay_status == '未支付'){
      that.setData({
        integral: true
      })
    }else{
      var answer = [this.data.ca_id, this.data.role, this.data.ca_time]
      wx.setStorageSync("answer", answer)
      wx.navigateTo({
        url: '../allQuestions/answer/answer',
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
    var answer = [this.data.ca_id,this.data.role,this.data.ca_time]
    wx.setStorageSync("answer",answer)
    common.ajax({
      url: 'Home/Question/subjectIntegralPay',
      loading: '加载中......',
      userinfo: true,
      data: {
        ca_id: that.data.ca_id
      },
      success:res=>{
        if (res.errorCode == '100004'){
          setTimeout(() => {
            wx.showToast({
              title: res.result.msg,
              icon: 'none',
              duration: 3000
            })
          }, 100)
        }else{
          that.setData({
            integral: false
          })
          wx.navigateTo({
            url: '../allQuestions/answer/answer',
          })
        }
      }
    })
  },
  //拉取下一级更多列表
  getNextInfo: function(id,page,index) {
    var that = this
    var list = that.data.infoList
    common.ajax({
      url: 'Home/Question/getAllQuestionNextCate',
      userinfo: true,
      loading: '加载中...',
      data: {
        ca_id: id,
        page: page,
        limit: 5
      },
      success:res=>{
        if (res.result.list.length == 0) {
          wx.showToast({
            title: '已加载全部列表',
            icon: 'none',
            duration: 3000
          })
          return false
        }
        list[index].next_list = list[index].next_list.concat(res.result.list)
        that.setData({
          infoList: list
        })
      }
    })
  },
  //点击加载更更多
  more:function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var ca_id = e.currentTarget.dataset.ca_id
    var pages = Math.ceil(that.data.infoList[index].next_list.length / 5)
    console.log(pages)
    that.getNextInfo(ca_id,pages,index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getAllQuestionCate(0)
  },
  homePage: function () {
    wx.switchTab({
      url: '/pages/index/index',
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
    var that = this
    that.getAllQuestionCate(that.data.page)
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
    that.getAllQuestionCate(++that.data.page)
  },
})