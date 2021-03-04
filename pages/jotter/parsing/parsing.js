// pages/jotter/parsing/parsing.js
var common = require("../../../utils/util.js");
var time = 0;
var touchDot = 0;
var interval = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    eb_id: '',
    cate_id: '',
    count: '',
    su_question: '',
    su_A: '',
    su_B: '',
    su_C: '',
    su_D: '',
    su_answer: '',
    eb_answer: '',
    su_role: '',
    options1: '../../../image/options_a.png',
    options2: '../../../image/options_b.png',
    options3: '../../../image/options_c.png',
    options4: '../../../image/options_d.png'
  },

  //获取题的解析
  getparsing: function (order) {
    var that = this
    common.ajax({
      url: 'Home/Question/getErrorBookParsing',
      loading: '加载中......',
      userinfo: true,
      data: {
        cate_id: that.data.cate_id,
        eb_id: that.data.eb_id,
        order: order
      },
      success: res => {
        that.setData({
          count: res.result.count,
          su_question: res.result.list.su_question,
          su_A: res.result.list.su_A,
          su_B: res.result.list.su_B,
          su_C: res.result.list.su_C,
          su_D: res.result.list.su_D,
          su_id: res.result.list.su_id,
          su_answer: res.result.list.su_answer,//正确答案
          eb_answer: res.result.list.eb_answer,//用户答案
          su_role: res.result.list.su_role,
          eb_id: res.result.list.eb_id
        })
        if (res.result.list.su_answer.indexOf("A") != -1) {
          that.setData({
            options1: '../../../image/options_a_active.png'
          })
        }
        if (res.result.list.su_answer.indexOf("B") > -1) {
          that.setData({
            options2: '../../../image/options_b_active.png'
          })
        }
        if (res.result.list.su_answer.indexOf("C") > -1) {
          that.setData({
            options3: '../../../image/options_c_active.png'
          })
        }
        if (res.result.list.su_answer.indexOf("D") > -1) {
          that.setData({
            options4: '../../../image/options_d_active.png'
          })
        }
        if (that.data.su_role == '单选题') {
          if (that.data.eb_answer[0] == that.data.su_answer[0]) {
            if (that.data.eb_answer[0] == "A") {
              that.setData({
                options1: '../../../image/correct.png'
              })
            }
            if (that.data.eb_answer[0] == "B") {
              that.setData({
                options2: '../../../image/correct.png'
              })
            }
            if (that.data.eb_answer[0] == "C") {
              that.setData({
                options3: '../../../image/correct.png'
              })
            }
            if (that.data.eb_answer[0] == "D") {
              that.setData({
                options4: '../../../image/correct.png'
              })
            }
          } else {
            if (that.data.eb_answer[0] == "A") {
              that.setData({
                options1: '../../../image/fault.png'
              })
            }
            if (that.data.eb_answer[0] == "B") {
              that.setData({
                options2: '../../../image/fault.png'
              })
            }
            if (that.data.eb_answer[0] == "C") {
              that.setData({
                options3: '../../../image/fault.png'
              })
            }
            if (that.data.eb_answer[0] == "D") {
              that.setData({
                options4: '../../../image/fault.png'
              })
            }
          }
        }
        if (that.data.su_role == '多选题') {
          console.log("多选题")
          var arr1 = []
          for (var i in that.data.eb_answer) {
            if (that.data.su_answer.indexOf(that.data.eb_answer[i]) > -1) {
              arr1.push(that.data.eb_answer[i])
              if (that.data.eb_answer[i] == "A") {
                that.setData({
                  options1: '../../../image/correct.png'
                })
              }
              if (that.data.eb_answer[i] == "B") {
                that.setData({
                  options2: '../../../image/correct.png'
                })
              }
              if (that.data.eb_answer[i] == "C") {
                that.setData({
                  options3: '../../../image/correct.png'
                })
              }
              if (that.data.eb_answer[i] == "D") {
                that.setData({
                  options4: '../../../image/correct.png'
                })
              }
            }
          }
          for (var i in that.data.eb_answer) {
            if (arr1.indexOf(that.data.eb_answer[i]) == -1) {
              if (that.data.eb_answer[i] == "A") {
                that.setData({
                  options1: '../../../image/fault.png'
                })
              }
              if (that.data.eb_answer[i] == "B") {
                that.setData({
                  options2: '../../../image/fault.png'
                })
              }
              if (that.data.eb_answer[i] == "C") {
                that.setData({
                  options3: '../../../image/fault.png'
                })
              }
              if (that.data.eb_answer[i] == "D") {
                that.setData({
                  options4: '../../../image/fault.png'
                })
              }
            }
          }
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
      cate_id: options.cate_id
    })
    that.getparsing("")
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
    clearInterval(interval);
    time = 0;
  },


  // 触摸开始事件
  touchStart: function (e) {
    touchDot = e.touches[0].pageX;
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸结束事件
  touchEnd: function (e) {
    var touchMove = e.changedTouches[0].pageX;
    var that = this
    // 向左滑动   
    if (touchMove - touchDot <= -40 && time < 10) {
      if (that.data.index < that.data.count) {
        that.setData({
          index: ++that.data.index,
          options1: '../../../image/options_a.png',
          options2: '../../../image/options_b.png',
          options3: '../../../image/options_c.png',
          options4: '../../../image/options_d.png',
        })
        that.getparsing("下一个")
      } else {
        wx.showToast({
          title: '恭喜您看完这套题了',
          icon: 'none',
          duration: 2000
        })
      }
    }
    // 向右滑动  
    if (touchMove - touchDot >= 40 && time < 10) {
      if (that.data.index != '1') {
        that.setData({
          index: --that.data.index,
          options1: '../../../image/options_a.png',
          options2: '../../../image/options_b.png',
          options3: '../../../image/options_c.png',
          options4: '../../../image/options_d.png',
        })
        that.getparsing("上一个")
      } else {
        wx.showToast({
          title: '已经是第一题！',
          icon: 'none',
          duration: 2000
        })
      }
    }
    clearInterval(interval);
    time = 0;
  },
  //退出
  exit:function(){
    wx.switchTab({
      url: '../../index/index',
    })
  },
  //继续练习
  continue: function () {
    wx.redirectTo({
      url: '../../mistakes/mistakes',
    })
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