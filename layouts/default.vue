<template>
  <div id="main">
    <my-header/>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
const MyFooter = () => import('~/components/Footer.vue')
const MyHeader = () => import('~/components/Navbar.vue')

export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
