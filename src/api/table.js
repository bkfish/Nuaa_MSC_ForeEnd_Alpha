import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://106.15.177.94:5000/user/listAll',
    method: 'get',
    params
  })
}

export function updateUser(data) {
  return request({
    url: 'http://106.15.177.94:5000/user/update',
    method: 'post',
    data
  })
}

export function createUser(data) {
  return request({
    url: 'http://106.15.177.94:5000/user/insert',
    method: 'post',
    data
  })
}

export function deleteUser(params) {
  return request({
    url: 'http://106.15.177.94:5000/user/removeById',
    method: 'delete',
    params
  })
}
