import webConfig from './web-config'
export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    generate: {
        subFolders: false,
    },
    mode: 'universal',
    server: {
        host: '127.0.0.1',
        port: 3112
    },
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'static',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        // title: process.env.npm_package_name || '',
        title: '成都大华医学美容医院',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        script: [],
    },
    /*
     ** Global CSS
     */
    css: [
        '@/assets/css/global.less'
    ],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        // {src:'~/plugins/storeCache', ssr: false},
        {src: '~/plugins/util'}
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        // '@nuxtjs/eslint-module',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy'
    ],
    axios: {
        baseURL: webConfig.backendUrl
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {
        extend(config, ctx) {
            // Run ESLint on save
            // if (ctx.isDev && ctx.isClient) {
            //     config.module.rules.push({
            //         enforce: 'pre',
            //         test: /\.(js|vue)$/,
            //         loader: 'eslint-loader',
            //         exclude: /(node_modules)/,
            //         options: {
            //             fix: true
            //         }
            //     })
            // }
        }
    },
    proxy: {
        '/admin': {
            target: webConfig.backendUrl, // 代理地址
            changeOrigin: true,
            pathRewrite: {
                '^/admin': '/admin'
            },
        },
        '/d': {
            target: webConfig.backendUrl,
            //secure: false,
            changeOrigin: true,
            '^/d': '/d'
        },
        '/upfiles': {
          target: webConfig.backendUrl,
          //secure: false,
          changeOrigin: true,
          '^/upfiles': '/upfiles'
        },
    },
    loading: {
        color: 'red',
        height: '2px',
    },
}
