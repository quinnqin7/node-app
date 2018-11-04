import request from '@/utils/request'

export function submitJournal(content,recipient,title,token) {
    return request({
        url: '/api/admin/submitJournal',
        method: 'post',
        data:{
            content:content,
            recipient:recipient,
            title:title,
            token:token
        }
    })
}
