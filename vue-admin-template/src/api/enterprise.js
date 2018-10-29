import request from '@/utils/request'
import {getToken} from '@/utils/auth'
export function getPatients() {
  return request({
    url: '/api/enterprise/patients',
    method: 'post',
    data:{
        token:getToken()
    }
  })
}
export function getPatient(id) {
    return request({
        url: '/api/enterprise/patients',
        method: 'get',
        params:{id}
    })
}

