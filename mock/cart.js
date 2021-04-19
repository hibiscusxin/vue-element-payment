const list = {
  validList: [
    {
      id: 11,
      selected: false,
      image: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      styleName: '正加盟款式名称正加盟款式名称正加盟款式名称正加盟款式名称正加盟款式名称正加盟款式名称正加盟款式名称',
      tags: ['2022', '春夏', 'l连衣裙'],
      createTime: 178987543322,
      price: 120
    },
    {
      id: 12,
      selected: false,
      image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      styleName: 'shaya盟款式名称',
      tags: ['2022', '春夏', 'l连衣裙', '2022', '春夏', 'l连衣裙', '2022', '春夏', 'l连衣裙', '2022', '春夏', 'l连衣裙', '2022', '春夏', 'l连衣裙'],
      createTime: 178987543322,
      price: 130
    }
  ],
  invalidList: [
    {
      id: 21,
      selected: false,
      image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      styleName: '正加盟款式名称正加盟款式名称正加盟款式名称正加盟款式名称正加盟款式名称正加盟款式名称正加盟款式名称',
      tags: ['2022', '春夏', 'l连衣裙', '2022', '春夏', 'l连衣裙', '2022', '春夏', 'l连衣裙', '2022', '春夏', 'l连衣裙', '2022', '春夏', 'l连衣裙'],
      createTime: 178987543322,
      price: 110
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
  }
]
