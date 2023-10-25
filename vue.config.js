const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pwa: {
    name: "Laziri",
    themeColor: "#ededed",
    msTileColor: "#ededed",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#ffffff",
  },
})
