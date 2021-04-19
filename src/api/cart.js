import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/cart/list',
    method: 'get',
    params
  })
}
