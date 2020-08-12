// pages/multiDeviceDetail/multiDeviceDetail.js
var app = getApp();
import sdkAction from 'mcbluetoothsdk';
// var sdkAction = require("../../mcBluetoothSDK/src/action");

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
    sdkAction.startMultiConnectDevice(deviceType, devid, false, function(data) {
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

  }
})
