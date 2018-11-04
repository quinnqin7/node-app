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
