import request from "@/utils/request"

export function getList(params) {
  return request({
    url: "http://106.15.177.94:5000/departmentUser/getAllDepartmentUserDao",
    method: "get",
    params
  })
}

export function updateDepartment(data) {
  return request({
    url: "http://106.15.177.94:5000/departmentUser/update",
    method: "post",
    data
  })
}

export function createDepartment(data) {
  return request({
    url: "http://106.15.177.94:5000/departmentUser/insert",
    method: "post",
    data
  })
}

export function deleteDepartment(params) {
  return request({
    url: "http://106.15.177.94:5000/departmentUser/removeById",
    method: "delete",
    params
  })
}
