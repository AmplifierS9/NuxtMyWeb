<template>
  <section class="container section has-text-centered">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title has-text-centered">
      <div class="topic">{{ error.statusCode }}</div>
    </h1>
    <h2 class="info has-text-centered">
      {{ error.message }}
    </h2>
    <nuxt-link class="button is-danger" to="/" v-if="error.statusCode === 404">
      Go to HomePage
    </nuxt-link>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: this.error.statusCode
    }
  },
  props: ['error']
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
