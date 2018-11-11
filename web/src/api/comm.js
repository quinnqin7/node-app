import request from '@/utils/request'



//sendfeedback
export function sendfeedback(content) {
    return request({
        url: '/api/comm/sendfeedback',
        method: 'post',
        data:{
            content:content,
        }
    })
}


//getRoleCount
export function getRoleCount() {
    return request({
        url: '/api/comm/getRoleCount',
        method: 'post',
        data:{
        }
    })
}
