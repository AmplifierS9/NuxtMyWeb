<template>
  <header>
    <nav class="navbar is-dark">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            KAAN
          </a>
          <div class="navbar-burger" @click="mobile = !mobile" :class="{ 'is-active': mobile }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': mobile }">
          <div class="navbar-end">
            <nuxt-link to="/" class="navbar-item">Home</nuxt-link>
            <nuxt-link to="/genetic" class="navbar-item">Genetic</nuxt-link>
            <nuxt-link to="/about" class="navbar-item">About</nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      mobile: false
    }
  }
}
</script>

