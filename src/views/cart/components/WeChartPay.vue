<template>
  <div class="we-chart-content">
    <div class="we-content">
      <div class="we-content__top">
        <span class="iconfont">&#xe6df;</span>
        <span class="text">微信支付</span>
      </div>
      <div id="qrcode" ref="qrcode" />
      <div class="we-content__tips">
        <div class="tips-value">￥{{ payNow.total_amount }}</div>
        <div class="tips-text">{{ tips }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  props: {
    payNow: {
      type: Object,
      required: true
    },
    weForm: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tips: '请使用微信“扫一扫”，扫码支付'
    }
  },
  mounted() {
    this.qrcode = new QRCode('qrcode', {
      text: this.weForm,
      width: 188,
      height: 188
    })
  }
}
</script>

<style lang="scss" scoped>
.we-chart-content {
  margin-top: 96px;
  .we-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__top {
      .iconfont {
        color: #00B01B;
        font-size: 24px;
        vertical-align: middle;
      }
      .text {
        vertical-align: middle;
        font-size: 20px;
        font-weight: bold;
        color: #3F4245;
        line-height: 20px;
        padding-left: 8px;
      }
    }
    &__information {
      margin: 24px 0;
      font-size: 14px;
      font-weight: 400;
      color: #696969;
      line-height: 14px;
      .value {
        padding-right: 24px;
      }
    }
    &__tips {
      font-size: 12px;
      font-weight: 400;
      color: #3F4245;
      line-height: 12px;
      margin-bottom: 211px;
      .tips-value {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #D30F39;
        line-height: 20px;
        margin: 16px 0;
      }
    }
  }
}
</style>
