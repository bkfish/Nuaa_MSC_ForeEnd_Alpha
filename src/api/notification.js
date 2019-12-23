import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://localhost:5000/notification/listAll',
    method: 'get',
    params
  })
}

export function updateNotification(data) {
  return request({
    url: 'http://localhost:5000/notification/update',
    method: 'post',
    data
  })
}

export function createNotification(data) {
  return request({
    url: 'http://localhost:5000/notification/insert',
    method: 'post',
    data
  })
}

export function deleteNotification(params) {
  return request({
    url: 'http://localhost:5000/notification/removeById',
    method: 'delete',
    params
  })
}
