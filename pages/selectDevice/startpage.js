var app = getApp();
var utils = require("../../utils/util.js");
import sdkAction from 'mcbluetoothsdk';
// var sdkAction = require("../../mcBluetoothSDK/src/action");
const sampleType = require("../../mcBluetoothSDK/src/const/sampleType.js");
const units = require("../../mcBluetoothSDK/src/const/unit.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    deviceList: [{
      appDeviceType: 2,
      deviceUUId: "",
      deviceName: "掌越血脂血糖仪",
      deviceType: "XZXTY",
      medicalCodes: "TG,CHOL,HDL-C,LDL-C,TC/HDL-C,GLU,NON-HDL-C,LDL-C/HDL-C",
      medicalNames: "血糖,高密度脂蛋白胆固醇,低密度脂蛋白胆固醇,甘油三脂,总胆固醇,总胆/高密比值,非高密度脂蛋白胆固醇,低密高密比值",
      bluetoothPrefix: "SLX",
      networkingMode: "NZLY",
      appIconUrl: "http://img.tmqyt.com/images/9440/15828120231330.png",
      isBind: false
    }, {
      appDeviceType: 26,
      deviceUUId: "",
      deviceName: "UG-11系列血糖尿酸仪",
      deviceType: "XTNSY",
      medicalCodes: "GLU,UA",
      medicalNames: "血糖,血尿酸",
      bluetoothPrefix: "BDE_WEIXIN_TTM,UG11Air",
      networkingMode: "NZLY",
      appIconUrl: "http://img.tmqyt.com/images/174/15828119051330.png",
      isBind: false
    }, {
      appDeviceType: 10,
      deviceUUId: "",
      deviceName: "WL-1型蓝牙血糖仪",
      deviceType: "XTY",
      medicalCodes: "GLU",
      medicalNames: "血糖",
      bluetoothPrefix: "Sinocare",
      networkingMode: "NZLY",
      appIconUrl: "http://img.tmqyt.com/images/898/15828118171330.png",
      isBind: false
    }, {
      appDeviceType: 25,
      deviceUUId: "",
      deviceName: "安稳+Air血糖仪",
      deviceType: "XTY",
      medicalCodes: "GLU",
      medicalNames: "血糖",
      bluetoothPrefix: "BDE_WEIXIN_TTM",
      networkingMode: "NZLY",
      appIconUrl: "http://img.tmqyt.com/images/503/15828118651330.png",
      isBind: false
    }, {
      appDeviceType: 13,
      deviceUUId: "",
      deviceName: "安诺心蓝牙血压计",
      deviceType: "XYJ",
      medicalCodes: "BP,P",
      medicalNames: "脉搏,血压",
      bluetoothPrefix: "ClinkBlood",
      networkingMode: "NZLY",
      appIconUrl: "http://img.tmqyt.com/images/7816/15828124491330.png",
      isBind: false
    }, {
      appDeviceType: 3,
      deviceUUId: "",
      deviceName: "EA-12血糖尿酸测试仪",
      deviceType: "XTNSY",
      medicalCodes: "GLU,UA,U-KET",
      medicalNames: "血糖,尿酸,血酮",
      bluetoothPrefix: "BDE_WEIXIN_TTM,SNPB,Jin",
      networkingMode: "WZLY",
      appIconUrl: "http://img.tmqyt.com/images/3771/15828137991330.png",
      isBind: false
    }, {
      appDeviceType: 12,
      deviceUUId: "",
      deviceName: "EA-18血糖尿酸测试仪",
      deviceType: "XTNSY",
      medicalCodes: "GLU,UA",
      medicalNames: "血糖,尿酸",
      bluetoothPrefix: "BDE_WEIXIN_TTM",
      networkingMode: "WZLY",
      appIconUrl: "http://img.tmqyt.com/images/9612/15828138201330.png",
      isBind: false
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    utils.intiFindIndex();
    sdkAction.wxAuthentication(app.globalData.wxAccountInfo.miniProgram.appId, app.globalData.wxSdkKey).then((status) => {
      if (status) {
        sdkAction.stopScanDeviceList();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var bindDeviceList = app.globalData.bindDeviceList;
    var deviceActionList = JSON.parse(JSON.stringify(this.data.deviceList));
    for (let i = 0; i < deviceActionList.length; i++) {
      for (let j = 0; j < bindDeviceList.length; j++) {
        if (Number(bindDeviceList[j].deviceType) === deviceActionList[i].appDeviceType) {
          deviceActionList[i].isBind = true;
          deviceActionList[i].deviceUUId = bindDeviceList[j].deviceUUId;
        }
      }
    }
    this.setData({
      deviceList: deviceActionList
    });
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
  goToSetting() {
    wx.navigateTo({
      url: '../setting/setting',
    })
  },
  goToBindingOrConnect(e) {
    // 连接流程
    if (e.currentTarget.dataset.bind) {
      wx.showModal({
        title: "提示",
        content: "请选择单设备或多设备连接",
        showCancel: true,
        confirmText: "单设备",
        cancelText: "多设备",
        success(res) {
          if (res.confirm) {
            sdkAction.init(e.currentTarget.dataset.dvt, e.currentTarget.dataset.dvid, function () {
              wx.reLaunch({
                url: '/pages/connectDetail/deviceDetail?name=' + encodeURIComponent(e.currentTarget.dataset.name) + '&deviceId=' + encodeURIComponent(e.currentTarget.dataset.dvid) + '&deviceType=' + encodeURIComponent(e.currentTarget.dataset.dvt)
              });
            })
          } else if (res.cancel) {
            sdkAction.initMulti(function () {
              wx.reLaunch({
                url: '/pages/connectDetail/multiDeviceDetail?name=' + encodeURIComponent(e.currentTarget.dataset.name) + '&deviceId=' + encodeURIComponent(e.currentTarget.dataset.dvid) + '&deviceType=' + encodeURIComponent(e.currentTarget.dataset.dvt)
              });
            })
          }
        }
      })
    } else { // 绑定流程
      wx.reLaunch({
        url: '../scanDevices/scanDevices?deviceType=' + e.currentTarget.dataset.dvt,
      })
    }
  }
})