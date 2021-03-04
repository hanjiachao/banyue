// pages/jotter/write/write.js
var common = require("../../../utils/util.js");
var time = 0;
var touchDot = 0;
var interval = "";
var timing = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    cate_id: '',
    eb_id: '',
    count: '',
    role: '',
    su_question: '',
    su_A: '',
    su_B: '',
    su_C: '',
    su_D: '',
    flag1: false,
    flag2: false,
    flag3: false,
    flag4: false,
    flagA: false,
    flagB: false,
    flagC: false,
    flagD: false,
    options1: '../../../image/options_a.png',
    options2: '../../../image/options_b.png',
    options3: '../../../image/options_c.png',
    options4: '../../../image/options_d.png',
    answer: '',
    remove: '',
    er_id: '',
    eb_answer: ''
  },

  //获取第一道题
  getquestionFirst: function () {
    var that = this
    common.ajax({
      url: 'Home/Question/getErrorBookDetail',
      userinfo: true,
      loading: '加载中......',
      data: {
        cate_id: that.data.cate_id,
        eb_id: that.data.eb_id,
        val: '答题'
      },
      success: res => {
        that.setData({
          count: res.result.count,
          role: res.result.list.su_role,
          su_question: res.result.list.su_question,
          su_A: res.result.list.su_A,
          su_B: res.result.list.su_B,
          su_C: res.result.list.su_C,
          su_D: res.result.list.su_D,
          eb_id: res.result.list.eb_id,
        })
        if (res.result.list.su_role == '单选题') {
          that.setData({
            flag1: true,
            flag2: false,
            flag3: false,
            flag4: false
          })
        } else if (res.result.list.su_role == '多选题') {
          that.setData({
            flag1: false,
            flag2: true,
            flag3: false,
            flag4: false
          })
        } else if (res.result.list.su_role == '填空题') {
          that.setData({
            flag1: false,
            flag2: false,
            flag3: true,
            flag4: false
          })
        } else {
          that.setData({
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: true
          })
        }
      }
    })
  },
  //回答
  response: function (e) {
    var that = this
    if (that.data.role == '单选题') {
      var select = e.currentTarget.dataset.select
      if (select == 'A') {
        that.setData({
          options1: '../../../image/options_a_active.png',
          options2: '../../../image/options_b.png',
          options3: '../../../image/options_c.png',
          options4: '../../../image/options_d.png',
        })
      } else if (select == 'B') {
        that.setData({
          options2: '../../../image/options_b_active.png',
          options1: '../../../image/options_a.png',
          options3: '../../../image/options_c.png',
          options4: '../../../image/options_d.png',
        })
      } else if (select == 'C') {
        that.setData({
          options3: '../../../image/options_c_active.png',
          options1: '../../../image/options_a.png',
          options2: '../../../image/options_b.png',
          options4: '../../../image/options_d.png',
        })
      } else {
        that.setData({
          options4: '../../../image/options_d_active.png',
          options1: '../../../image/options_a.png',
          options2: '../../../image/options_b.png',
          options3: '../../../image/options_c.png',
        })
      }
      that.setData({
        answer: select
      })
    } else {
      var select = e.currentTarget.dataset.select
      var arr = []
      if (select == 'A') {
        if (!that.data.flagA) {
          that.setData({
            flagA: true,
            options1: '../../../image/options_a_active.png'
          })
        } else {
          that.setData({
            flagA: false,
            options1: '../../../image/options_a.png'
          })
        }
      } else if (select == 'B') {
        if (!that.data.flagB) {
          that.setData({
            flagB: true,
            options2: '../../../image/options_b_active.png'
          })
        } else {
          that.setData({
            flagB: false,
            options2: '../../../image/options_b.png'
          })
        }
      } else if (select == 'C') {
        if (!that.data.flagC) {
          that.setData({
            flagC: true,
            options3: '../../../image/options_c_active.png'
          })
        } else {
          that.setData({
            flagC: false,
            options3: '../../../image/options_c.png'
          })
        }
      } else {
        if (!that.data.flagD) {
          that.setData({
            flagD: true,
            options4: '../../../image/options_d_active.png'
          })
        } else {
          that.setData({
            flagD: false,
            options4: '../../../image/options_d.png'
          })
        }
      }
      if (that.data.flagA) {
        arr.push("A")
      }
      if (that.data.flagB) {
        arr.push("B")
      }
      if (that.data.flagC) {
        arr.push("C")
      }
      if (that.data.flagD) {
        arr.push("D")
      }
      that.setData({
        answer: arr
      })
    }
  },
  //获取填空题答案
  getmessage: function (e) {
    this.setData({
      answer: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      cate_id: options.ca_id,
      remove: options.remove
    })
    that.getquestionFirst()
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
    // 下一道题  
    if (touchMove - touchDot <= -40 && time < 10) {
      if (that.data.index < that.data.count) {
        that.setData({
          index: ++that.data.index,
          options1: '../../../image/options_a.png',
          options2: '../../../image/options_b.png',
          options3: '../../../image/options_c.png',
          options4: '../../../image/options_d.png',
          flagA: false,
          flagB: false,
          flagC: false,
          flagD: false
        })
        common.ajax({
          url: 'Home/Question/errorSubmitAnswer',
          userinfo: true,
          loading: '加载中......',
          data: {
            eb_id: that.data.eb_id,
            answer: that.data.answer,
            is_remove: that.data.remove,
            er_id: that.data.er_id
          },
          success: res => {
            that.setData({
              count: res.result.count,
              role: res.result.list.su_role,
              su_question: res.result.list.su_question,
              su_A: res.result.list.su_A,
              su_B: res.result.list.su_B,
              su_C: res.result.list.su_C,
              su_D: res.result.list.su_D,
              eb_id: res.result.list.eb_id,
              er_id: res.result.er_id,
              answer: '',
              eb_answer: res.result.list.eb_answer
            })
            if (res.result.list.su_role == '单选题') {
              if (that.data.eb_answer[0] == 'A') {
                that.setData({
                  options1: '../../../image/options_a_active.png'
                })
              } else if (that.data.eb_answer[0] == 'B') {
                that.setData({
                  options2: '../../../image/options_b_active.png'
                })
              } else if (that.data.eb_answer[0] == 'C') {
                that.setData({
                  options3: '../../../image/options_c_active.png'
                })
              } else if (that.data.eb_answer[0] == 'D') {
                that.setData({
                  options4: '../../../image/options_d_active.png'
                })
              }
              that.setData({
                flag1: true,
                flag2: false,
                flag3: false,
                flag4: false
              })
            } else if (res.result.list.su_role == '多选题') {
              if (that.data.eb_answer.indexOf('A') != -1) {
                that.setData({
                  flagA: true,
                  options1: '../../../image/options_a_active.png'
                })
              }
              if (that.data.eb_answer.indexOf('B') != -1) {
                that.setData({
                  flagB: true,
                  options2: '../../../image/options_b_active.png'
                })
              }
              if (that.data.eb_answer.indexOf('C') != -1) {
                that.setData({
                  flagC: true,
                  options3: '../../../image/options_c_active.png'
                })
              }
              if (that.data.eb_answer.indexOf('D') != -1) {
                that.setData({
                  flagD: true,
                  options4: '../../../image/options_d_active.png'
                })
              }
              that.setData({
                flag1: false,
                flag2: true,
                flag3: false,
                flag4: false
              })
            } else if (res.result.list.su_role == '填空题') {
              that.setData({
                flag1: false,
                flag2: false,
                flag3: true,
                flag4: false,
                answer: that.data.eb_answer
              })
            } else {
              that.setData({
                flag1: false,
                flag2: false,
                flag3: false,
                flag4: true
              })
            }
          }
        })
      } else if (that.data.index == that.data.count) {
        common.ajax({
          url: 'Home/Question/errorSubmitAnswer',
          userinfo: true,
          loading: '加载中......',
          data: {
            eb_id: that.data.eb_id,
            answer: that.data.answer,
            is_remove: that.data.remove,
            er_id: that.data.er_id
          },
          success: res => {
            wx.redirectTo({
              url: '../look/look?er_id=' + res.result.er_id,
            })
          }
        })
      } else {
        wx.showToast({
          title: '恭喜您已经答完这套错题了',
          icon: 'none',
          duration: 2000
        })
      }
    }
    // 上一道题  
    if (touchMove - touchDot >= 40 && time < 10) {
      if (that.data.index != '1') {
        that.setData({
          index: --that.data.index,
          options1: '../../../image/options_a.png',
          options2: '../../../image/options_b.png',
          options3: '../../../image/options_c.png',
          options4: '../../../image/options_d.png',
          flagA: false,
          flagB: false,
          flagC: false,
          flagD: false,
          eb_answer: ''
        })
        common.ajax({
          url: 'Home/Question/getErrorBookDetail',
          userinfo: true,
          loading: '加载中......',
          data: {
            order: '上一个',
            cate_id: that.data.cate_id,
            eb_id: that.data.eb_id
          },
          success: res => {
            that.setData({
              count: res.result.count,
              role: res.result.list.su_role,
              su_question: res.result.list.su_question,
              su_A: res.result.list.su_A,
              su_B: res.result.list.su_B,
              su_C: res.result.list.su_C,
              su_D: res.result.list.su_D,
              eb_id: res.result.list.eb_id,
              answer: '',
              eb_answer: res.result.list.eb_answer
            })
            if (res.result.list.su_role == '单选题') {
              if (that.data.eb_answer[0] == 'A') {
                that.setData({
                  options1: '../../../image/options_a_active.png'
                })
              } else if (that.data.eb_answer[0] == 'B') {
                that.setData({
                  options2: '../../../image/options_b_active.png'
                })
              } else if (that.data.eb_answer[0] == 'C') {
                that.setData({
                  options3: '../../../image/options_c_active.png'
                })
              } else if (that.data.eb_answer[0] == 'D') {
                that.setData({
                  options4: '../../../image/options_d_active.png'
                })
              }
              that.setData({
                flag1: true,
                flag2: false,
                flag3: false,
                flag4: false
              })
            } else if (res.result.list.su_role == '多选题') {
              if (that.data.eb_answer.indexOf('A') != -1) {
                that.setData({
                  flagA: true,
                  options1: '../../../image/options_a_active.png'
                })
              }
              if (that.data.eb_answer.indexOf('B') != -1) {
                that.setData({
                  flagB: true,
                  options2: '../../../image/options_b_active.png'
                })
              }
              if (that.data.eb_answer.indexOf('C') != -1) {
                that.setData({
                  flagC: true,
                  options3: '../../../image/options_c_active.png'
                })
              }
              if (that.data.eb_answer.indexOf('D') != -1) {
                that.setData({
                  flagD: true,
                  options4: '../../../image/options_d_active.png'
                })
              }
              that.setData({
                flag1: false,
                flag2: true,
                flag3: false,
                flag4: false
              })
            } else if (res.result.list.su_role == '填空题') {
              that.setData({
                flag1: false,
                flag2: false,
                flag3: true,
                flag4: false,
                answer: that.data.eb_answer
              })
            } else {
              that.setData({
                flag1: false,
                flag2: false,
                flag3: false,
                flag4: true
              })
            }
          }
        })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})