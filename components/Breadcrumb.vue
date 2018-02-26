<template>
  <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
    <ul>
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li v-for="data in breadcrumbLink" :key="data.id" :class="data.activeClass">
        <nuxt-link :to="data.path">{{ data.components.default.extendOptions.name }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'breadcrumb',
  computed: {
    breadcrumbLink () {
      let tmp = []
      this.$route.matched.forEach(link => {
        let activeClass = ''
        if (link.path === this.$route.fullPath) {
          activeClass = 'is-active'
        } else if (link.path === '') {
          activeClass = 'is-active'
        }
        tmp.push(Object.assign({ 'activeClass': activeClass }, link))
      })
      return tmp
    }
  }
}
</script>
