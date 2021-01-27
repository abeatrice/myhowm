<template>
  <div class="p-5 shadow-b shadow-lg">
    <div class="flex justify-between align-center">
      <div>
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/recipes" class="ml-5">Recipes</nuxt-link>
      </div>
      <div>
        <span id="dropdown" class="flex items-center text-blue-400">
          <span class="mr-3">{{userName}}</span>
          <svg @click="open = !open" class="h-4 w-4 fill-current cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path v-if="!open" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            <path v-else d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
          </svg>
        </span>
        <div v-show="open" class="absolute bg-gray-600 border-none border rounded shadow overflow-hidden">
          <a @click="signOut" class="no-underline block px-2 py-1 font-bold text-gray-800 cursor-pointer">Sign Out</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      open: false,
    }
  },
  computed: {
    ...mapGetters([
      'loggedIn',
      'userName'
    ])
  },
  methods: {
    async signOut() {
      this.open = false
      await this.$store.dispatch('auth/logout')
      .then(() => this.$router.push('/login'))
    }
  },
}
</script>
