<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="UserName">User Name:</label>
        <input 
          type="text"
          v-model="form.UserName"
          @keyup="clearError"
          :disabled="loading"
          id="UserName"
          ref="UserName"
          placeholder="homebody23"
          required
        >
      </div>
      <div>
        <label for="Password">Password</label>
        <input 
          type="password"
          v-model="form.Password"
          @keyup="clearError"
          :disabled="loading"
          id="Password"
          ref="Password"
          placeholder="********"
          required
        >
      </div>
      <p v-if="hasError">Whoops! Try Again...</p>
      <button
        :disabled="loading"
        type="submit"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  layout: 'auth',
  data() {
    return {
      loading: false,
      error: '',
      form: {
        UserName: '',
        Password: '',
      }
    }
  },
  computed: {
    hasError() {
      return this.error !== ''
    }
  },
  mounted() {
    this.$refs.UserName.focus()
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    clearError() {
      this.error = ''
    },
    onSubmit() {
      this.loading = true
      this.login(this.form)
      .then(() => {
        this.loading = false
        this.$router.push('/')
      })
      .catch(error => {
        this.loading = false
        this.error = error.response.message
        this.form.password = ''
      })
    }
  }
}
</script>
