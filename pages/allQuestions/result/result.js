// pages/allQuestions/result/result.js
var common = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer: '',
    index: '',
    su_id: '',
    su_question: '',
    su_A: '',
    su_B: '',
    su_C: '',
    su_D: '',
    su_role: '',
    su_answer: '',
    su_parsing: '',
    options1: '../../../image/options_a.png',
    options2: '../../../image/options_b.png',
    options3: '../../../image/options_c.png',
    options4: '../../../image/options_d.png'
  },
  
  //获取答案信息
  getanswer:function(){
    var that = this
    common.ajax({
      url: 'Home/Question/getQuestionAnswer',
      userinfo: true,
      loading: '加载中......',
      data: {
        su_id: that.data.su_id
      },
      success:res=>{
        that.setData({
          count: res.result.count,
          su_question: res.result.list.su_question,
          su_A: res.result.list.su_A,
          su_B: res.result.list.su_B,
          su_C: res.result.list.su_C,
          su_D: res.result.list.su_D,
          su_role: res.result.list.su_role,
          su_answer: res.result.list.su_answer,
          su_parsing: res.result.list.su_parsing
        })
        if (res.result.list.su_answer.indexOf("A") > -1) {
          that.setData({
            options1: '../../../image/options_a_active.png'
          })
        }
        if (res.result.list.su_answer.indexOf("B") > -1){
          that.setData({
            options2: '../../../image/options_b_active.png'
          })
        }
        if (res.result.list.su_answer.indexOf("C") > -1) {
          that.setData({
            options3: '../../../image/options_c_active.png'
          })
        }
        if (res.result.list.su_answer.indexOf("D") > -1){
          that.setData({
            options4: '../../../image/options_d_active.png'
          })
        }
        if(that.data.su_role == '单选题'){
          console.log(that.data.su_answer)
          console.log(that.data.answer)
          if (that.data.answer[0] == that.data.su_answer[0]){
            if (that.data.answer[0] == "A") {
              that.setData({
                options1: '../../../image/correct.png'
              })
            }
            if (that.data.answer[0] == "B") {
              that.setData({
                options2: '../../../image/correct.png'
              })
            }
            if (that.data.answer[0] == "C") {
              that.setData({
                options3: '../../../image/correct.png'
              })
            }
            if (that.data.answer[0] == "D") {
              that.setData({
                options4: '../../../image/correct.png'
              })
            }
          }else{
            if (that.data.answer[0] == "A") {
              that.setData({
                options1: '../../../image/fault.png'
              })
            }
            if (that.data.answer[0] == "B") {
              that.setData({
                options2: '../../../image/fault.png'
              })
            }
            if (that.data.answer[0] == "C") {
              that.setData({
                options3: '../../../image/fault.png'
              })
            }
            if (that.data.answer[0] == "D") {
              that.setData({
                options4: '../../../image/fault.png'
              })
            }
          }
        }
        if (that.data.su_role == '多选题'){
          var arr1 = []
          for(var i in that.data.answer){
            if(that.data.su_answer.indexOf(that.data.answer[i]) > -1){
              arr1.push(that.data.answer[i])
              if (that.data.answer[i] == "A"){
                that.setData({
                  options1: '../../../image/correct.png'
                })
              }
              if (that.data.answer[i] == "B") {
                that.setData({
                  options2: '../../../image/correct.png'
                })
              }
              if (that.data.answer[i] == "C") {
                that.setData({
                  options3: '../../../image/correct.png'
                })
              }
              if (that.data.answer[i] == "D") {
                that.setData({
                  options4: '../../../image/correct.png'
                })
              }
            }
          }
          for (var i in that.data.answer){
            if (arr1.indexOf(that.data.answer[i]) == -1){
              if (that.data.answer[i] == "A") {
                that.setData({
                  options1: '../../../image/fault.png'
                })
              }
              if (that.data.answer[i] == "B") {
                that.setData({
                  options2: '../../../image/fault.png'
                })
              }
              if (that.data.answer[i] == "C") {
                that.setData({
                  options3: '../../../image/fault.png'
                })
              }
              if (that.data.answer[i] == "D") {
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
      answer: options.answer.split(','),
      index: options.index,
      su_id: options.su_id
    })
    that.getanswer()
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