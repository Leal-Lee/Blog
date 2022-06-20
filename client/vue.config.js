const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir:'../dist/public',
  devServer: {

    proxy: {
      '/api': {
        target: process.env.VUE_APP_SERVERPATH,
      },


    }

  },
})
