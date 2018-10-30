import request from '@/utils/request'

export function getEnterprises(doctorToken) {
    return request({
        url: '/api/enterprise/getEnterprises',
        method: 'post',
        data:{
            token:doctorToken
        }
    })
}
