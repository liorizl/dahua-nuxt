<template>
    <nuxt-child></nuxt-child>
</template>

<script>
import topCom from '~/components/top'
import headerCom from '~/components/head'
import navCom from '~/components/nav'
import itemAdjArt from '~/components/ItemAdjArt'
import nowPosition from '~/components/NowPosition'
import bottomPro from '~/components/BottomPro'
import footerCom from '~/components/foot'
import webConfig from '~/web-config'
import '~/assets/css/item-c.less'

export default {
    components: {
        topCom,
        headerCom,
        navCom,
        itemAdjArt,
        nowPosition,
        bottomPro,
        footerCom,
    },
    watchQuery: ['page'],
    async asyncData({ params, $axios, app }) {
        // console.log(params)
        // const colId = await app.$myUtil.getColId(params.alias)
        // const { preArt, nextArt } = await app.$myUtil.getItemArtAdj(colId, parseInt(params.aliasOrId))
        // return $axios.get('/getArtCon?id=' + params.aliasOrId)
        //     .then(res => {
        //         return {
        //             artCon: res.data[0],
        //             adjArt: { temp: 'index-item-alias-aliasOrId', colid: colId, preArt, nextArt}
        //             // nowPosi: { title: colTitle, temp: 'index-item-id', params: { item: 'item', id: params.id }, isItem: true }
        //         }
        //     })
    },
    fetch({ app }) {
    },
    data() {
        return {
        }
    },
    created() {
    },
    mounted() {

    },
    updated() {
    }
}
</script>
<style  scoped>
</style>