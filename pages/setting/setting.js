// pages/setting/setting.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: app.globalData.serverUrl,
    wxSdkKey: app.globalData.wxSdkKey
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  formSubmit: function (e) {
    app.globalData.serverUrl = this.data.serverUrl;
    app.globalData.wxSdkKey = this.data.wxSdkKey;
    wx.showToast({
      title: "保存成功",
      icon: 'none',
      duration: 1500
    })
    setTimeout(function () {
      wx.reLaunch({
        url: '../selectDevice/startpage',
      })
  }, 1500)
  }
})