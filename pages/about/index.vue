<template>
  <main class="section">
    <div class="container">
      <breadcrumb/>
      <h1 class="title has-text-centered is-size-4-mobile">
        <div class="topic">About</div>
      </h1>
      <div class="columns">
        <div class="column is-5 has-text-centered">
          <div class="is-flex is-horizontal-center">
            <figure class="image is-128x128">
              <img src="~assets/img/profile.jpg" class="profile" alt="profile">
            </figure>
          </div>
          <h1 class="title">Jirawat Ruenanukul</h1>
          <h2 class="subtitle">amplifiers9@gmail.com</h2>
        </div>
        <div class="column is-7">
          <div class="content">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione, quidem ducimus. Odit voluptatem, nam a laudantium doloribus eius delectus eum fugit hic illo magnam consectetur illum rerum. Suscipit, id soluta?
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
const breadcrumb = () => import('~/components/Breadcrumb.vue')
export default {
  name: 'About',
  head () {
    return {
      title: 'About'
    }
  },
  components: {
    breadcrumb
  }
}
</script>

<style lang="scss" scoped>
.profile {
  border-radius: 100%;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  box-shadow: 0 0 0 3px #fff, 0 0 0 4px #999, 0 2px 5px 4px rgba(0,0,0,.2);
  -moz-box-shadow: 0 0 0 3px #fff, 0 0 0 4px #999, 0 2px 5px 4px rgba(0,0,0,.2);
  -webkit-box-shadow: 0 0 0 3px #fff, 0 0 0 4px #999, 0 2px 5px 4px rgba(0,0,0,.2);
}

.is-horizontal-center {
  justify-content: center;
}
</style>
