// pages/explain/explain.js
var common = require("../../utils/util.js");
var time = 0;
var touchDot = 0;
var interval = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    title: '',
    sr_id: '',
    su_id: '',
    eb_id: '',
    count: '',
    su_question: '',
    su_A: '',
    su_B: '',
    su_C: '',
    su_D: '',
    su_answer: '',
    srd_answer: '',
    su_parsing: '',
    su_role: '',
    options1: '../../image/options_a.png',
    options2: '../../image/options_b.png',
    options3: '../../image/options_c.png',
    options4: '../../image/options_d.png',
    su_type: ''
  },

  //获取题的解析
  getparsing:function(order){
    var that = this
    common.ajax({
      url: 'Home/Question/getMistakesDetail',
      loading: '加载中......',
      userinfo: true,
      data: {
        sr_id: that.data.sr_id,
        su_id: that.data.su_id,
        order: order
      },
      success:res=>{
        that.setData({
          count: res.result.count,
          su_question: res.result.list.su_question,
          su_A: res.result.list.su_A,
          su_B: res.result.list.su_B,
          su_C: res.result.list.su_C,
          su_D: res.result.list.su_D,
          su_id: res.result.list.su_id,
          su_answer: res.result.list.su_answer,//正确答案
          srd_answer: res.result.list.srd_answer,//用户答案
          su_parsing: res.result.list.su_parsing,
          su_role: res.result.list.su_role,
          su_type: res.result.list.su_type
        })
        if (res.result.list.su_answer.indexOf("A") != -1) {
          that.setData({
            options1: '../../image/options_a_active.png'
          })
        }
        if (res.result.list.su_answer.indexOf("B") > -1) {
          that.setData({
            options2: '../../image/options_b_active.png'
          })
        }
        if (res.result.list.su_answer.indexOf("C") > -1) {
          that.setData({
            options3: '../../image/options_c_active.png'
          })
        }
        if (res.result.list.su_answer.indexOf("D") > -1) {
          that.setData({
            options4: '../../image/options_d_active.png'
          })
        }
        if (that.data.su_role == '单选题') {
          if (that.data.srd_answer[0] == that.data.su_answer[0]) {
            if (that.data.srd_answer[0] == "A") {
              that.setData({
                options1: '../../image/correct.png'
              })
            }
            if (that.data.srd_answer[0] == "B") {
              that.setData({
                options2: '../../image/correct.png'
              })
            }
            if (that.data.srd_answer[0] == "C") {
              that.setData({
                options3: '../../image/correct.png'
              })
            }
            if (that.data.srd_answer[0] == "D") {
              that.setData({
                options4: '../../image/correct.png'
              })
            }
          } else {
            if (that.data.srd_answer[0] == "A") {
              that.setData({
                options1: '../../image/fault.png'
              })
            }
            if (that.data.srd_answer[0] == "B") {
              that.setData({
                options2: '../../image/fault.png'
              })
            }
            if (that.data.srd_answer[0] == "C") {
              that.setData({
                options3: '../../image/fault.png'
              })
            }
            if (that.data.srd_answer[0] == "D") {
              that.setData({
                options4: '../../image/fault.png'
              })
            }
          }
        }
        if (that.data.su_role == '多选题') {
          console.log("多选题")
          var arr1 = []
          for (var i in that.data.srd_answer) {
            if (that.data.su_answer.indexOf(that.data.srd_answer[i]) > -1) {
              arr1.push(that.data.srd_answer[i])
              if (that.data.srd_answer[i] == "A") {
                that.setData({
                  options1: '../../image/correct.png'
                })
              }
              if (that.data.srd_answer[i] == "B") {
                that.setData({
                  options2: '../../image/correct.png'
                })
              }
              if (that.data.srd_answer[i] == "C") {
                that.setData({
                  options3: '../../image/correct.png'
                })
              }
              if (that.data.srd_answer[i] == "D") {
                that.setData({
                  options4: '../../image/correct.png'
                })
              }
            }
          }
          for (var i in that.data.srd_answer) {
            if (arr1.indexOf(that.data.srd_answer[i]) == -1) {
              if (that.data.srd_answer[i] == "A") {
                that.setData({
                  options1: '../../image/fault.png'
                })
              }
              if (that.data.srd_answer[i] == "B") {
                that.setData({
                  options2: '../../image/fault.png'
                })
              }
              if (that.data.srd_answer[i] == "C") {
                that.setData({
                  options3: '../../image/fault.png'
                })
              }
              if (that.data.srd_answer[i] == "D") {
                that.setData({
                  options4: '../../image/fault.png'
                })
              }
            }
          }
        }
      }
    })
  },
  //获取错题
  getMistakes:function(order){
    var that = this
    common.ajax({
      url: 'Home/Question/getCardErrorBookDetail',
      loading: '加载中......',
      userinfo: true,
      data: {
        sr_id: that.data.sr_id,
        eb_id: that.data.eb_id,
        order: order
      },
      success:res=>{
        if(res.result.count != '0'){
          that.setData({
            count: res.result.count,
            eb_id: res.result.list.eb_id,
            su_question: res.result.list.su_question,
            su_A: res.result.list.su_A,
            su_B: res.result.list.su_B,
            su_C: res.result.list.su_C,
            su_D: res.result.list.su_D,
            su_answer: res.result.list.su_answer,
            srd_answer: res.result.list.srd_answer,
            su_parsing: res.result.list.su_parsing,
            su_role: res.result.list.su_role,
            su_id: res.result.list.su_id,
            su_type: res.result.list.su_type
          })
          if (res.result.list.su_answer.indexOf("A") > -1) {
            that.setData({
              options1: '../../image/options_a_active.png'
            })
          }
          if (res.result.list.su_answer.indexOf("B") > -1) {
            that.setData({
              options2: '../../image/options_b_active.png'
            })
          }
          if (res.result.list.su_answer.indexOf("C") > -1) {
            that.setData({
              options3: '../../image/options_c_active.png'
            })
          }
          if (res.result.list.su_answer.indexOf("D") > -1) {
            that.setData({
              options4: '../../image/options_d_active.png'
            })
          }
        }else{
          wx.showToast({
            title: '恭喜您，您的答题全部正确！',
            icon: 'none',
            duration: 3000
          })
        }
        if (that.data.su_role == '单选题') {
          if (that.data.srd_answer[0] == that.data.su_answer[0]) {
            if (that.data.srd_answer[0] == "A") {
              that.setData({
                options1: '../../image/correct.png'
              })
            }
            if (that.data.srd_answer[0] == "B") {
              that.setData({
                options2: '../../image/correct.png'
              })
            }
            if (that.data.srd_answer[0] == "C") {
              that.setData({
                options3: '../../image/correct.png'
              })
            }
            if (that.data.srd_answer[0] == "D") {
              that.setData({
                options4: '../../image/correct.png'
              })
            }
          } else {
            if (that.data.srd_answer[0] == "A") {
              that.setData({
                options1: '../../image/fault.png'
              })
            }
            if (that.data.srd_answer[0] == "B") {
              that.setData({
                options2: '../../image/fault.png'
              })
            }
            if (that.data.srd_answer[0] == "C") {
              that.setData({
                options3: '../../image/fault.png'
              })
            }
            if (that.data.srd_answer[0] == "D") {
              that.setData({
                options4: '../../image/fault.png'
              })
            }
          }
        }
        if (that.data.su_role == '多选题') {
          var arr1 = []
          for (var i in that.data.srd_answer) {
            if (that.data.su_answer.indexOf(that.data.srd_answer[i]) > -1) {
              arr1.push(that.data.srd_answer[i])
              if (that.data.srd_answer[i] == "A") {
                that.setData({
                  options1: '../../image/correct.png'
                })
              }
              if (that.data.srd_answer[i] == "B") {
                that.setData({
                  options2: '../../image/correct.png'
                })
              }
              if (that.data.srd_answer[i] == "C") {
                that.setData({
                  options3: '../../image/correct.png'
                })
              }
              if (that.data.srd_answer[i] == "D") {
                that.setData({
                  options4: '../../image/correct.png'
                })
              }
            }
          }
          for (var i in that.data.srd_answer) {
            if (arr1.indexOf(that.data.srd_answer[i]) == -1) {
              if (that.data.srd_answer[i] == "A") {
                that.setData({
                  options1: '../../image/fault.png'
                })
              }
              if (that.data.srd_answer[i] == "B") {
                that.setData({
                  options2: '../../image/fault.png'
                })
              }
              if (that.data.srd_answer[i] == "C") {
                that.setData({
                  options3: '../../image/fault.png'
                })
              }
              if (that.data.srd_answer[i] == "D") {
                that.setData({
                  options4: '../../image/fault.png'
                })
              }
            }
          }
        }
      }
    })
  },
  //回到首页
  error:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  explain:function(){
    var that = this
    if(that.data.su_type == '历年真题'){
      wx.redirectTo({
        url: '../exams/exams',
      })
    }else{
      wx.redirectTo({
        url: '../mockExam/mockExam',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var message = wx.getStorageSync('CheckTheParsing')
    var that = this
    that.setData({
      sr_id: message.sr_id,
      title: message.title
    })
    wx.setNavigationBarTitle({
      title: that.data.title
    })
    if (that.data.title == '查看错题'){
      that.getMistakes("")
    }else{
      that.getparsing("")
    }
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
      if (that.data.index < that.data.count){
        that.setData({
          index: ++that.data.index,
          options1: '../../image/options_a.png',
          options2: '../../image/options_b.png',
          options3: '../../image/options_c.png',
          options4: '../../image/options_d.png',
        })
        if (that.data.title == '查看错题') {
          that.getMistakes("下一个")
        } else {
          that.getparsing("下一个")
        }
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
          options1: '../../image/options_a.png',
          options2: '../../image/options_b.png',
          options3: '../../image/options_c.png',
          options4: '../../image/options_d.png',
        })
        if (that.data.title == '查看错题') {
          that.getMistakes("上一个")
        } else {
          that.getparsing("上一个")
        }
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