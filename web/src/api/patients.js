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

//assessCase
export function assessCase(rate, content, doctorId, caseId) {
    return request({
        url: '/api/patient/assessCase',
        method: 'post',
        data:{
            rate:rate,
            content:content,
            doctorId:doctorId,
            caseId:caseId
        }
    })
}

//getOneRate
export function getOneRate(caseId) {
    return request({
        url: '/api/patient/getOneRate',
        method: 'post',
        data:{
            caseId:caseId
        }
    })
}

//getAllRate
export function getAllRate() {
    return request({
        url: '/api/patient/getAllRate',
        method: 'post',
        data:{

        }
    })
}
