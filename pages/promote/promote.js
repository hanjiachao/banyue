// pages/promote/promote.js
var common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share_friend_image: '',
    share_image: '',
    share_text: '',
    inviteCode: '',
    sh_qrcode: '',
    inviteCode: ''
  },
  getMessage:function(){
    var that = this
    common.ajax({
      url: 'Home/User/getUserShareData',
      userinfo: true,
      loading: '加载中......',
      success:res=>{
        console.log(res)
        that.setData({
          share_friend_image: res.result.share_friend_image,
          share_image: res.result.share_image,
          share_text: res.result.share_text,
          inviteCode: res.result.list.inviteCode,
          sh_qrcode: res.result.list.sh_qrcode,
          inviteCode: res.result.list.inviteCode
        })
      }
    })
  },
  //分享到朋友圈 下载图片
  friends: function () {
    var that = this
    wx.downloadFile({
      url: that.data.share_friend_image,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权")
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          },
          complete(res) {
            console.log(res);
          }
        })
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.sh_qrcode.split(',')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getMessage()
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
      path: 'pages/authorize/authorize?share_code=' + this.data.inviteCode + '&share_code=' + share_code,
      success: function (res) {
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