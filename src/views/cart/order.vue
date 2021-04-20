<template>
  <div v-loading="loading" class="wrapper">
    <div class="payment-top">
      <div class="icon"><span class="iconfont">&#xe618;</span></div>
      <div class="pay-text">
        <div class="text-title">{{ title }}</div>
        <div class="text-des">请您在<span style="color: #D30F39">24小时</span>内完成支付，否则订单会被自动关闭取消。</div>
      </div>
      <div class="actual-summary">
        <span class="order-text">实付款：</span>
        <span class="order-summary-text">￥{{ total_amount | priceToCurrency }}</span>
      </div>
    </div>
    <div class="payment-content">
      <div class="title">支付方式</div>
      <div class="el-radio-group">
        <el-radio-group v-model="paymentRequest.payType" class="el-radio-group-grid" @change="payTypeChange">
          <el-radio class="weChart" style="margin-left: 10px" border :label="''+1">
            <span class="iconfont">&#xe662;</span>
            <span class="text">微信支付</span>
          </el-radio>
          <el-radio class="aliPay" border :label="''+0">
            <span class="iconfont">&#xe600;</span>
            <span class="text">支付宝支付</span>
          </el-radio>
        </el-radio-group>
      </div>
      <div id="payment">
        <el-button class="payment" @click="surePay">立即支付</el-button>
      </div>
      <el-dialog :visible.sync="dialogWeChartVisible" max-width="956px">
        <div slot="title">
          <span class="buy-title">扫码支付</span>
          <WeChartPay v-if="this.wechartForm" :pay-now="payNow" :we-form="this.wechartForm"/>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { priceToCurrency } from '@/filter'
import { paymentWe, paymentAli } from '@/api/cart'
import { WeChartPay } from './components/WeChartPay'
export default {
  filters: {
    priceToCurrency
  },
  components: {
    WeChartPay
  },
  data() {
    return {
      loading: false,
      dialogWeChartVisible: false,
      wechartForm: '',
      payNow: {
        total_amount: this.$route.query.subtotal
      },
      title: '订单提交成功，请尽快付款！',
      'total_amount': this.$route.query.subtotal,
      paymentRequest: {
        'payType': '0' // 支付方式 0：支付宝 1：微信
      }
    }
  },
  methods: {
    payTypeChange(val) {
      this.paymentRequest.payType = val
    },
    surePay() {
      this.loading = true
      if (this.paymentRequest.payType === '0') {
        paymentAli(this.paymentRequest).then((res) => {
          this.loading = false
          const result = res.data
          if (res.code === 20000) {
            this.$message.success('支付宝支付')
            const payDiv = document.getElementById('payDiv')
            if (payDiv) {
              document.body.removeChild(payDiv)
            }
            const div = document.createElement('div')
            div.id = 'payDiv'
            div.innerHTML = result
            document.body.appendChild(div)
            document.getElementById('payDiv').getElementsByTagName('form')[0].submit()
          }
        }).catch((err) => {
          console.log(err)
        })
      } else if (this.paymentRequest.payType === '1') {
        paymentWe(this.paymentRequest).then((res) => {
          if (res.code === 20000) {
            this.wechartForm = res.data
            this.dialogWeChartVisible = true
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon {
    float: left;
    .iconfont {
      color: #4FAD92;
      font-size: 44px;
    }
  }
  .pay-text {
    float: left;
    padding-left: 10px;
    margin-top: 5px;
    .text-title {
      font-size:18px;
      font-weight:bold;
      color:rgba(63,66,69,1);
      line-height:18px;
    }
    .text-des {
      font-size:14px;
      font-weight:400;
      color:rgba(105,105,105,1);
      line-height:14px;
      margin-top: 8px;
    }
  }
  .actual-summary {
    float: right;
    padding-right: 24px;
    margin-top: 12px;
    .order-text {
      font-size:18px;
      font-weight:400;
      color:rgba(0,0,0,0.65);
      line-height:18px;
    }
    .order-summary-text {
      font-size:20px;
      font-weight:500;
      color:rgba(211,15,57,1);
      line-height:20px;
      margin-left: -5px;
    }
  }
  .title {
    font-size:18px;
    font-weight:bold;
    color:rgba(13,67,118,1);
    line-height:18px;
  }
  .el-radio-group-grid {
    margin: 32px 12px 0px 12px;
    display: grid;
    grid-template-columns: repeat(1, 2fr);
    grid-gap: 24px;
    grid-auto-flow: row;
  }
  .weChart, .aliPay {
    width:526px;
    height:56px;
    background:rgba(255,255,255,1);
    border-radius:6px;
    border:2px solid rgba(229,234,241,1);
    padding: 14px 24px;
    .iconfont {
      font-size: 24px;
      margin-left: 5px;
    }
    .text {
      font-size:14px;
      font-weight:bold;
      color:rgba(63,66,69,1);
      line-height:14px;
      margin-left: 10px;
    }
  }
  .weChart {
    .iconfont {
      color: #3DB034;
    }
  }
  .aliPay {
    .iconfont {
      color: #00A0E9;
    }
  }
  .payment {
    width:96px;
    height:40px;
    background:rgba(13,67,118,1);
    border-radius:4px;
    font-size:14px;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:14px;
    margin-top: 56px;
  }
</style>
<style lang="scss" scoped>
  $bg: #fff;
  $mwidth: 1088px;
  .wrapper {
    padding: 12px;
    font-family:PingFangSC-Medium,PingFang SC;
  }
  .payment-top {
    width: 100%;
    background: $bg;
    border-radius: 6px;
    max-width: $mwidth;
    margin: 0 auto 24px;
    height:92px;
    padding: 24px;
  }
  .payment-content {
    width: 100%;
    background: $bg;
    border-radius: 6px;
    max-width: $mwidth;
    margin: 0 auto;
    padding: 24px;
  }

</style>
