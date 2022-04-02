import { createStore } from 'vuex'
import router from '../router'
import { getUsers } from '../services/users'

const store = createStore({
    state: {
        loginStatus: Number(localStorage.getItem('loginStatus') || 0),
        users: null,
    },
    getters: {
        isAuthenticated: state => state.loginStatus === 1,
        loginError: state => {
            switch (state.loginStatus) {
                case -1:
                    return 'Invalid username or password. Try: admin/1234'
                case -2:
                    return 'User not found'
                default:
                    return ''
            }
        },
        loadingUsers: state => state.users === null,
        users: state => state.users ?? [],
    },
    mutations: {
        LOGIN_SUCESS(state) {
            state.loginStatus = 1
        },
        LOGIN_FAIL(state, error = -1) {
            state.loginStatus = error
        },
        LOGOUT(state) {
            state.loginStatus = 0
        },
        SAVE_USERS(state, users) {
            state.users = users
        }
    },
    actions: {
        login({ commit }, { username, password }) {
            if (username === 'admin' && password === '1234') {
                commit('LOGIN_SUCESS')
                localStorage.setItem('loginStatus', 1)
                router.push('/')
            } else {
                commit('LOGIN_FAIL', -1)
            }
        },
        logout({ commit }) {
            commit('LOGOUT')
            localStorage.clear()
            router.push('/login')
        },
        loadUsers({ commit, state }) {
            if (state.loadingUsers) {
                return
            }
            commit('SAVE_USERS', null)
            getUsers().then(users => {
                commit('SAVE_USERS', users)
            }).catch(() => {
                commit('SAVE_USERS', [])
            })
        },
    }
})

export default store
