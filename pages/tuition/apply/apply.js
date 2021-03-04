// pages/tuition/apply/apply.js
var common = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    age: '',
    major: '',
    academy: '',
    dateValue: '',
    phone: '',
    profession: '',
    servant: '',
    teacher: '',
    sh_id: '',
    items1: [
      { name: '是', value: '是' },
      { name: '否', value: '否' }
    ],
    items2: [
      { name: '是', value: '是' },
      { name: '否', value: '否' }
    ],
    flag: true
  },
  //获取姓名
  getName:function(e){
    var that = this
    that.setData({
      name: e.detail.value
    })
  },
  //获取年龄
  getAge: function (e) {
    var that = this
    that.setData({
      age: e.detail.value
    })
  },
  //获取专业
  getMajor: function (e) {
    var that = this
    that.setData({
      major: e.detail.value
    })
  },
  //获取毕业院校
  getacademy: function (e) {
    var that = this
    that.setData({
      academy: e.detail.value
    })
  },
  //获取毕业时间
  gettimer: function (e) {
    var that = this
    that.setData({
      dateValue: e.detail.value
    })
  },
  //获取电话
  getPhone: function (e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
  },
  //获取职业
  profession: function (e) {
    var that = this
    that.setData({
      profession: e.detail.value
    })
  },
  //公考
  radioChange1: function (e) {
    var that = this
    that.setData({
      servant: e.detail.value
    })
  },
  //教师
  radioChange2: function (e) {
    var that = this
    that.setData({
      teacher: e.detail.value
    })
  },
  submit:function () {
    var that = this
    if (that.data.name != '' && that.data.age != '' && that.data.major != '' && that.data.academy != '' && that.data.dateValue != '' && common.is_mobile(that.data.phone) && that.data.profession != '' && that.data.servant != '' && that.data.teacher != ''){
      common.ajax({
        url: 'Home/User/applyShareCode',
        userinfo: true,
        data: {
          name: that.data.name,
          age: that.data.age,
          major: that.data.major,
          graduate_school : that.data.academy,
          graduate_time: that.data.dateValue,
          tel: that.data.phone,
          work: that.data.profession,
          is_teacher: that.data.teacher,
          is_servant: that.data.servant,
          sh_id: that.data.sh_id,
        },
        success: function (res) {
          if (res.status == 'ERROR') {
            wx.showToast({
              title: res.result.msg,
              icon: 'none',
              duration: 3000
            })
          } else {
            that.setData({
              flag: false
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '请输入正确信息',
        icon: 'none',
        duration: 3000
      })
    }
  },
  hide:function () {
    this.setData({
      flag:true
    })
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    if(options.sh_id){
      that.setData({
        sh_id: options.sh_id
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