<template>
    <div class="container">
        <top-com />
        <header-com />
        <nav-com :colList="colList" :recom="recom"> </nav-com>
        <div class="err-con">
            <div v-if="error.statusCode === 404">
                <h1 class="big">404</h1>
                <h2>页面不存在</h2>
            </div>
            <div v-else>
                <h1>应用发生错误异常</h1>
                <h2>{{error.message}}</h2>
            </div>
        </div>
        <bottom-pro />
        <footer-com />
    </div>
</template>

<script>
import topCom from '~/components/top'
import headerCom from '~/components/head'
import navCom from '~/components/nav'
import bottomPro from '~/components/BottomPro'
import footerCom from '~/components/foot'
import webConfig from '~/web-config.js'
export default {
    components: {
        topCom,
        headerCom,
        navCom,
        bottomPro,
        footerCom,
    },
    props: {
        error: {
            type: Object
        }
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
    data() {
        return {
            colList: null,
            recom: []
        }
    },
    async created() {
        this.colList = this.$store.state.colList
        let recomAxios = this.$axios.get('/getRecom?scope=' + webConfig.itemName)
        if (!this.colList) {
            let navAsync = this.$myUtil.getGloList(this.$axios, '/getNavLists', webConfig.itemId)
            Promise.all([navAsync, recomAxios]).then(([nav, recom]) => {
                this.colList = nav
                this.recom = recom.data
            })
        } else {
            await recomAxios.then(recom => {
                this.recom = recom.data
            })
        }
    },
}
</script>

<style>
.err-con {
    width: 100%;
    text-align: center;
    min-height: 350px;
    border-top: 1px solid #999;
}
h1 {
    color: #b32734;
}
.big {
    font-size: 100px;
    line-height: 120px;
}
</style>
