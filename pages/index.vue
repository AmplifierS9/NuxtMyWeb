<template>
  <main>
    <div class="overlay bg-center" style="background-image: url('/img/bg_intro.jpg');">
      <article class="pageintro">
        <section class="section has-text-centered">
          <h1 class="title is-1">Jirawat Ruenanukul</h1>
          <h2 class="subtitle">
            Web Dev, Gamer, Sleeper and Retard(Sometime!)
          </h2>
          <nuxt-link to="/about" class="button is-primary is-large is-outlined">About</nuxt-link>
        </section>
      </article>
    </div>
    <section class="section">
      <div class="container">
        <h1 class="title has-text-centered is-size-4-mobile">
          <div class="topic">My Talents</div>
        </h1>
        <div class="columns">
          <div class="column is-4">
            <div class="box">
              <i class="fas fa-3x fa-code"></i>
              <h2 class="title is-4">Programming</h2>
              <h3 class="subtitle">JavaScript, HTML, Node.js, Vue.js, MongoDB, MySQL</h3>
            </div>
          </div>
          <div class="column is-4">
            <div class="box">
              <i class="fas fa-3x fa-gamepad"></i>
              <h2 class="title is-4">Game</h2>
              <h3 class="subtitle">Dota 2 only</h3>
            </div>
          </div>
          <div class="column is-4">
            <div class="box">
              <i class="fas fa-3x fa-rocket"></i>
              <h2 class="title is-4">Interesting</h2>
              <h3 class="subtitle">Find our way to the moon.</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Home',
  head () {
    return {
      title: 'Home'
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  color: #FFFFFF;
  background-color: inherit;
  position: relative;
  z-index: 1;
  &.bg-center {
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  &::after {
    color: inherit;
    background-color: rgba(0,0,0,.55);
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    z-index: -1;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpiYGBgePz//38GRhABAgABBgBFTAbfCBNE2AAAAABJRU5ErkJggg==");
  }
}

.pageintro {
  padding: 80px 0;
  .section {
    .title {
      color: #fff;
    }
    .subtitle {
      color: #fff;
    }
  }
}

.box {
  height: 100%;
  &:hover {
    color: #fff;
    background-color: hsl(171, 100%, 41%);
    box-shadow: 5px 5px 0px rgba(0,0,0,.2);
    i {
      color: #fff;
    }
    .title {
      color: #fff;
      text-transform: uppercase;
    }
    .subtitle {
      color: #fff;
    }
  }
  i {
    color: hsl(171, 100%, 41%);
    margin-bottom: 15px;
  }
}
</style>
