import axios from '@nuxtjs/axios'

const state = {
    user: JSON.parse(localStorage.getItem('user')) || null
}

const getters = {
    authToken(state) {
        return state.user.token || null
    },
    loggedIn(state) {
        return state.user !== null
    },
    userName(state) {
        if (state.user == null) {
            return ''
        }
        return state.user.userName
    }
}

const actions = {
    register({commit}, form) {
        return new Promise((resolve, reject) => {
            axios.post('http://127.0.0.1:3000/users/register', {
                UserName: form.UserName,
                Email: form.Email,
                Password: form.Password
            })
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data))
                commit('loggedIn', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    login({commit}, form) {
        return new Promise((resolve, reject) => {
            axios.post('http://127.0.0.1:3000/users/login', {
                UserName: form.UserName,
                Password: form.Password
            })
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data))
                commit('loggedIn', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        })
    }
}

const mutations = {
    loggedIn: (state, user) => state.user = user,
    loggedOut: (state) => state.user = null
}

export default {
    state,
    getters,
    actions,
    mutations
}
