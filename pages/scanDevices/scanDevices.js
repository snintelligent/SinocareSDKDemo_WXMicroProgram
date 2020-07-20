var app = getApp();
var utils = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBlueToothOpen: false,
    textLog: "",
    devices: [],
    connected: false,
    currentDeviceType: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      currentDeviceType: options.deviceType,
      isBlueToothOpen: false,
      connected: false,
      devices: [],
      textLog: ""
    })
    if (app.getPlatform() == 'android' && utils.versionCompare('6.5.7', app.getWxVersion())) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，请更新至最新版本',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            that.backPage();
          }
        }
      })
    } else if (app.getPlatform() == 'android' && utils.versionCompare('4.3.0', app.getSystem())) {
      wx.showModal({
        title: '提示',
        content: '当前系统版本过低，请更新至Android4.3以上版本',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            that.backPage();
          }
        }
      })
    } else if (app.getPlatform() == 'ios' && utils.versionCompare('6.5.6', app.getWxVersion())) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，请更新至最新版本',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            that.backPage();
          }
        }
      })
    } else {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            wx.showModal({
              title: '请求授权当前位置',
              content: '打开蓝牙设备需要获取您的地理位置权限，请确认授权',
              success: function (res) {
                if (res.cancel) {
                  wx.showToast({
                    title: '拒绝授权',
                    icon: 'none',
                    duration: 1000
                  })
                  that.backPage();
                } else if (res.confirm) {
                  wx.openSetting({
                    success: function (dataAu) {
                      if (dataAu.authSetting["scope.userLocation"] == true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        // 开始搜索蓝牙
                        that.startScan();
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1000
                        })
                        that.backPage();
                      }
                    }
                  })
                }
              }
            })
          } else if (res.authSetting['scope.userLocation'] == undefined) {
            // 开始搜索蓝牙
            that.startScan();
          } else {
            // 开始搜索蓝牙
            that.startScan();
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShow: function () {},
  startScan: function () {
    var that = this;
    that._discoveryStarted = false;
    if (that.data.isBlueToothOpen) { // 如果已初始化小程序蓝牙模块，则直接执行扫描
      that.getBluetoothAdapterState();
    } else {
      that.openBluetoothAdapter();
    }
  },
  // 初始化小程序蓝牙模块
  openBluetoothAdapter: function () {
    var that = this;
    wx.openBluetoothAdapter({
      success: function (res) {
        wx.showToast({
          title: '打开蓝牙适配器成功！',
          icon: 'none',
          duration: 1500
        })
        var log = that.data.textLog + "打开蓝牙适配器成功！\n";
        that.setData({
          textLog: log,
          isBlueToothOpen: true
        });
        that.getBluetoothAdapterState();
      },
      fail: function (err) {
        var log = that.data.textLog + "蓝牙开关未开启 \n";
        that.setData({
          textLog: log,
          isBlueToothOpen: false
        });
        wx.showModal({
          title: '提示',
          content: "蓝牙开关未开启",
          showCancel: false,
        })
      }
    });
    // 监听蓝牙适配器状态变化事件
    wx.onBluetoothAdapterStateChange(function (res) {
      var isDvailable = res.available; //蓝牙适配器是否可用
      if (isDvailable) {
        that.getBluetoothAdapterState();
      } else {
        that.stopBluetoothDevicesDiscovery(); //停止搜索
        that.setData({
          devices: []
        });
        that.setData({
          isBlueToothOpen: false
        });
        wx.showModal({
          title: '提示',
          content: "蓝牙开关未开启",
          showCancel: false,
        })
      }
    })
  },
  // 获取本机蓝牙适配器状态
  getBluetoothAdapterState: function () {
    var that = this;
    wx.getBluetoothAdapterState({
      success: function (res) {
        var isDiscov = res.discovering; // 是否正在搜索设备
        var isDvailable = res.available; // 蓝牙适配器是否可用
        if (isDvailable) {
          var log = that.data.textLog + "本机蓝牙适配器状态：可用 \n";
          that.setData({
            textLog: log
          });
          if (!isDiscov) {
            that.startBluetoothDevicesDiscovery();
          } else {
            var log = that.data.textLog + "已在搜索设备 \n";
            that.setData({
              textLog: log
            });
          }
        }
      }
    })
  },
  // 开始扫描附近的蓝牙外围设备。
  // 注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。
  startBluetoothDevicesDiscovery: function () {
    var that = this;
    if (that._discoveryStarted) {
      return
    }
    that._discoveryStarted = true;
    wx.showLoading({
      title: "正在扫描..",
      mask: true
    });
    var log = that.data.textLog + "正在扫描..\n";
    that.setData({
      textLog: log
    });
    setTimeout(function () {
      wx.hideLoading(); // 隐藏loading
    }, 3000);
    wx.startBluetoothDevicesDiscovery({
      services: [],
      allowDuplicatesKey: true, // 是否允许重复上报同一设备, 如果允许重复上报，则onDeviceFound 方法会多次上报同一设备，但是 RSSI(信号) 值会有不同
      success: function (res) {
        var log = that.data.textLog + "扫描附近的蓝牙外围设备成功，准备监听寻找新设备:" + JSON.stringify(res) + "\n";
        that.setData({
          textLog: log
        });
        that.onBluetoothDeviceFound(); // 监听寻找到新设备的事件
      }
    });
  },
  // 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。
  stopBluetoothDevicesDiscovery: function () {
    var that = this;
    var log = that.data.textLog + "停止搜寻附近的蓝牙外围设备 \n";
    that.setData({
      textLog: log
    });
    wx.stopBluetoothDevicesDiscovery()
  },
  // 监听寻找到新设备的事件
  onBluetoothDeviceFound: function () {
    var that = this;
    wx.onBluetoothDeviceFound(function (res) {
      res.devices.forEach(function (device) {
        if (!device.name && !device.localName) {
          return
        }
        var macAddrStr = utils.ab2hex(device.advertisData).toUpperCase().replace(/(.{2})/g, '$1:');
        device.macAddr = macAddrStr.substring(macAddrStr.length - 18, macAddrStr.length - 1);
        const foundDevices = that.data.devices;
        const idx = utils.inArray(foundDevices, 'deviceId', device.deviceId);
        const data = {};
        if (idx === -1) {
          data[`devices[${foundDevices.length}]`] = device;
        } else {
          data[`devices[${idx}]`] = device;
        }
        that.setData(data);
      })
    })
  },
  // 连接低功耗蓝牙设备。
  createBLEConnection: function (e) {
    var ds = e.currentTarget.dataset;
    app.globalData.bindDeviceList.push({
      deviceType: this.data.currentDeviceType,
      deviceUUId: ds.deviceId,
      deviceName: ds.name
    });
    wx.navigateTo({
      url: '/pages/selectDevice/startpage'
    });
  },
  clearLogs: function () {
    this.setData({
      textLog: ""
    });
  },
  // 退出页面
  backPage: function () {
    wx.navigateBack({
      delta: -1
    })
  }
})