<template>
  <div class="image-dialog">
    <div class="image-dialog-trigger" :class="loaded==true?'hidden':''" type="button" @click="showDialog">
      <div ref="thumb" class="input-wrapper">
        <div class="input">
          <i class="iconfont icon-search1187938easyiconnet"></i>
          <span class="palceholder">名称</span>
        </div>
      </div>
    </div>
    <transition name="dialog" @enter="enter" @leave="leave">
      <div class="image-dialog-background" v-show="appearedDialog" ref="dialog">
        <button v-if="false" class="image-dialog-close" type="button" aria-label="Close"></button>
        <div ref="full" @load="onLoadFull" class="input-wrapper image-dialog-full">
          <div class="input">
            <i class="iconfont icon-search1187938easyiconnet"></i>
            <input @input="onInput" v-model="keyword" placeholder="名称" class="palceholder" />
            <i @click.stop="onScanValue" class="iconfont icon-icon-test"></i>
            <i @click="()=>{keyword=''}" class="iconfont icon-close1"></i>
          </div>
          <div ref="cancleBtn" @click="submitForm" class="cancle-btn">
            {{keyword.length>0?'搜索':'取消'}}
          </div>
        </div>
        <div :class="slotVisiable?'visible':''" class="slot-content">
          <!-- 插槽 -->
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      thumb: String,
      full: String,
      radius: Number,
      onSearch: {
        type: Function,
        required: true,
        default: () => {}
      },
      onChange: {
        type: Function,
        required: false,
        default: () => {}
      },
      onScan: {
        type: Function,
        required: true,
        default: () => {}
      },
    },

    data() {
      return {
        loaded: false,
        slotVisiable: false,
        appearedDialog: false,
        keyword: "",
        showCancle: false
      };
    },
    created(){
    },
    mounted(){
    },
    methods: {
      onInput(e) {
        this.onChange(e.target.value);
      },
      onScanValue() {
        this.onScan();
      },
      submitForm() {
        if (this.keyword.length > 0) {
          this.appearedDialog = false;
          this.onSearch(this.keyword);
        } else {
          this.hideDialog();
        }
      },
      showDialog() {
        this.appearedDialog = true;
      },
      hideDialog() {
        this.appearedDialog = false;
      },
      enter() {
        setTimeout(() => {
          this.loaded = true;
          this.slotVisiable = true;
        }, 300)
      },
      leave() {
        this.slotVisiable = false;
        setTimeout(() => {
          this.loaded = false;
        }, 300)
      },
      onLoadFull() {
        this.loaded = true;
      },
    }
  };
</script>

<style lang='scss' scoped>
  @import '../../../static/font_demo/iconfont.css';

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .image-dialog {
    width: 100%;

    .image-dialog-trigger {
      width: 100%;

      &.hidden {
        opacity: 0;
      }
    }

    .slot-content {
      transition: opacity .6s ease;
      opacity: 0;

      &.visible {
        opacity: 1;
      }
    }

    .image-dialog-full {
      display: flex;

      .cancle-btn {
        display: flex;
        align-items: center;
        font-size: 15px;
        padding-left: 10px;
        padding-right: 4px;
        color: #777777;
      }
    }

    .input-wrapper {
      background-color: #efeff4;
      border-bottom: 1px solid #e4e4e4;
      padding: 2vw 2vw;
      box-sizing: border-box;
      width: 100vw;

      .input {
        border: none;
        outline: none;
        padding: 5px;
        font-size: 15px;
        border-radius: 5px;

        min-height: 7vw;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        flex: 1;
        transition: width 3s;

        input {
          border: none;
          outline: none;
          padding: 5px;
          font-size: 15px;
          border-radius: 5px;
          padding-left: 0;
          flex: 1;
        }

        .iconfont {
          color: #999;
          margin-left: 1vw;
          margin-right: 2vw;
          font-size: 15px;
          padding-top: 0px;
        }

        .palceholder {
          color: #999;
        }
      }
    }


  }

  .image-dialog-thumb {
    object-fit: cover;
  }

  .image-dialog-trigger {
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
  }

  .image-dialog-close {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 40px;
    height: 40px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    -webkit-transition: 300ms ease-out;
    transition: 300ms ease-out;
    outline: none;
  }

  .image-dialog-close::before,
  .image-dialog-close::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -0.5px;
    margin-left: -20px;
    width: 30px;
    height: 1px;
    background-color: #000;
  }

  .image-dialog-close::before {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .image-dialog-close::after {
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
  }

  .image-dialog-close:hover {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  .image-dialog-background {
    overflow: auto;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.95);
    text-align: center;
    z-index: 999;

  }

  .image-dialog-animate {
    display: none;
    position: absolute;
    -webkit-transform-origin: left top;
    transform-origin: left top;
  }

  .image-dialog-animate.loading {
    display: block;
  }

  .dialog-enter-active,
  .dialog-leave-active {
    -webkit-transition: background-color 300ms ease-out;
    transition: background-color 300ms ease-out;
  }

  .dialog-enter,
  .dialog-leave-to {
    background-color: rgba(255, 255, 255, 0);
  }

  .dialog-enter-active .image-dialog-animate,
  .dialog-leave-active .image-dialog-animate {
    display: block;
    -webkit-transition: -webkit-transform 300ms cubic-bezier(1, 0, 0.7, 1);
    transition: -webkit-transform 300ms cubic-bezier(1, 0, 0.7, 1);
    transition: transform 300ms cubic-bezier(1, 0, 0.7, 1);
    transition: transform 300ms cubic-bezier(1, 0, 0.7, 1),
      -webkit-transform 300ms cubic-bezier(1, 0, 0.7, 1);
  }

  .dialog-enter-active .image-dialog-full,
  .dialog-leave-active .image-dialog-full {
    visibility: hidden;
  }

  .image-dialog-trigger img {
    width: 100%;
    height: 100%;
  }
</style>
