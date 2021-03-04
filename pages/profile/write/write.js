// pages/profile/write/write.js
var common = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    text: '',
    len: 0,
    info: '',
    sex: '',
    age: '',
    birth: '',
    card_type: '',
    part_time: '',
    education: '',
    academy: '',
    major: '',
    graduate_year: ''
  },
  //提交信息
  setinfo:function(){
    var that = this
    common.ajax({
      url: 'Home/User/getUpdateUserData',
      userinfo: true,
      data: {
        sex: that.data.sex,
        age: '',
        birth: that.data.birth,
        card_type: that.data.card_type,
        part_time: that.data.part_time,
        education: that.data.education,
        academy: that.data.academy,
        major: that.data.major,
        graduate_year: that.data.graduate_year
      },
      success:res=>{
        if (res.result.experience == '0'){
          wx.showToast({
            title: '恭喜您完善信息，获得了积分',
            icon: 'none',
            duration: 3000
          })
        }
        var pages = getCurrentPages();//获取页面栈
        if (pages.length > 1) {
          //上一个页面实例对象
          var prePage = pages[pages.length - 2];
          //调用上一个页面的onShow方法
          prePage.refresh()
        } 
        // wx.redirectTo({
        //   url: '../profileInfo/profileInfo',
        // })
        setTimeout(function(){
          wx.navigateBack()
        },400)
      }
    })
  },
  getinfo:function(e){
    this.setData({
      info: e.detail.value,
      len: e.detail.cursor
    })
  },
  //提交
  submit:function(e){
    var that = this
    if(that.data.id == '0'){
      that.setData({
        sex: that.data.info,
        text: '请输入内容'
      })
      that.setinfo()
    }
    if (that.data.id == '1') {
      that.setData({
        birth: that.data.info,
        text: '格式为：2019-01-01'
      })
      if (/^(\d{4})(-)(\d{2})(-)(\d{2})$/.test(that.data.birth)){
        that.setinfo()
      }else{
        wx.showToast({
          title: '请输入正确的时间格式',
          icon: 'none',
          duration: 3000
        })
      }
    }
    if (that.data.id == '2') {
      that.setData({
        card_type: that.data.info,
        text: '请输入内容'
      })
      that.setinfo()
    }
    // if (that.data.id == '3') {
    //   that.setData({
    //     part_time: that.data.info,
    //     text: '请输入内容'
    //   })
    //   if (that.data.part_time != '') {
    //     that.setinfo()
    //   } else {
    //     wx.showToast({
    //       title: '不能为空',
    //       icon: 'none',
    //       duration: 3000
    //     })
    //   }
    // }
    if (that.data.id == '4') {
      that.setData({
        education: that.data.info,
        text: '请输入内容'
      })
      that.setinfo()
    }
    if (that.data.id == '5') {
      that.setData({
        academy: that.data.info,
        text: '请输入内容'
      })
      if (that.data.academy != '') {
        that.setinfo()
      } else {
        wx.showToast({
          title: '不能为空',
          icon: 'none',
          duration: 3000
        })
      }
    }
    if (that.data.id == '6') {
      that.setData({
        major: that.data.info,
        text: '请输入内容'
      })
      if(that.data.major != ''){
        that.setinfo()
      } else {
        wx.showToast({
          title: '不能为空',
          icon: 'none',
          duration: 3000
        })
      }
    }
    if (that.data.id == '7') {
      that.setData({
        graduate_year: that.data.info,
        text: '格式为：2019'
      })
      if (/^(\d{4})$/.test(that.data.graduate_year)) {
        that.setinfo()
      } else {
        wx.showToast({
          title: '请输入正确的时间格式',
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
    that.setData({
      id: options.id
    })

    if (that.data.id == '0') {
      that.setData({
        text: '请输入内容'
      })
    }
    if (that.data.id == '1') {
      that.setData({
        text: '格式为：2019-01-01'
      })
    }
    if (that.data.id == '2') {
      that.setData({
        text: '请输入内容'
      })
    }
    // if (that.data.id == '3') {
    //   that.setData({
    //     text: '请输入内容'
    //   })
    // }
    if (that.data.id == '4') {
      that.setData({
        text: '请输入内容'
      })
    }
    if (that.data.id == '5') {
      that.setData({
        text: '请输入内容'
      })
    }
    if (that.data.id == '6') {
      that.setData({
        text: '请输入内容'
      })
    }
    if (that.data.id == '7') {
      that.setData({
        text: '格式为：2019'
      })
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