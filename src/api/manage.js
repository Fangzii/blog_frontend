import { axios } from '@/utils/request'

const api = {
  entries: '/v1/entries/',
  user: '/v1/users/',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  messageBoard: '/v1/messageboard'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.entries,
    method: 'get',
    params: parameter
  })
}

export function getBlogDetail (id, parameter) {
  return axios({
    url: api.entries + id + '/',
    method: 'get',
    params: parameter
  })
}

export function getMessageBoard (id, parameter) {
  return axios({
    url: api.entries + id + '/message/',
    method: 'get',
    params: parameter
  })
}

export function getUserInformatization (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

export function setMessage (id, parameter) {
  return axios({
    url: api.entries + id + '/set_message/',
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}
