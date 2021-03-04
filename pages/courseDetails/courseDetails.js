// pages/courseDetails/courseDetails.js
var common = require("../../utils/util.js");
const polyv = require('../../utils/polyv.js');
var WxParse = require('../../wxParse/wxParse.js');
var study_duration = 0,timers
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    flag1: true,
    flag2: true,
    flag3: true,
    flag4: true,
    flag5: true,
    flag6: true,
    flag7: true,
    flag8: false,
    login1: false,
    login2: false,
    buy1: false,
    buy2: false,
    width: '',
    height: '',
    currentTab: 0,
    v_id: '',
    videoSrc: '',
    isPlayingMusic: false,
    v_vid: '',
    v_name: '',
    v_abstract: '',
    v_price: '',
    v_group_price: '',
    v_total_user: '',
    residue_num: '',
    v_see_num: '',
    v_buy_num: '',
    v_can_use_integral: '',
    v_duration: '',
    v_validity: '',
    timer: '',
    flag: false,
    bind_status: '',
    pay_status: '',
    achieve: false,
    share: false,
    share_image: '',
    share_text: '',
    //消耗积分
    expend: false,
    // 收藏状态
    collection: '',
    status: false,
    // 收藏状态图标
    collectUrl: '../../image/icon_18.png',
    // 分享到朋友圈图片
    share_friend_image: '',
    v_cover: '',
    integral_status: '',
    iphoneFlag: false,
    iphoneFlag1: false,
    qrcode: '',
    homePageFlag: false,
    next_count: '',
    next_status: '',
    next_list: '',
    pages: 0,
    study_duration: '',
    index: 0,
    isIos: '',
	playFlag: false,
	startTime: 0,
	speedList: ['1.0','1.2','1.5','2.0'],
	speed: '',
	showSpeed: false,
	refresh: true,
	goNext: true,
	isFirst: true,
	minute: 0,
	v_qrcode: ''
  },
  //滑动切换
  swiperTab: function (event) {
    this.setData({
      currentTab: event.detail.current
    })
  },
  displaySpeed: function (e){
  	  this.setData({
  	    showSpeed: !this.data.showSpeed
  	  })
  },
  setSpeed:function(e){
  	let speed = e.currentTarget.dataset.speed
  	speed = speed == 1.2 ? 1.25 : speed
  	let videoContext = wx.createVideoContext('polyvVideo')
  	videoContext.playbackRate(Number(speed))
  	this.setData({showSpeed: false})
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { 
      return false; 
    }else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //
  shareFlag:function(){
    this.setData({
      share: false
    })
  },
  shareFlag1:function(){
    this.setData({
      share: true
    })
  },
  //获取信息详情
  getInfo: function (msg) {
    var that = this
    common.ajax({
      url: 'Home/Video/getVideoDetail',
      loading: "加载中.....",
      userinfo: true,
      data: {
        v_id: that.data.v_id,
        limit: 10,
      },
      success: function (res) {
        //拼团规则
        var rule = res.result.rule;
        WxParse.wxParse('rule', 'html', rule, that, 0);
        //课程介绍
        var v_detail = res.result.list.v_detail;
        WxParse.wxParse('v_detail', 'html', v_detail, that, 0);
        //讲师介绍
        var v_teacher_introduce = res.result.list.v_teacher_introduce;
        WxParse.wxParse('v_teacher_introduce', 'html', v_teacher_introduce, that, 0);
        //章节介绍
        var v_section_introduce = res.result.list.v_section_introduce;
        WxParse.wxParse('v_section_introduce', 'html', v_section_introduce, that, 0);
        that.setData({
          collection: res.result.list.collection,
          pay_status: res.result.list.pay_status,
          share_image: res.result.share_image,
          share_text: res.result.share_text,
          share_friend_image: res.result.share_friend_image,
          v_type: res.result.list.v_type,
          v_name: res.result.list.v_name,
          v_abstract: res.result.list.v_abstract,
          v_price: res.result.list.v_price,
          v_group_price: res.result.list.v_group_price,
          v_total_user: res.result.list.v_total_user,
          residue_num: res.result.list.residue_num,
          v_see_num: res.result.list.v_see_num,
          v_buy_num: res.result.list.v_buy_num,
          v_can_use_integral: res.result.list.v_can_use_integral,
          v_duration: res.result.list.v_duration,
          v_validity: res.result.list.v_validity,
          bind_status: res.result.list.bind_status,
          v_cover: res.result.list.v_cover,
          integral_status: res.result.list.integral_status,
          next_count: res.result.next_count,
          next_status: res.result.next_status,
          next_list: res.result.next_list,
		  v_vid: res.result.show_vid ? res.result.show_vid : res.result.list.v_vid,
		  index: res.result.show_video_sort ? res.result.show_video_sort : 0,
		  startTime: res.result.show_time,
		  refresh: res.result.next_list < 10 ? false : true,
		  v_qrcode: res.result.list.v_qrcode
        })
        if (that.data.collection == '已收藏') {
          that.setData({
            status: true,
            collectUrl: '../../image/icon_18.1.png'
          })
        } else {
          that.setData({
            status: false,
            collectUrl: '../../image/icon_18.png'
          })
        }
        that.getVideo(that.data.v_vid)
		that.setData({
			isFirst: false
		})
        if(res.result.list.bind_status == "未绑定"){
			that.setData({
			  login1: true,
			  login2: false,
			  buy1: false,
			  buy2: false
			})
          // if(res.result.list.v_type == "精品" || res.result.list.v_type == "拼团"){
          //   that.setData({
          //     login1: false,
          //     login2: true,
          //     buy1: false,
          //     buy2: false
          //   })
          // }else{
          //   that.setData({
          //     login1: false,
          //     login2: true,
          //     buy1: false,
          //     buy2: false
          //   })
          // }
        }else{
          if (res.result.list.pay_status != '已支付' && res.result.list.pay_status != '已成团'){
            if (res.result.list.v_type == "精品") {
              that.setData({
                buy1: true,
                buy2: false,
                login1: false,
                login2: false
              })
            }
            if (res.result.list.v_type == "拼团") {
              that.setData({
                buy1: false,
                buy2: true,
                login1: false,
                login2: false
              })
            }
            if (res.result.list.v_type == '免费') {
              that.setData({
                buy1: false,
                buy2: false,
                login1: false,
                login2: false
              })
              if (that.data.integral_status == '未使用'){
                that.setData({
                  expend: true
                })
              }
            }
          }else{
            if (res.result.list.v_type == "精品" || res.result.list.v_type == "拼团"){
              that.setData({
                achieve: true
              })
            }
          }
        }
      }
    })
  },
  register:function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  getVideo: function (vid) {
    let that = this
    let video = ''
    let vidObj = {
      vid: vid,
      callback: function (videoInfo) {
        if (videoInfo.src.length == 1) {
          video = videoInfo.src[0]
        } else {
          video = videoInfo.src[1]
        }
        that.setData({
          videoSrc: video
        })
      }
    }
	if(!that.data.isFirst){
		that.setData({
			startTime: 0
		})
	}
	let list = this.data.next_list
	let idList = []
	list.map((item,index) => {
		idList.push(item.vd_vid)
	})
	let index = idList.indexOf(this.data.v_vid)
	let item = list[index]
	let minute = item.vd_free_minute
	let isFree = item.vd_is_free
	if(isFree == '否' && minute > 0 && this.data.pay_status != '已支付'){
		this.setData({
			buy1: true,
			iphoneFlag1: true,
			minute: minute
		})
	}
    polyv.getVideo(vidObj)
  },
  timeUpdate: function (e) {
    var that = this;
    polyv.timeUpdate(e);
    // console.log(e)
	let course = this.data.next_list[this.data.index]
	var minute = course.vd_is_free == '是' ? course.vd_free_minute : 0
	var freeMinute = course.vd_free_minute
	var isFree = course.vd_is_free == '是'
	if(course.vd_is_free == '否' && course.vd_free_minute == 0 && this.data.pay_status != '已支付'){
		wx.showToast({
			title:'请前去购买',
			icon: 'none'
		})
		that.setData({
		  flag: true
		})
	}
    that.setData({
      timer: e.detail.currentTime,
	  minute: minute
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
	if(isFree){
		clearInterval(timers)
		return false
	}
	if(this.data.pay_status == '已支付'){
		return false
	}
	var interval = setInterval(function () {
	  var timer = that.data.timer
	  if (timer > freeMinute * 60) {
	    var videoContextPrev = wx.createVideoContext('polyvVideo');
	    var isPlayingMusic = that.data.isPlayingMusic;
	    videoContextPrev.pause();
	    clearInterval(interval);
	    that.freeCallback()
	  }
	}, 1000);
  },
  click:function (e) {
	  if(this.data.showSpeed){
	    this.setData({showSpeed: false})
	    return false
	  }
    var that = this;
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
      timers = setInterval(function(){
        study_duration++
        that.setData({
          study_duration: study_duration
        })
      },1000)
    }
    if (that.data.bind_status == "未绑定"){
      that.proved()
    }
    if ((that.data.pay_status != '已支付') && (that.data.bind_status == "已绑定") && (that.data.pay_status != '已成团')){
      if(that.data.v_type != '免费'){
        that.proved()
      }
    }
  },
  //5分钟视频试看函数
  proved:function () {
    var that = this;
	var course = that.data.next_list[that.data.index]
	var minute = course.vd_free_minute
	var freeMinute = course.vd_free_minute
	var isFree = course.vd_is_free == '是'
	if(course.vd_is_free == '否' && course.vd_free_minute == 0 && this.data.pay_status != '已支付'){
		wx.showToast({
			title:'请前去购买',
			icon: 'none'
		})
		that.setData({
		  flag: true
		})
	}
	if(isFree){
		clearInterval(timers)
		return false
	}
    var interval = setInterval(function () {
      var timer = that.data.timer
      if (timer > freeMinute * 60 && that.data.pay_status != '已支付') {
        var videoContextPrev = wx.createVideoContext('polyvVideo');
        var isPlayingMusic = that.data.isPlayingMusic;
        videoContextPrev.pause();
        clearInterval(interval);
        that.freeCallback()
      }
    }, 1000);
  },
  freeCallback: function(){
	  var that = this
	  var text = that.data.text
	  if(this.data.pay_status == '已支付'){
		  return false
	  }
	  this.setData({
		  timer: 0
	  })
	  this.getTimers()
	  if(text == '精品'){
	    wx.showToast({
	      title: '请前去购买',
	      icon: 'none',
	      duration: 2000
	    })
	  } else if (text == '拼团'){
	    wx.showToast({
	      title: '请前去购买',
	      icon: 'none',
	      duration: 2000
	    })
	  }else{
	    wx.showToast({
	      title: '请前去绑定信息',
	      icon: 'none',
	      duration: 2000
	    })
	  }
	  that.setData({
	    flag: true
	  })
  },
  //精品课程取消绑定手机号
  abolish1:function () {
    var that = this;
    that.setData({
      login1: false,
      flag: true
    })
  },
  //免费课程点击取消绑定手机号
  abolish2:function () {
    var that = this;
    that.setData({
      login2: false,
      flag: false
    })
  },
  // 苹果机型
  iphone:function(){
    this.setData({
      iphoneFlag: false
    })
  },
  iphoneSon:function(){
    this.setData({
      iphoneFlag: true
    })
  },
  //购买课程
  purchase:common.throttle(function (e) {
    var that = this
    var appInfo = wx.getStorageSync("appModel");
    that.setData({
      buy1: false,
      buy2: false
    })
    if (that.data.bind_status == '已绑定'){
      if (appInfo.indexOf("Android") != -1) {
        if (that.data.pay_status == '已支付' || that.data.pay_status == '已成团' || that.data.pay_status == '未成团') {
          wx.showToast({
            title: '您已经购买过此课程',
            icon: 'none',
            duration: 3000
          })
        } else {
          that.setData({
            iphoneFlag: true
          })
          // common.ajax({
          //   url: 'Home/Video/createVideoOrder',
          //   userinfo: true,
          //   data: {
          //     v_id: that.data.v_id,
          //     type: e.currentTarget.dataset.type
          //   },
          //   success: function (res) {
          //     var orderNo = res.result.order_no;
          //     wx.navigateTo({
          //       url: '../indent/indent?orderNo=' + orderNo
          //     })
          //   }
          // })
        }
      } else {
        if (that.data.pay_status == '已支付' || that.data.pay_status == '已成团' || that.data.pay_status == '未成团') {
          wx.showToast({
            title: '您已经购买过此课程',
            icon: 'none',
            duration: 3000
          })
        } else{
          that.setData({
            iphoneFlag: true
          })
        }
      }
    }else{
      that.setData({
        login1: true
      })
    }
  }, 2000),
  //取消购买
  quxiao:function(){
    var that = this
    that.setData({
      buy1: false
    })
  },
  //已购买点击好的按钮
  haode:function(){
    this.setData({
      achieve: false
    })
  },
  //拼团点击OK
  clickOk:function(){
    this.setData({
      buy2: false
    })
  },
  //取消消耗积分
  callOff:function(){
    var that = this
    that.setData({
      expend: false,
      flag: true
    })
  },
  //确认消耗积分
  consume:common.throttle(function(e){
    var that = this
    common.ajax({
      url: 'Home/Video/videoFreePay',
      userinfo: true,
      data: {
        v_id: that.data.v_id
      },
      success:function(res){
        if (res.status == 'ERROR') {
          wx.showToast({
            title: res.result.msg,
            icon: 'none',
            duration: 3000
          })
        }else{
		  that.getInfo()
          that.setData({
            expend: false,
			flag: false
          })
        }
      }
    })
  },2000),
  //切换视频
  watch: function(e) {
    var that = this
    var v_vid = e.currentTarget.dataset.v_vid
    var index = e.currentTarget.dataset.index
    if (that.data.bind_status == "未绑定") {
      that.setData({
        login2: true
      })
      return false
    }
    // if (that.data.v_type != '免费'){
      // if ((that.data.pay_status != '已支付' && that.data.v_type == '精品') || that.data.pay_status == '未支付') { 
      //   that.setData({
      //     buy1: true
      //   })
      //   return false
      // }
      // if (that.data.pay_status != '已成团' && that.data.v_type == '拼团') { 
      //   wx.showToast({
      //     title: '您还未成团，请等待',
      //     icon: 'none',
      //     duration: 3000
      //   })
      //   return false
      // }
    // }
	if(this.data.pay_status == '已支付'){
		this.setData({
			flag: false
		})
	}else if(this.data.v_type == '免费'){
		this.setData({
			expend: true
		})
	}
    this.setData({
      v_vid: v_vid,
      index: index
    })
    that.getVideo(v_vid)
  },
  //收藏视频和取消收藏
  collect:common.throttle(function(e){
    var that = this
    var status = e.currentTarget.dataset.status
    if(!status){
      common.ajax({
        url: 'Home/Video/addCollectionRecord',
        userinfo: true,
        data: {
          v_id: that.data.v_id
        },
        success: function (res) {
          that.setData({
            status: true,
            collectUrl: '../../image/icon_18.1.png'
          })
          wx.showToast({
            title: '恭喜您收藏成功',
            icon: 'success',
            duration: 3000
          })
        }
      })
    }else{
      common.ajax({
        url: 'Home/Video/delCollectionRecord',
        userinfo: true,
        data: {
          v_id: that.data.v_id
        },
        success: function (res) {
          that.setData({
            status: false,
            collectUrl: '../../image/icon_18.png'
          })
          wx.showToast({
            title: '恭喜您取消成功',
            icon: 'success',
            duration: 3000
          })
        }
      })
    }
  },1000),
  //分享视频弹出层
  share:function(){
    var that = this
    that.setData({
      share: true
    })
  },
  // 分享转发
  forwarding:function(){
    this.setData({
      share: false
    })
    common.ajax({
      url: 'Home/User/shareNotify',
      userinfo: true,
	  data: {
	    v_id: this.data.v_id,
	  },
      success: function (res) {
        
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  //分享到朋友圈 下载图片
  friends:function(){
	wx.showLoading({title: '保存中...'})
    var that = this
    that.setData({
      share: false
    })
    wx.downloadFile({
      url: that.data.share_friend_image,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.hideLoading()
            wx.showModal({
				title: '图片已保存，请打开微信，从相册中选择图片进行分享',
            	showCancel: false
            })
          },
          fail: function (err) {
			wx.hideLoading()
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
  saveCode:function(){
	  wx.showLoading({title: '保存中...'})
	  var that = this
	  that.setData({
	    share: false
	  })
	  wx.downloadFile({
	    url: that.data.v_qrcode,
	    success: function (res) {
	      wx.saveImageToPhotosAlbum({
	        filePath: res.tempFilePath,
	        success: function (data) {
			  wx.hideLoading()
			  wx.showModal({
				  title: '图片已保存，请打开微信，从相册中选择图片进行分享',
				  showCancel: false
			  })
	        },
	        fail: function (err) {
	  		wx.hideLoading()
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
  //记录观看总时长
  getTimers:function(){
    var that = this
    common.ajax({
      url: 'Home/Video/addStudyRecord',
      userinfo: true,
      data: {
        v_id: that.data.v_id,
        record_duration: that.data.timer == '' ? 0 : that.data.timer,
        study_duration: that.data.study_duration == 0 ? 0 : that.data.study_duration,
        vid: that.data.v_vid,
		video_sort: that.data.index
      },
      success:function(res){
        console.log(res)
      }
    })
  },
  changeData:function(){
    this.onLoad();
  },
  //二维码长按识别
  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.qrcode.split(','),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	var that = this;
    var isIos = wx.getStorageSync('appModel').indexOf("Android") != -1
    if (!wx.getStorageSync('text')){
      wx.setStorageSync('text', options.text)
      wx.setStorageSync('v_id', options.v_id)
    }
    var text = wx.getStorageSync('text');
    var v_id = wx.getStorageSync('v_id');
    var boole = wx.getStorageSync('boole')
    that.setData({
      v_id: v_id,
      text: text,
      isIos: isIos
    })
    for(var i in options){
      if (options) {
        that.setData({
          v_id: options.v_id,
          text: options.text
        })
      }
    }
    that.getInfo()
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          height: calc
        });
      }
    });
    if(that.data.text == "精品"){
      that.setData({
        flag1: true,
        flag2: false,
        flag3: true,
        flag4: false,
        flag5: true,
        flag6: false,
        flag7: true,
        flag8: false
      })
    } else if (that.data.text == "拼团"){
      that.setData({
        flag1: true,
        flag2: true,
        flag3: true,
        flag4: true,
        flag5: false,
        flag6: true,
        flag7: true,
        flag8: false
      })
    }else{
      that.setData({
        flag1: false,
        flag2: false,
        flag3: false,
        flag4: false,
        flag5: false,
        flag6: false,
        flag7: false,
        flag8: true,
        width: '100%'
      })
    }
    wx.showShareMenu({
      withShareTicket: true
    })
    common.ajax({
      url: "Home/Index/getServiceData",
      success: function (res) {
        that.setData({
          qrcode: res.result.qrcode
        })
      }
    })
    if (boole) {
      that.setData({
        iphoneFlag1: boole,
        width: text == "免费" ? "100%" : "50%"
      })
    } else {
      that.setData({
        iphoneFlag1: boole,
        width: "100%"
      })
    }
  },
  homePage:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  getNextList: function(pages){
	  return false
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
	      if (res.result.list.length < 10) {
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
  	    playFlag: true,
		flag: false
  	  })
  },
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
      playFlag: true,
	  flag: false
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
  onShow: function (options) {
    var scenario = wx.getStorageSync("scenario")
    var boole = wx.getStorageSync("boole");
    if (scenario.scene == 1007 || scenario.scene == 1008) {
      this.setData({
        homePageFlag: true
      }) 
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this
    that.getTimers()
    clearInterval(timers)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this
    that.getTimers()
    clearInterval(timers)
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
    // if (that.data.currentTab == 0){
    //   var that = this
    //   if(that.data.refresh){
    //   	that.getNextList(++that.data.pages)
    //   }else{
    //   	wx.showToast({
    //   	  title: '已加载全部章节',
    //   	  icon: 'none',
    //   	  duration: 3000
    //   	})
    //   }
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var that = this
    var share_code = wx.getStorageSync("share_code")
	that.forwarding()
    return {
      title: that.data.v_name,
      imageUrl: that.data.share_image,
      desc: that.data.share_text,
      path: 'pages/courseDetails/courseDetails?v_id=' + that.data.v_id + '&text=' + that.data.text + '&share_code=' + share_code,
      success: function (res) {
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