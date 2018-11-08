import request from '@/utils/request'

//getHistoryCase

export function getHistoryCase(token) {
    return request({
        url: '/api/patient/getHistoryCase',
        method: 'post',
        data:{
            token:token
        }
    })
}
