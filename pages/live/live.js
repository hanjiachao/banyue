// pages/live/live.js
var common = require("../../utils/util.js");
const polyv = require('../../utils/polyv.js');
var WxParse = require('../../wxParse/wxParse.js');
var study_duration = 0, timers
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    flag: true,
    currentTab: 1,
    isPlayingMusic: false,
    v_id: '',
    timer: '',
    videoSrc: '',
    v_name: '',
    pay_status: '',
    v_type: '',
    v_cover: '',
    v_vid: '',
    v_validity: '',
    show_time: 0,
    next_count: '',
    next_status: '',
    next_list: '',
    vidList: [],
    pages: 0,
    index: '',
    study_duration: '',
    palyFlag: false,
    isIos: '',
	speedList: ['1.0','1.2','1.5','2.0'],
	speed: '',
	refresh: true,
	goNext: true,
	showSpeed: false,
	isFirst: true
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  displaySpeed: function (e){
	  this.setData({
	    showSpeed: !this.data.showSpeed
	  })
  },
  //获取课程详细信息
  getinfo:function(){
    var that = this
    common.ajax({
      url: 'Home/Video/getVideoDetail',
      userinfo: true,
      loading: '加载中......',
      data: {
        v_id: that.data.v_id,
        page: 0,
        limit: 10
      },
      success:res=>{
        //时间轴
        var timeline = res.result.list.v_timeline;
        WxParse.wxParse('timeline', 'html', timeline, that, 0);
        //章节介绍
        var introduce = res.result.list.v_section_introduce;
        WxParse.wxParse('introduce', 'html', introduce, that, 0);
        var list = []
        for (var i in res.result.next_list){
          list.push(res.result.next_list[i].vd_vid)
        }
        that.setData({
          v_name: res.result.list.v_name,
          pay_status: res.result.list.pay_status,
          v_type: res.result.list.v_type,
          v_cover: res.result.list.v_cover,
          v_vid: res.result.show_vid != '' ? res.result.show_vid : res.result.list.v_vid,
          v_validity: res.result.list.v_validity,
          show_time: res.result.show_time,
          next_count: res.result.next_count,
          next_status: res.result.next_status,
          vidList: list,
          next_list: res.result.next_list
        })
        var index = list.indexOf(that.data.v_vid)
        that.getVideo(that.data.v_vid)
		that.setData({
		  index: index,
		  isFirst: false
		})
      }
    })
  },
  // 视频倍速
  setSpeed:function(e){
  	let speed = e.currentTarget.dataset.speed
	speed = speed == 1.2 ? 1.25 : speed
  	let videoContext = wx.createVideoContext('polyvVideo')
  	videoContext.playbackRate(Number(speed))
	this.setData({showSpeed: false})
  },
  //获取视频信息
  getVideo: function (vid) {
    let that = this
    let video = ''
    let vidObj = {
      vid: vid,
      callback: function (videoInfo) {
        video = videoInfo.src[0]
        that.setData({
          videoSrc: video
        })
      }
    }
	if(!that.data.isFirst){
		that.setData({
			show_time: 0
		})
	}
    polyv.getVideo(vidObj)
  },
  errorText: function (e) {
    wx.showToast({
      title: '播放出错了,重试中！',
      icon: 'none',
      duration: 1000
    })
    if(getApp().globalData.videoFlag){
      this.setData({
        flag: false
      })
      setTimeout(() => {
        this.setData({
          flag: true,
          palyFlag: true
        })
      }, 100)
      getApp().globalData.videoFlag = false
      // var pages = getCurrentPages();//当前页面栈
      // if (pages.length > 1) {
      //   var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      //   beforePage.changeData();//触发父页面中的方法
      // }
      // wx.navigateBack()
    }
  },
  timeUpdate: function (e) {
    var that = this;
    polyv.timeUpdate(e);
    that.setData({
      timer: e.detail.currentTime,
      // show_time: e.detail.currentTime
    })
	if(Math.abs(e.detail.duration - e.detail.currentTime) < 1){
		if(that.data.goNext){
			that.setData({
				goNext: false
			})
			setTimeout(function(){
				that.setData({
					goNext: true
				})
			},2000)
			that.nextVideo()
		}
    }
    if (e.detail.currentTime > 30){
      var videoContextPrev = wx.createVideoContext('polyvVideo');
      if (that.data.v_type == '精品') {
        if (that.data.pay_status == '未购买') {
          if (!that.data.isIos) {
            return false
          }
           videoContextPrev.pause();
           that.setData({
             flag: false
           })
          wx.showModal({
            title: '警告',
            content: '您还没有购买此课程\n，请前往视频课程购买！',
            confirmText: '前往购买',
            cancelText: '取消',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../course/course',
                })
              } else if (res.cancel) {
                console.log("取消")
              }
            }
          })
        }
        return false
      }
      if (that.data.v_type == '拼团'){
        if (that.data.pay_status == '未成团') {
          videoContextPrev.pause();
          that.setData({
            flag: false
          })
          wx.showModal({
            title: '警告',
            content: '您还未成团，请等待成团！在等待成团期间您可以前往视频课程观看其他课程。',
            confirmText: '前往',
            cancelText: '取消',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../course/course',
                })
              } else if (res.cancel) {
                console.log("取消")
              }
            }
          })
        }
        return false
      }
    }
  },
  //点击播放
  click:function(){
	if(this.data.showSpeed){
	  this.setData({showSpeed: false})
	  return false
	}
    var that = this
    var videoContextPrev = wx.createVideoContext('polyvVideo')
    var isPlayingMusic = that.data.isPlayingMusic;
    if (isPlayingMusic) {
      videoContextPrev.pause();
      that.setData({
        isPlayingMusic: false
      })
      clearInterval(timers)
    } else {
      videoContextPrev.play();
      that.setData({
        isPlayingMusic: true
      })
      clearInterval(timers)
      timers = setInterval(function () {
        study_duration++
        that.setData({
          study_duration: study_duration
        })
      }, 1000)
    }
  },

  prevVideo:function(){
	  var that = this
	  var list = []
	  that.data.next_list.map((item,index) => {
	  	list.push(item.vd_vid)
	  })
	  var index = list.indexOf(that.data.v_vid)
	  var id = list[index-1]
	  wx.hideLoading()
	  if(index == 0){
	  	wx.showToast({
	  		title: '当前是第一节',
	  		icon: 'none'
	  	})
	  }
	  if(!id){
	    return false
	  }
	  that.getVideo(id)
	  that.setData({
	    index: index - 1,
	    v_vid: id,
	    palyFlag: true
	  })
  },
  //播放下一个视频
  nextVideo:function(){
    var that = this
	var list = []
	that.data.next_list.map((item,index) => {
		list.push(item.vd_vid)
	})
    var index = list.indexOf(that.data.v_vid)
    var id = list[index+1]
	wx.hideLoading()
	if(index == list.length - 1){
		wx.showToast({
			title: '当前是最后一节',
			icon: 'none'
		})
	}
    if(!id){
      return false
    }
    that.getVideo(id)
    that.setData({
      index: index + 1,
      v_vid: id,
      palyFlag: true
    })
  },

  watch:function(e) {
    var v_vid = e.currentTarget.dataset.v_vid
    var index = e.currentTarget.dataset.index
    if (this.data.v_type == '精品') {
      if (this.data.pay_status == '未购买') {
        if (!this.data.isIos) {
          return false
        }
        wx.showModal({
          title: '警告',
          content: '您还没有购买过此课程\n，请前往视频课程购买！',
          confirmText: '前往购买',
          cancelText: '取消',
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '../course/course',
              })
            } else if (res.cancel) {
              console.log("取消")
            }
          }
        })
        return false
      }
    }
    if (this.data.v_type == '拼团') {
      if (this.data.pay_status == '未成团') {
        wx.showModal({
          title: '警告',
          content: '您还未成团，请等待成团！在等待成团期间您可以前往视频课程给观看其他课程。',
          confirmText: '前往',
          cancelText: '取消',
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '../course/course',
              })
            } else if (res.cancel) {
              console.log("取消")
            }
          }
        })
        return false
      }
    }
    this.setData({
      v_vid: v_vid,
      index: index,
      show_time: 0,
      palyFlag: true
    })
    this.getVideo(v_vid)
  },

  //记录观看总时长
  getTimers: function () {
    var that = this
    common.ajax({
      url: 'Home/Video/addStudyRecord',
      userinfo: true,
      data: {
        v_id: that.data.v_id,
        record_duration: that.data.timer == '' ? 0 : that.data.timer,
        study_duration: that.data.study_duration == 0 ? 0 : that.data.study_duration,
        vid: that.data.v_vid
      },
      success: function (res) {
        // console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var isIos = wx.getStorageSync('appModel').indexOf("Android") != -1
    that.setData({
      v_id: getApp().globalData.v_id,
      isIos: isIos
    })
    that.getinfo()
  },

  //获取章节列表
  getNextList: function(pages) {
    var that = this
    common.ajax({
      url: 'Home/Video/getVideoNextList',
      userinfo: true,
      data: {
        v_id: that.data.v_id,
        page: pages,
        limit: 10
      },
      success: res => {
        if (res.result.list.length == 0) {
		  that.setData({
		    refresh: false
		  })
        }
        var list = that.data.next_list
        list = list.concat(res.result.list)
        that.setData({
          next_list: list
        })
		if(that.data.goNext){
			that.setData({
			  goNext: false
			})
			that.nextVideo()
		}
      }
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
    // setTimeout(() => {
    //   this.errorText()
    // }, 10000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // var that = this
    // console.log('页面隐藏')
    // that.getTimers()
    // clearInterval(timers)
    // study_duration = 0
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this
    that.getTimers()
    clearInterval(timers)
    study_duration = 0
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
	// if(that.data.refresh){
	// 	that.getNextList(++that.data.pages)
	// }else{
	// 	wx.showToast({
	// 	  title: '已加载全部章节',
	// 	  icon: 'none',
	// 	  duration: 3000
	// 	})
	// }
  },
})