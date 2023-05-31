// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    build: {
        transpile: ["three", "@types/three"]
    },
    modules: [ 
        '@vueuse/nuxt',
    ]
})
