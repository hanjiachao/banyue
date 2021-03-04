// pages/screen/screen.js
var common = require("../../utils/util.js");
var active = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    list: [],
    fenlei: [],
    checkedList: {}
  },
  //获取筛选种类
  getVideoCate: function () {
    var that = this;
    common.ajax({
      url: 'Home/Video/getVideoCate',
      success: function (res) {
        var list = [];
        var len = res.result.list.length
        for(var i = 0;i < res.result.list.length;i++){
          list.push({
            ca_name: res.result.list[i].ca_name,
            ca_english_name: res.result.list[i].ca_english_name,
            next_list: res.result.list[i].next_list
          })
        }
        that.setData({
          fenlei: list
        })
      }
    })
  },
  //点击筛选项
  active:function (e) {
    var checkedList = this.data.checkedList
    var { parentIndex, item, index } = e.currentTarget.dataset;
    for (var i in active) {
      if (active[i].ca_id == item.next_list[index].ca_id) {
        active.splice(i, 1)
      }
    }
    if (checkedList[item.next_list[index].ca_id]) {
      checkedList[item.next_list[index].ca_id] = null
    } else {
      if (item.ca_name == '发布时间') {
        for (var i in item.next_list) {
          checkedList[item.next_list[i].ca_id] = null
          for (var j in active) {
            if (active[j].ca_id == item.next_list[i].ca_id) {
              active.splice(j, 1)
            }
          }
        }
      }
      checkedList[item.next_list[index].ca_id] = true
      active.push({
        ca_id: item.next_list[index].ca_id,
        text: item.next_list[index].ca_name,
        ca_pid: item.next_list[index].ca_pid,
        ca_value: item.next_list[index].ca_value,
        ca_english_name: item.ca_english_name,
      })
    }
    this.setData({
      list: active,
      checkedList: checkedList
    })
  },
  //删除选中项
  deletes:function () {
    this.setData({
      list: ""
    })
  },
  remove: function (e) {
    var that = this;
    var checkedList = this.data.checkedList
    var index = e.currentTarget.dataset.index;
    var list = that.data.list
    if (checkedList[e.currentTarget.dataset.ca_id]) {
      checkedList[e.currentTarget.dataset.ca_id] = null
    }
    list.splice(index, 1)
    that.setData({
      list: list,
      checkedList: checkedList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //提交携带数据
  doSubmit: function () {
    var arr = [],arr1 = [],arr2 = [],arr3 = [],arr4 = [];
    for(var i = 0;i < active.length;i++){
      if(active[i].ca_english_name == "project"){
        arr1 = arr1.concat(active.slice(i, i + 1))
      }
      if (active[i].ca_english_name == "subject") {
        arr2 = arr2.concat(active.slice(i, i + 1))
      }
      if (active[i].ca_english_name == "system") {
        arr3 = arr3.concat(active.slice(i, i + 1))
      }
      if (active[i].ca_english_name == "pubtime") {
        arr4 = arr4.concat(active.slice(i, i + 1))
      }
    }
    function fun(a,b){
      for(var i in a){
        b[i] = a[i].ca_value
      }
    }
    var project = [],subject = [],system = [],pubtime = [];
    fun(arr1, project)
    fun(arr2, subject)
    fun(arr3, system)
    fun(arr4, pubtime)
    arr = [{
      ca_english_name: 'project',
      ca_value: project
    },
    {
      ca_english_name: 'subject',
      ca_value: subject
    },
    {
      ca_english_name: 'system',
      ca_value: system
    },
    {
      ca_english_name: 'pubtime',
      ca_value: pubtime
    }]
    // wx.navigateTo({
    //   url: '../courseList/courseList?arr=' + JSON.stringify(arr)
    // })
    wx.redirectTo({
      url: '../courseList/courseList?arr=' + JSON.stringify(arr)
    })
  },
  onLoad: function (options) {
    var that = this
    active = []
    that.getVideoCate()
  }
})