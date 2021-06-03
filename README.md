# minute-clinic-sdk-mini-demo
微信小程序蓝牙sdk demo
## 支持设备
设备名称 | 
:-: | 
掌越血脂血糖仪 |
UG-11系列血糖尿酸仪 |
WL-1型蓝牙血糖仪 |
安稳+Air血糖仪 |A
安诺心蓝牙血压计 |

## 附A：分钟诊所微信小程序蓝牙SDK
## 1. 分钟诊所微信小程序蓝牙SDK说明
是三诺生物传感股份有限公司的蓝牙血糖仪连接微信小程序的SDK。

### 1.1 文件说明

minute-clinic-sdk-mini主要是通过npm包的方式提供给第三方。

## 1.2 手机设备的Android系统版本和蓝牙版本要求
    微信小程序Android 从微信 6.5.7 开始支持，iOS 从微信 6.5.6 开始支持；
    微信小程序蓝牙搜索安卓6.0及以上设备需打开定位服务。

## 2. 集成方法
### 2.1  获得wxSdkKey
由Sinocare提供。

### 2.2 SDK安装
    npm install mcbluetoothsdk@1.1.0 --save

### 2.3 配置wxSdkKey和小程序环境
在需要接入的小程序的app.js的全局变量中设置sdkAccessToken和wxSdkKey字段并填写获取的wxSdkKey，示例如下：
````json
globalData: {
    ...
    sdkAccessToken: "",
    wxSdkKey:'1e2905a4645d0532e822f0329771e090',
}
````

## 3.接口说明
sdk安装后在相关需要调用的页面导入，示例如下：
```JavaScript
import mcbSdk from 'mcbluetoothsdk';
```
### 3.1 接口调用授权
接口名称：wxAuthentication<br>
入参：wxAppId(小程序appId), wxSdkKey(项目配置的wxSdkKey)<br>
调用方式：
```JavaScript
mcbSdk.wxAuthentication(wxAppId, app.globalData.wxSdkKey);
```
接口返回：<br>
Promise(status)<br>
说明：<br>
返回调用成功或者失败的Promise，可异步，如：
```JavaScript
mcbSdk.wxAuthentication(wxAppId, app.globalData.wxSdkKey).then((status) => {
    if (status) {

    } else {

    }
});
```

### 3.2 初始化蓝牙SDK
接口名称：init<br>
入参：deviceType(蓝牙设备类型<详见4>), deviceId(蓝牙设备UUID)，successCallBack(初始化成功的回调方法)<br>
调用方式：
```JavaScript
mcbSdk.init(deviceType, deviceId, successCallBack)
```
说明：<br>
successCallBack用于初始化成功回调

### 3.3 搜索设备列表
接口名称：scanDeviceList<br>
调用方式：
```JavaScript
mcbSdk.scanDeviceList()
```

### 3.4 停止扫描设备
接口名称：stopScanDeviceList<br>
入参：needHint(是否需要提示)<br>
调用方式：
```JavaScript
mcbSdk.stopScanDeviceList(needHint)
```

### 3.5 连接设备
接口名称：startConnectDevice<br>
入参：deviceType(蓝牙设备类型<详见4>), deviceId(蓝牙设备UUID)，successCallBack(初始化成功的回调方法)，failCallback(初始化失败的回调方法)<br>
调用方式：
```JavaScript
mcbSdk.startConnectDevice(deviceType, deviceId, successCallBack, failCallback);
```
说明：<br>
successCallBack除了提示设备连接成功以外，用于监听仪器连接成功后，获取返回仪器数据传输的数据。
示例：<br>
```JavaScript
mcbSdk.startConnectDevice(deviceType, deviceId, function(data) {
    console.log("仪器回调的数据：" + JSON.stringify(data))
})
```

### 3.6 断开设备连接
接口名称：stopConnectDevice<br>
入参：deviceType(蓝牙设备类型<详见4>), successCallBack(初始化成功的回调方法)，needHint(是否需要提示)<br>
调用方式：
```JavaScript
mcbSdk.stopConnectDevice(deviceId, successCallBack, needHint);
```

### 3.7 获取设备连接状态
接口名称：getCurrentDeviceStatus<br>
入参：deviceId(蓝牙设备UUID)<br>
调用方式：
```JavaScript
mcbSdk.getCurrentDeviceStatus(deviceId);
```
接口返回：<br>
boolean

## 4 SDK目前支持蓝牙设备类型
设备名称 | 设备类型（deviceType） | 蓝牙前缀
:-: | :-: | :-:
掌越血脂血糖仪 | 2 | SLX
UG-11系列血糖尿酸仪 | 26 | BDE_WEIXIN_TTM
WL-1型蓝牙血糖仪 | 10 | Sinocare
安稳+Air血糖仪 | 25 | BDE_WEIXIN_TTM
安诺心蓝牙血压计 | 13 | ClinkBlood
EA-12血糖尿酸测试仪 | 3 | BDE_WEIXIN_TTM,SNPB,Jin
EA-18血糖尿酸测试仪 | 12 | BDE_WEIXIN_TTM
KA-11血糖血酮测试仪 | 4 | BDE_WEIXIN_TTM,SNPB

## 5 常见问题  
    1、 问题：SDKToken无效，调用方法失败
        问题分析： wxSdkKey配置不正确，小程序app.js未按要求设置sdkAccessToken和wxSdkKey字段。
    2、 问题: 蓝牙搜索不到设备
        问题分析：
    3、 问题：调用连接接口时蓝牙设备无法连接
        问题分析：
        ①连接其它设备时需要断开其它蓝牙设备的连接，建议先调用stopConnectDevice方法断开之前设备的连接；
        ②传入了错误的deviceId。
    4、 其他问题：
        请联系三诺工程师；或者私信。

## 附B：微信小程序蓝牙SDK Demo运行方式

### 1.依赖安装
```
npm i
```
