const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Jirawat.R',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My website' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css' }
    ]
  },
  loading: '~/components/loading.vue',
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.scss',
    '~/assets/css/custom.scss'
  ],
  router: {
    linkActiveClass: '',
    linkExactActiveClass: 'is-active'
  },
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'moment', 'chart.js', 'vue-chartjs'],
    maxChunkSize: 300000,
    extractCSS: {
      allChunks: true
    },
    analyze: {
      analyzerMode: 'static'
    },
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    },
    plugins: [
      new webpack.ContextReplacementPlugin(
        /moment[\\/\\]locale$/,
        /en|th/
      )
    ]
  }
}
