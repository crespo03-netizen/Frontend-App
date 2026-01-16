// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-07-15",
  modules: [
    "@nuxt/ui",
    "nuxt-auth-sanctum",
    "nuxt-phosphor-icons",
    "@nuxtjs/google-fonts",
  ],
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  ui: {
    colorMode: false,
    fonts: false,
  },
  sanctum: {
    baseUrl: "http://localhost:8000",
    endpoints: {
      user: "/api/user",
      login: "/login",
    },
    redirect: {
      onLogin: "/",
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  googleFonts: {
    families: {
      "Plus Jakarta Sans": [200, 300, 400, 500, 600, 700, 800],
    },
    display: "swap",
  },
});
