import request from '@/utils/request'

export function getDepartmentList(params) {
  return request({
    url: 'http://localhost:5000/department/listAll',
    method: 'get',
    params
  })
}

export function updateDepartment(data) {
  return request({
    url: 'http://localhost:5000/department/update',
    method: 'post',
    data
  })
}

export function createDepartment(data) {
  return request({
    url: 'http://localhost:5000/department/insert',
    method: 'post',
    data
  })
}

export function deleteDepartment(params) {
  return request({
    url: 'http://localhost:5000/department/removeById',
    method: 'delete',
    params
  })
}
