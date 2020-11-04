<template>
  <div class="home-container">
    <div class="Header">搜索组件</div>
    <div class="search-box">

      <search-bar :onChange="onChange" :onSearch="onSearch" :onScan="onScan">
        <div class="hot-wrapper">
          <div class="tip">搜索记录</div>
          <div class="label-wraper">
            <div class="label" v-for="(i,j) in historyList" :key="j">{{i}}</div>
          </div>
          <div class="search-list">
            <div :key="index" v-for="(item,index) in reslist" class="list-item">
              <div class="left-item">
                <i class="iconfont icon-search1187938easyiconnet"></i>
                <span>{{item}}</span>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </search-bar>

    </div>
    <div class="item-wrapper">
      <div class="item-image">
        <img style="width:100%;" :src="imgUrl" />
      </div>
      <div class="item-right">
        <div style="font-size:3.6vw;">搜索框预览组件</div>
        <div style="font-size:3.4vw;color:#777;">描述</div>
      </div>
    </div>

  </div>
</template>

<script>
  import wx from 'weixin-js-sdk';
  import {postListAPI,getSignAPI} from '@/api/api'
  export default {
    name: 'el-index',
    components: {},
    data() {
      return {
        imgUrl: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2960075288,4049112998&fm=26&gp=0.jpg",
        reslist: ["如何创建一个Vue组件", "Vue的生命周期", 'Vue路由'],
        historyList: ['html', 'vue', 'redis', 'uni-app', 'react', 'css', 'javascript', 'node.js']
      }
    },
    mounted() {

    },
    methods: {
      onSearch(value) {
        console.log(value)
      },
      onChange(value) {
        console.log(value)
      },
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
    }
  };
</script>

<style lang="scss" scoped>
  .test {
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -moz-box;
    display: -webkit-box;

    justify-content: space-around;
    box-pack: space-around;
    -webkit--moz-box-pack: space-around;
    -moz-box-pack: space-around;
    -webkit-justify-content: space-around;

    flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
    box-flex: 1;


    flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -webkit-box-lines: multiple;
    -webkit-flex-wrap: wrap;

  }

  .tab {
    text-align: center;
    padding: 10px;
    margin: 5px 0;
    background-color: #F2F2F2;

    a {
      color: #7e8c8d;
    }
  }

  .home-container {
    width: 100%;

    .Header {
      background: linear-gradient(90deg, #3fd2d2, #397326);
      padding: 4vw;
      color: #fff;
      text-align: center;
    }

    .item-wrapper {
      display: flex;
      padding: 4vw;
    }

    .item-image {
      width: 25vw;
    }

    .item-right {
      flex: 1;
      margin-left: 3vw;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 1vw 0;

    }
  }


  .search-box {

    .hot-wrapper {
      text-align: left;

      .tip {
        padding: 4vw;
        text-align: left;
        font-size: 3.0vw;
        color: #999999;
      }

      .label-wraper {
        display: flex;
        flex-wrap: wrap;
        padding: 0 4vw;
        border-bottom: 1px solid #e4e4e4;

        .label {
          padding: 0.8vw 2vw;
          border-radius: 1vw;
          background-color: #efefef;
          font-size: 3.4vw;
          margin-bottom: 4vw;
          margin-right: 2vw;
          color: #666;
        }
      }

      .search-list {
        color: #555;

        .list-item {
          display: flex;
          align-items: center;
          padding: 4vw;
          border-bottom: 1px solid #e4e4e4;
          font-size: 3.6vw;

          &:active {
            background-color: #efeff4;
          }

          .list-item {
            display: flex;
            align-items: center;
          }
        }
      }
    }

  }
</style>
