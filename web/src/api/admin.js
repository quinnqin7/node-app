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


//getJournalList
export function getJournalList() {
    return request({
        url: '/api/admin/getJournalList',
        method: 'post',
        data:{
        }
    })
}

//fetchJournalContent
export function fetchJournalContent(journalId) {
    return request({
        url: '/api/admin/fetchJournalContent',
        method: 'post',
        data:{
            journalId:journalId
        }
    })
}

//updateJournal(this.$route.params.journalId,this.content, this.select, this.title,)

export function updateJournal(journalId,content,select,title) {
    return request({
        url: '/api/admin/updateJournal',
        method: 'post',
        data:{
            journalId:journalId,
            content:content,
            select:select,
            title:title
        }
    })
}
