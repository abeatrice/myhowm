<template>
  <div>
    <h1>Recipes</h1>
    <ul class="mt-5">
      <li v-for="recipe in recipes" :key="recipe.ID">{{recipe.Name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: []
    }
  },
  mounted() {
    let baseUrl = process.env.apiBaseURL || 'http://127.0.0.1:3000'
    this.$axios.$get(baseUrl + "/recipes")
      .then(res => this.recipes = res.data)
  },
}
</script>
