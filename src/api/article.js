import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://localhost:5000/article/listAll',
    method: 'get',
    params
  })
}

export function updateArticle(data) {
  return request({
    url: 'http://localhost:5000/article/update',
    method: 'post',
    data
  })
}

export function createArticle(data) {
  return request({
    url: 'http://localhost:5000/article/insert',
    method: 'post',
    data
  })
}

export function deleteArticle(params) {
  return request({
    url: 'http://localhost:5000/article/removeById',
    method: 'delete',
    params
  })
}
