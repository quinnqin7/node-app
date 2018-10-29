import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
    SET_AUTNENTIATED: 'SET_AUTNENTIATED', // 是否认证通过
    SET_USER: 'SET_USER', // 用户信息
    SET_PATIENTUSER: 'SET_PATIENTUSER'
}

var state = { // 需要维护的状态
    isAutnenticated: false,  // 是否认证
    user: {},   // 当解析token后，得到对应的用户信息，存储用户信息
    patinentUserId: ''
}

const getters = {
    isAutnenticated: state => state.isAutnenticated,
    user: state => state.user,
    patinentUserId: state => state.patinentUserId
}

const mutations = {
    [types.SET_AUTNENTIATED](state, isAutnenticated) {
        if (isAutnenticated)
            state.isAutnenticated = isAutnenticated
        else
            state.isAutnenticated = false
    },
    [types.SET_USER](state, user) {
        if (user)
            state.user = user
        else
            state.user = {}
    },
    [types.SET_PATIENTUSER](state, patinentUserId) {
        if (patinentUserId) {
            state.patinentUserId = patinentUserId
        }
        else {
            state.patinentUser = ""
        }
    }
}

//异步操作
const actions = {
    setIsAutnenticated: ({commit}, isAutnenticated) => {
        commit(types.SET_AUTNENTIATED, isAutnenticated)
    },
    setUser: ({commit}, user) => {
        commit(types.SET_USER, user)
    },
    clearCurrentState: ({commit}) => {
        commit(types.SET_AUTNENTIATED, false)
        commit(types.SET_USER, null)
    },
    setpatinentUserId: ({commit}, patinentUserId) => {
        commit(types.SET_PATIENTUSER, patinentUserId)
    },
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
