import { login, patientlogin, logout, getInfo, register } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import gravatar from 'gravatar'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
            // setup local Cookies
          setToken(data.token)
          commit('SET_TOKEN', data.token)
            // FIXME my gravatar
            //commit('SET_AVATAR',gravatar.url('egguipp@gmail.com',{s: '200', r: 'pg', d: 'mm'}))
            localStorage.setItem('header',data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
      patientLogin({ commit }, userInfo) {
          const username = userInfo.username.trim()
          return new Promise((resolve, reject) => {
              patientlogin(username, userInfo.password).then(response => {
                  const data = response.data
                  // setup local Cookies
                  console.log(data.token)
                  setToken(data.token)
                  commit('SET_TOKEN', data.token)
                  // FIXME my gravatar
                  commit('SET_AVATAR',gravatar.url('egguipp@gmail.com',{s: '200', r: 'pg', d: 'mm'}))
                  resolve()
              }).catch(error => {
                  reject(error)
              })
          })
      },


      Register({ commit }, userInfo) {
          const username = userInfo.username.trim()
          return new Promise((resolve, reject) => {
              register(username, userInfo.password,userInfo.role).then(response => {
                  const data = response.data
                  // setup local Cookies
                  setToken(data.token)
                  commit('SET_TOKEN', data.token)
                  // FIXME my gravatar
                  //commit('SET_AVATAR',gravatar.url('egguipp@gmail.com',{s: '200', r: 'pg', d: 'mm'}))
                  resolve()
              }).catch(error => {
                  reject(error)
              })
          })
      },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
            localStorage.setItem('header',data.header)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
      //邮箱登录 跳转
      MailJump({ commit }, token) {
          //const username = userInfo.username.trim()
          return new Promise((resolve, reject) => {
                  // setup local Cookies
                  setToken(token)
                  commit('SET_TOKEN',token)
                  // FIXME my gravatar
                  //commit('SET_AVATAR',gravatar.url('egguipp@gmail.com',{s: '200', r: 'pg', d: 'mm'}))
                  resolve()
          })
      },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
            localStorage.setItem('header','')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
