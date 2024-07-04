// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, vscode: { reuseExistingServer: true } },
  routeRules: {

  },
  
  modules: ['@nuxtjs/tailwindcss'],
});