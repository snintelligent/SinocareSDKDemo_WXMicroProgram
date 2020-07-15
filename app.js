//app.js
App({
  onLaunch: function () {
    this.globalData.sysinfo = wx.getSystemInfoSync();
    this.globalData.wxAccountInfo = wx.getAccountInfoSync();
  },
  getModel: function () { // 获取手机型号
    return this.globalData.sysinfo["model"]
  },
  getWxVersion: function () { // 获取微信版本号
    return this.globalData.sysinfo["version"]
  },
  getSystem: function () { // 获取操作系统版本
    return this.globalData.sysinfo["system"]
  },
  getPlatform: function () { // 获取客户端平台
    return this.globalData.sysinfo["platform"]
  },
  getSDKVersion: function () { // 获取客户端基础库版本
    return this.globalData.sysinfo["SDKVersion"]
  },
  globalData: {
    sysinfo: null,
    wxAccountInfo: null,
    serverUrl: "https://mc2test.tmqyt.com/",
    wxSdkKey: "1e2905a4645d0532e822f0329771e090",
    sdkAccessToken: "",
    currentDeviceId: "",
    bindDeviceList: []
  }
})