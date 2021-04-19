import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/cart/list',
    method: 'get',
    params
  })
}

// 微信支付
export function paymentWe() {
  return request({
    url: '/vue-admin-template/cart/paymentWe',
    method: 'post'
  })
}

// 支付宝支付
export function paymentAli() {
  return request({
    url: '/vue-admin-template/cart/paymentAli',
    method: 'post'
  })
}
