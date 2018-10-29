import request from '@/utils/request'
import api from './path'

export function login(email, pwd) {
  return request({
    url: api.path.user.login,
    method: 'post',
    data: {
        email,
        pwd
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/getInfo',
    method: 'post',
      data: {
          token
      }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post',

  })
}

export function register(email, pwd, role){
    return request({
        url: '/api/user/register',
        method: 'post',
        data: {
            email,
            pwd,
            role
        }
    })
}
