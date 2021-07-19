const list = {
  validList: [
    {
      id: 11,
      selected: false,
      image: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      styleName: '我是名字名字名字名字啊',
      tags: ['tags1', 'tags2', 'tags3'],
      createTime: 15423343322,
      price: 12
    },
    {
      id: 12,
      selected: false,
      image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      styleName: '我是名字啊',
      tags: ['tags1', 'tags2', 'tags3', 'tags11', 'tags12', 'tags13', 'tags21', 'tags22', 'tags23', 'tags31', 'tags32', 'tags33', 'tags41', 'tags42', 'tags43'],
      createTime: 15423343322,
      price: 13
    }
  ],
  invalidList: [
    {
      id: 21,
      selected: false,
      image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      styleName: '我是名字名字名字名字啊我是名字名字名字名字啊我是名字名字名字名字啊我是名字名字名字名字啊我是名字名字名字名字啊',
      tags: ['tags1', 'tags2', 'tags3', 'tags11', 'tags12', 'tags13', 'tags21', 'tags22', 'tags23'],
      createTime: 15423343322,
      price: 11
    }
  ]
}

module.exports = [
  {
    url: '/vue-admin-template/cart/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: list
      }
    }
  },
  {
    url: '/vue-admin-template/cart/paymentWe',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'weixin://wxpay/bizpayurl?pr=XINgqOdzz'
      }
    }
  },
  {
    url: '/vue-admin-template/cart/paymentAli',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: '<form name=\\"punchout_form\\" method=\\"post\\" action=\\"https://openapi.alipay.com/gateway.do?charset=UTF-8&method=alipay.trade.page.pay&sign=LDKInCtoeVn5Hdf7ComtMs%2Fy24BbR910sSx0DeyqlTZ0RMtrkyMjnhd5EnfYPwD7qhb9JC8zgVq3sF275KJkMKdzC%2F8MdZKkWzGLdgoKe8A2FQnDtYgLebCs7cF0FCR87FLWI5pbgmbF0uJyyrvnRyGPUVkvwsIZio6jAwvbPwU7cfrOoULjVJxoW3qKd7e7Td63ArzmR8eapVjTNNZBRUEVFkLy1X%2Fen230Y1LgrJqo%2F98T2brW%2F%2FKVRGDyq7tTgQv%2BVKNCnQnUajRJkiOJ2rm2mS%2FC2r7r0YLO65LufswOdLmxCeQnQLwC3ETfw1NL0F5jV1ksrBXYyvmPSfa83Q%3D%3D&return_url=http%3A%2F%2F47.99.69.35%3A10201%2Fsc-payment%2Falipay%2FalipayReturn&notify_url=http%3A%2F%2F47.99.69.35%3A10201%2Fsc-payment%2Falipay%2FalipayNotify&version=1.0&app_id=2019083066705526&sign_type=RSA2&timestamp=2021-04-19+17%3A58%3A33&alipay_sdk=alipay-sdk-java-4.8.103.ALL&format=json\\">\\n<input type=\\"hidden\\" name=\\"biz_content\\" value=\\"{&quot;out_trade_no&quot;:&quot;2021041917583348128&quot;,&quot;product_code&quot;:&quot;FAST_INSTANT_TRADE_PAY&quot;,&quot;total_amount&quot;:0.01,&quot;subject&quot;:&quot;1次AI测款测试&quot;,&quot;callback_url&quot;:&quot;https://api.zltzzht.com/microservice-buyer/recharge/callback&quot;}\\">\\n<input type=\\"submit\\" value=\\"立即支付\\" style=\\"display:none\\" >\\n</form>\\n<script>document.forms[0].submit();</script>'
      }
    }
  }
]
