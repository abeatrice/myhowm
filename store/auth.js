export const state = () => ({
    user: JSON.parse(localStorage.getItem('user')) || null
})

export const getters = {
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

export const actions = {
    register({commit}, form) {
        return new Promise((resolve, reject) => {
            this.$axios.$post('http://127.0.0.1:3000/users/register', {
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
            this.$axios.$post('http://127.0.0.1:3000/users/login', {
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
    },
    logout(context) {
        this.$axios.setToken(context.state.user.Token, 'Bearer')
        return new Promise((resolve, reject) => {
            this.$axios.$post('http://127.0.0.1:3000/users/logout')
            .then(response => {
                localStorage.removeItem('user')
                context.commit('loggedOut')
                resolve(response)
            })
            .catch(error => {
                localStorage.removeItem('user');
                context.commit('loggedOut');
                reject(error)
            })
        })
    }
}

export const mutations = {
    loggedIn: (state, user) => state.user = user,
    loggedOut: (state) => state.user = null
}
