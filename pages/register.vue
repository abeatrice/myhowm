<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="UserName">User Name</label>
        <input 
          type="text"
          v-model="form.UserName"
          :disabled="loading"
          @keyup="clearError('UserName')"
          :class="{'border-red-500': hasError('UserName') }"
          id="UserName"
          ref="UserName"
          placeholder="howmBody23"
          required
        >
        <p v-if="hasError('UserName')">{{errors.UserName}}</p>
      </div>
      <div>
        <label for="Email">Email</label>
        <input 
          type="email"
          v-model="form.Email"
          :disabled="loading"
          @keyup="clearError('Email')"
          :class="{'border-red-500': hasError('Email') }"
          id="Email"
          ref="Email"
          placeholder="janedoe@email.com"
          required
        >
        <p v-if="hasError('Email')">{{errors.Email}}</p>
      </div>
      <div>
        <label for="Password">Password</label>
        <input 
          type="password"
          v-model="form.Password"
          :disabled="loading"
          @keyup="clearError('Password')"
          :class="{'border-red-500': hasError('Password') }"
          id="Password"
          ref="Password"
          placeholder="********"
          required
        >
        <p v-if="hasError('Password')">{{errors.Password}}</p>
      </div>
      <div>
        <label for="PasswordConfirm">Confirm Password</label>
        <input
          type="password"
          v-model="form.PasswordConfirm"
          :disabled="loading"
          @keyup="clearError('PasswordConfirm')"
          :class="{'border-red-500': hasError('PasswordConfirm') }"
          id="PasswordConfirm"
          ref="PasswordConfirm"
          placeholder="********"
          required
        >
        <p v-if="hasError('PasswordConfirm')">{{errors.PasswordConfirm}}</p>
      </div>
      <button
        :disabled="loading"
        type="submit"
      >
        Sign up
      </button>
    </form>
    <div>
      <p>Already have an account?</p>
      <nuxt-link to="/login">Log in</nuxt-link>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  auth: 'guest',
  layout: 'auth',
  data() {
    return {
      loading: false,
      errors: {
        UserName: '',
        Email: '',
        Password: '',
        PasswordConfirm: '',
      },
      form: {
        UserName: '',
        Email: '',
        Password: '',
        PasswordConfirm: '',
      }
    }
  },
  computed: {
  },
  mounted() {
    this.$refs.UserName.focus()
  },
  methods: {
    ...mapActions({
      register: 'auth/register'
    }),
    hasError(field) {
      return this.errors[field] !== ''
    },
    clearError(field) {
      this.errors[field] = ''
    },
    onSubmit() {
      this.loading = true
      if(this.formIsValid()) {
        this.register(this.form)
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          this.loading = false
          this.errors.message = error
        })
      }
    },
    formIsValid() {
      return true
    }
  }
}
</script>
