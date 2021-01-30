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
          placeholder="howmBody23"
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
    <div>
      <p>Don't have an account?</p>
      <nuxt-link to="/register">Sign up</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
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
    clearError() {
      this.error = ''
    },
    async onSubmit() {
      await this.$auth.login({data: this.form})
        .then(response => this.$auth.setUser(response.data.data))
        .catch(error => console.log(error))
    }
  }
}
</script>
