# vue-search-bar

#### 项目介绍

Vue 组件，搜索框、带搜索页面、历史记录的搜索框 、扫码识别

![image](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni3efeecc/4803a670-1d75-11eb-9dfb-6da8e309e0d8.png)
![image](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni3efeecc/52e1f010-1d75-11eb-81ea-f115fe74321c.png)

#### 软件架构

软件架构说明

#### 安装教程

引入下列几个文件

![image](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni3efeecc/02475db0-1d76-11eb-8a36-ebb87efcf8c0.png)

## 方法

| 方法名	| 参数	|  说明			|
| --------| -----:| :----:		|
| onChange| val		|  监听输入	|
| onSearch| val		|  确认输入	|
| onScan	| val		|  扫码调用	|

#### 使用说明

    在main.js中
    import  {SearchBar}  from '@/components';
    Vue.use(SearchBar);

    页面中使用
    <search-bar :onChange="onChange" :onSearch="onSearch" :onScan="onScan">
        搜索页面 推荐标签 搜索提示等等...
    </search-bar>

	使用微信扫码,安装微信插件
	cnpm install weixin-js-sdk

	页面中引入
	import wx from 'weixin-js-sdk';

	页面中调用
	onScan() {
        console.log('唤起扫码')
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        console.log(isWeixin)
        if (isWeixin) {
          const _self = this
          const params = {
            url: location.href.split('#')[0]
          }
          // 调用后台接口，这是我自己封装的请求方法
          getSignAPI(params).then(res => {
            console.log(res)
            if (res.data.code == 0) {
              wx.config({
                debug: false,
                appId: res.data.appId,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                timestamp: res.data.timestamp,
                jsApiList: [
                  'checkJsApi',
                  'scanQRCode'
                ]
              });
              wx.ready(res => {
                wx.checkJsApi({
                  jsApiList: ['scanQRCode'],
                  success: function(res) {
                    console.log(res)
                  }
                });
                wx.scanQRCode({
                  needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                  scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                  success: function(res) {
                    var str = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    console.log("扫描结果：" + str);
                  }
                });
              })
            } else {
              console.log('请求出错')
            }
          })
        } else {
          alert('请在微信中打开该网站，否则无法正常使用')
        }
      }
