// pages/connectDetail/deviceDetail.js
var app = getApp();
// import sdkAction from 'mcbluetoothsdk';
var sdkAction = require("../../mcBluetoothSDK/src/action");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textLog: "",
    deviceId: "",
    name: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var devid = decodeURIComponent(options.deviceId);
    var deviceType = decodeURIComponent(options.deviceType);
    var devname = decodeURIComponent(options.name);
    sdkAction.startConnectDevice(deviceType, devid, function(data) {
      that.setData({
        textLog: JSON.stringify(data)
      })
    })
    that.setData({
      deviceId: devid,
      name: devname
    });
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
    if (wx.setKeepScreenOn) {
      wx.setKeepScreenOn({
        keepScreenOn: true,
        success: function (res) {
          console.log('正保持屏幕常亮')
        }
      })
    }
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
  clearLogs: function () {
    this.setData({
      textLog: ""
    });
  },
  closeConnection: function () {
    sdkAction.stopConnectDevice(this.data.deviceId, function() {
      wx.navigateTo({
        url: '/pages/selectDevice/startpage'
      });
    })
  },
  unbindDevice: function() {
    var that = this;
    sdkAction.stopConnectDevice(this.data.deviceId, function() {
      var appBindDeviceList = app.globalData.bindDeviceList;
      if (appBindDeviceList.length) {
        if (appBindDeviceList.length === 1) {
          app.globalData.bindDeviceList = [];
        } else {
          var deleteIdx = -1;
          for (let i = 0; i < appBindDeviceList.length; i++) {
            if (appBindDeviceList[i].deviceUUId === that.data.deviceId) {
              deleteIdx = i;
            }
          }
          app.globalData.bindDeviceList.splice(deleteIdx, 1);
        }
      }
      wx.navigateTo({
        url: '/pages/selectDevice/startpage'
      });
    })
  }
})