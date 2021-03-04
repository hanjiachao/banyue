// pages/allQuestions/allQuestions.js
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
    ca_id: '',
    type: '',
    count: '',
    role: '',
    su_question: '',
    su_A: '',
    su_B: '',
    su_C: '',
    su_D: '',
    su_id: '',
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
    ca_time: '',
    score: '',
    sr_id: '',
    hour: '',
    timer: '',
    collect: '',
    share_image: '',
    share_text: '',
    prompt: true,
    user_answer: ''
  },

  //获取第一道题
  getquestionFirst: function () {
    var that = this
    common.ajax({
      url: 'Home/Question/getQuestionDetail',
      userinfo: true,
      loading: '加载中......',
      data: {
        cate_id: that.data.ca_id
      },
      success: res => {
        that.setData({
          collect: res.result.list.collect,
          count: res.result.count,
          role: res.result.list.su_role,
          su_question: res.result.list.su_question,
          su_A: res.result.list.su_A,
          su_B: res.result.list.su_B,
          su_C: res.result.list.su_C,
          su_D: res.result.list.su_D,
          su_id: res.result.list.su_id,
          sr_id: res.result.sr_id,
          share_image: res.result.share_image,
          share_text: res.result.share_text
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
  getmessage:function(e){
    this.setData({
      answer: e.detail.value
    })
  },
  //计时器（倒计时）
  clock: function () {
    var that = this;
    var m, s;
    var time = that.data.hour
    timing = setInterval(function () {
      time = ++time
      m = Math.floor(time / 60);
      s = time % 60;
      s = (s >= 10) ? s : '0' + s;
      that.setData({
        timer: m + ':' + s,
        hour: time
      })
    }, 1000);
  },
  //查看解析
  parsing:function(){
    wx.navigateTo({
      url: '../../parsing/parsing?answer=' + this.data.answer + '&su_id=' + this.data.su_id + '&index=' + this.data.index,
    })
  },
  //查看答题卡
  checkTheAnswerSheet:function(){
    var that = this
    common.ajax({
      url: 'Home/Question/returnGrade',
      userinfo: true,
      loading: '加载中......',
      data: {
        su_id: that.data.su_id,
        answer: that.data.answer,
        score: that.data.score,
        sr_id: that.data.sr_id
      },
      success: res => {
        wx.navigateTo({
          url: '../../sheet/sheet?sr_id=' + that.data.sr_id + '&time=' + that.data.hour,
        })
      }
    })
  },
  //收藏按钮
  collection:function(e){
    console.log(this.data.su_id)
    var that = this
    if (e.currentTarget.dataset.collect == "未收藏"){
      common.ajax({
        url: 'Home/Question/collectionSubject',
        loading: '加载中......',
        userinfo: true,
        data: {
          su_id: that.data.su_id
        },
        success:res=>{
          if (res.errorCode == '0'){
            wx.showToast({
              title: '恭喜您收藏成功！',
              icon: 'success',
              duration: 3000
            })
            that.setData({
              collect: "已收藏"
            })
          }else{
            wx.showToast({
              title: '收藏失败，请重新收藏!',
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
    }else{
      common.ajax({
        url: 'Home/Question/delCollectionSubject',
        loading: '加载中......',
        userinfo: true,
        data: {
          su_id: that.data.su_id
        },
        success:res=>{
          if (res.errorCode == '0') {
            wx.showToast({
              title: '恭喜您取消成功！',
              icon: 'success',
              duration: 3000
            })
            that.setData({
              collect: "未收藏"
            })
          } else {
            wx.showToast({
              title: '取消失败，请重新操作!',
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var answer = wx.getStorageSync('answer');
    var that = this
    that.setData({
      ca_id: answer[0],
      type: answer[1]
    })
    that.getquestionFirst()
    setTimeout(function(){
      that.setData({
        prompt: false
      })
    },2000)
  },
  examine:function(){
    wx.navigateTo({
      url: '../result/result?answer=' + this.data.answer + '&su_id=' + this.data.su_id + '&index=' + this.data.index,
    })
    clear (timing);
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
    this.clock()
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
    that.setData({
      score: wx.getStorageSync('score')
    })
    // 下一道题  
    if (touchMove - touchDot <= -40 && time < 10) {
      if(that.data.index < that.data.count){
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
          url: 'Home/Question/returnGrade',
          userinfo: true,
          loading: '加载中......',
          data: {
            su_id: that.data.su_id,
            answer: that.data.answer,
            score: that.data.score,
            sr_id: that.data.sr_id
          },
          success: res => {
            wx.setStorageSync('score', '')
            that.setData({
              collect: res.result.list.collect,
              sr_id: res.result.sr_id,
              su_id: res.result.list.su_id,
              role: res.result.list.su_role,
              su_question: res.result.list.su_question,
              su_A: res.result.list.su_A,
              su_B: res.result.list.su_B,
              su_C: res.result.list.su_C,
              su_D: res.result.list.su_D,
              answer: '',
              share_image: res.result.share_image,
              share_text: res.result.share_text,
              user_answer: res.result.list.user_answer
            })
            if (res.result.list.su_role == '单选题') {
              if (that.data.user_answer[0] == 'A') {
                that.setData({
                  options1: '../../../image/options_a_active.png'
                })
              } else if (that.data.user_answer[0] == 'B') {
                that.setData({
                  options2: '../../../image/options_b_active.png'
                })
              } else if (that.data.user_answer[0] == 'C') {
                that.setData({
                  options3: '../../../image/options_c_active.png'
                })
              } else if (that.data.user_answer[0] == 'D') {
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
              if (that.data.user_answer.indexOf('A') != -1) {
                that.setData({
                  flagA: true,
                  options1: '../../../image/options_a_active.png'
                })
              }
              if (that.data.user_answer.indexOf('B') != -1) {
                that.setData({
                  flagB: true,
                  options2: '../../../image/options_b_active.png'
                })
              }
              if (that.data.user_answer.indexOf('C') != -1) {
                that.setData({
                  flagC: true,
                  options3: '../../../image/options_c_active.png'
                })
              }
              if (that.data.user_answer.indexOf('D') != -1) {
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
                answer: that.data.user_answer
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
      } else if (that.data.index == that.data.count){
        common.ajax({
          url: 'Home/Question/returnGrade',
          userinfo: true,
          loading: '加载中......',
          data: {
            su_id: that.data.su_id,
            answer: that.data.answer,
            score: that.data.score,
            sr_id: that.data.sr_id
          },
          success:res=>{
            wx.navigateTo({
              url: '../../sheet/sheet?sr_id=' + that.data.sr_id + '&time=' + that.data.hour,
            })
          }
        })
      } else {
        wx.showToast({
          title: '恭喜您已经答完这套题了',
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
          user_answer: ''
        })
        common.ajax({
          url: 'Home/Question/getQuestionDetail',
          userinfo: true,
          loading: '加载中......',
          data: {
            order: '上一个',
            su_id: that.data.su_id,
            sr_id: that.data.sr_id
          },
          success: res => {
            wx.setStorageSync('score', '')
            that.setData({
              collect: res.result.list.collect,
              su_id: res.result.list.su_id,
              role: res.result.list.su_role,
              su_question: res.result.list.su_question,
              su_A: res.result.list.su_A,
              su_B: res.result.list.su_B,
              su_C: res.result.list.su_C,
              su_D: res.result.list.su_D,
              answer: '',
              share_image: res.result.share_image,
              share_text: res.result.share_text,
              user_answer: res.result.list.user_answer
            })
            if (res.result.list.su_role == '单选题') {
              if(that.data.user_answer[0] == 'A'){
                that.setData({
                  options1: '../../../image/options_a_active.png'
                })
              } else if (that.data.user_answer[0] == 'B'){
                that.setData({
                  options2: '../../../image/options_b_active.png'
                })
              } else if (that.data.user_answer[0] == 'C') {
                that.setData({
                  options3: '../../../image/options_c_active.png'
                })
              } else if (that.data.user_answer[0] == 'D') {
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
              if (that.data.user_answer.indexOf('A') != -1) {
                that.setData({
                  flagA: true,
                  options1: '../../../image/options_a_active.png'
                })
              } 
              if (that.data.user_answer.indexOf('B') != -1) {
                that.setData({
                  flagB: true,
                  options2: '../../../image/options_b_active.png'
                })
              }
              if (that.data.user_answer.indexOf('C') != -1) {
                that.setData({
                  flagC: true,
                  options3: '../../../image/options_c_active.png'
                })
              }
              if (that.data.user_answer.indexOf('D') != -1) {
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
                answer: that.data.user_answer
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

  // 分享转发
  forwarding: function () {
    this.setData({
      share: false
    })
    wx.showToast({
      title: '分享成功',
      icon: 'none',
      duration: 3000
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    var share_code = wx.getStorageSync("share_code")
    return {
      title: "半月讲坛",
      imageUrl: that.data.share_image,
      desc: that.data.share_text,
      path: 'pages/exams/exams?share_code=' + share_code,
      success: function (res) {
        console.log('Ablesons111111')
        console.log(res)
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function () {
        wx.showToast({
          title: '转发失败',
        })
      }
    }
  }
})