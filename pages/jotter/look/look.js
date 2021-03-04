// pages/jotter/look/look.js
var common = require("../../../utils/util.js");
var rpx;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlImg: '../../../image/icon8.png',
    er_id: '',
    title: '',
    remove: '',
    accuracy: '',
    residue: '',
    correct: '',
    cate_list: '',
    video_list: '',
    cate_id: '',
    type: '',
    integral: false,
    grade: '',
    ca_id: '',
    role: '',
    ca_time: '',
    isIos: ''
  },
  // 答题
  answer: function (e) {
    console.log(e)
    var that = this
    var ca_id = e.currentTarget.dataset.ca_id,
        role = e.currentTarget.dataset.role,
        ca_time = e.currentTarget.dataset.ca_time;
    that.setData({
      ca_id: ca_id,
      role: role,
      ca_time: ca_time
    })
    if (that.data.grade != '0') {
      that.setData({
        integral: true
      })
    } else {
      if (that.data.type == '历年真题'){
        var answer = [this.data.ca_id, this.data.role, this.data.ca_time]
        wx.setStorageSync("answer", answer)
        wx.navigateTo({
          url: '../../allQuestions/answer/answer',
        })
      }else{
        wx.navigateTo({
          url: '../../answer/answer?ca_id=' + this.data.ca_id + '&role=' + this.data.role + '&ca_time=' + this.data.ca_time,
        })
      }
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
    if(that.data.type == '历年真题'){
      var answer = [this.data.ca_id, this.data.role, this.data.ca_time]
      wx.setStorageSync("answer", answer)
      common.ajax({
        url: 'Home/Question/subjectIntegralPay',
        loading: '加载中......',
        userinfo: true,
        data: {
          ca_id: that.data.ca_id
        },
        success: res => {
          if (res.errorCode == '100004') {
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
              url: '../../allQuestions/answer/answer',
            })
          }
        }
      })
    }else{
      common.ajax({
        url: 'Home/Question/subjectIntegralPay',
        loading: '加载中......',
        userinfo: true,
        data: {
          ca_id: that.data.ca_id
        },
        success: res => {
          if (res.errorCode == '100004') {
            wx.showToast({
              title: '积分使用失败，请重试！',
              icon: 'none',
              duration: 3000
            })
          } else {
            that.setData({
              integral: false
            })
            wx.navigateTo({
              url: '../../answer/answer?ca_id=' + this.data.ca_id + '&role=' + this.data.role + '&ca_time=' + this.data.ca_time,
            })
          }
        }
      })
    }
  },
  //获取练习结果
  getMssage:function(){
    var that = this
    common.ajax({
      url: 'Home/Question/errorResult',
      loading: '加载中......',
      userinfo: true,
      data: {
        er_id: that.data.er_id
      },
      success:res=>{
        that.setData({
          title: res.result.list.title,
          remove: res.result.list.remove,
          accuracy: res.result.list.accuracy,
          residue: res.result.list.residue,
          correct: res.result.list.correct,
          cate_list: res.result.list.cate_list,
          video_list: res.result.list.video_list,
          cate_id: res.result.list.cate_id,
          type: res.result.list.type,
          grade: res.result.list.integral
        })
        //绘制背景
        this.drawProgressbg();
        //开始progress
        this.drawCircle();
      }
    })
  },
  // // 展开列表
  unwind: function (e) {
    const that = this
    const id = e.currentTarget.dataset.id
    const cate_list = that.data.cate_list
    for (let i = 0, len = cate_list.length; i < len; ++i) {
      if (cate_list[i].ca_id === id) {
        cate_list[i].open = !cate_list[i].open

      } else {
        cate_list[i].open = false
      }
    }
    that.setData({
      cate_list
    })
  },
  //查看课程
  goCourse: function (e) {
    var text = e.currentTarget.dataset.type
    var v_id = e.currentTarget.dataset.v_id
    wx.setStorageSync('v_id', v_id)
    wx.setStorageSync('text', text)
    wx.navigateTo({
      url: '../../courseDetails/courseDetails',
    })
  },
  //查看解析
  parsing:function(){
    wx.navigateTo({
      url: '../parsing/parsing?cate_id=' + this.data.cate_id,
    })
  },
  //继续练习
  continue:function(){
    wx.navigateTo({
      url: '../../mistakes/mistakes',
    })
  },
  //退出练习
  exit:function(){
    wx.switchTab({
      url: '../../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var isIos = wx.getStorageSync('appModel').indexOf("Android") != -1
    this.setData({
      er_id: options.er_id,
      isIos: isIos
    })
    //获取屏幕宽度，获取自适应单位
    wx.getSystemInfo({
      success: function (res) {
        rpx = res.windowWidth / 375;
      },
    })
    this.getMssage()
  },

  /**
  * 画progress底部背景
  */
  drawProgressbg: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    // 设置圆环的宽度
    ctx.setLineWidth(4);
    // 设置圆环的颜色
    ctx.setStrokeStyle('#DDDDDD');
    // 设置圆环端点的形状
    ctx.setLineCap('round')
    //开始一个新的路径
    ctx.beginPath();
    //设置一个原点(110,110)，半径为80的圆的路径到当前路径
    ctx.arc(85 * rpx, 85 * rpx, 70*rpx, 0, 2 * Math.PI, false);
    //对当前路径进行描边
    ctx.stroke();
    //开始绘制
    ctx.draw();
  },

  /**
   * 画progress进度
   */
  drawCircle: function (step) {
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('canvasProgress');
    // 设置圆环的宽度
    context.setLineWidth(8);
    // 设置圆环的颜色
    context.setStrokeStyle('#4BD0A7');
    // 设置圆环端点的形状
    context.setLineCap('round')
    //开始一个新的路径
    context.beginPath();
    //参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(85 * rpx, 85 * rpx, 70*rpx, -Math.PI / 2, (this.data.accuracy/100) * 2 * Math.PI - Math.PI / 2, false);
    //对当前路径进行描边
    context.stroke();
    //开始绘制
    context.draw()
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