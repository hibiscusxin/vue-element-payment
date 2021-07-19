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
        data: 'weixin://zhifu'
      }
    }
  },
  {
    url: '/vue-admin-template/cart/paymentAli',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: '<form name=\\"nmae_form\\" method=\\"post\\" action=\\"https://openapi.alipay.com/qiqibaba;}\\">\\n<input type=\\"ddd\\" value=\\"dd\\" style=\\"display:none\\" >\\n</form>\\n<script>document.forms[0].submit();</script>'
      }
    }
  }
]
