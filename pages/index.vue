<template>
    <div class="container">
        <top-com />
        <header-com />
        <nav-com :colList="colList" :recom="recom"> </nav-com>
        <slider-com :bannerList="bannerList"></slider-com>
        <nuxt-child />
        <bottom-pro />
        <footer-com />
    </div>
</template>

<script>
import topCom from '~/components/top'
import headerCom from '~/components/head'
import navCom from '~/components/nav'
import sliderCom from '~/components/slider'
import bottomPro from '~/components/BottomPro'
import footerCom from '~/components/foot'
import webConfig from '~/web-config.js'
export default {
    components: {
        topCom,
        headerCom,
        navCom,
        sliderCom,
        bottomPro,
        footerCom,
    },
    middleware: 'initStore',
    head() {
        return {
            title: this.$store.state.webSetting.webName,
            meta: [
                {
                    hid: 'keyword',
                    name: 'keyword',
                    content: this.$store.state.webSetting.keyword
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$store.state.webSetting.description
                }
            ]
        }
    },
    async asyncData({ params, $axios, store, app }) {
        let bannerAsync = $axios.get('/getBanner')
        let navAsync = app.$myUtil.getGloList($axios, '/getNavLists', webConfig.itemId)
        let recomAxios = $axios.get('/getRecom?scope=xm')
        return Promise.all([bannerAsync, navAsync, recomAxios]).then(([banner, nav, recom]) => {
            let bannerList = []
            bannerList = banner.data.filter(b => {
                return b.pcurl
            })
            return {
                bannerList,
                colList: nav,
                recom: recom.data
            }
        })
        
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            setTimeout(() => this.$nuxt.$loading.finish(), 3000)
        })
    },
}
</script>

<style></style>
