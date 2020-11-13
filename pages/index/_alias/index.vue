<template>
    <div class="column-c-list column-left">
        <ul >
            <li v-for="art in artList">
                <div class="column-list-li-img">
                    <nuxt-link :to="'./'+art.id">
                        <template v-if="art.picUrl">
                            <img :src="art.picUrl" alt="">
                        </template>
                        <template v-else>
                            <img src="~/static/images/pro1.jpg" alt="">
                        </template>
                    </nuxt-link>
                </div>
                <h2>
                    <nuxt-link :to="{name: 'index-alias-artid', params: {artid: art.id}}">
                        {{formatWord(art.title, 'title')}}
                    </nuxt-link>
                    </h2>
                <p class="column-list-li-time">发布日期:{{timeFormat(art.upTime)}}</p>
                <p class="column-list-li-intro" v-html="formatWord(art.intro, 'intro')"></p>
                <nuxt-link :to="{name: 'index-alias-artid', params: {artid: art.id}}" class="column-list-li-more">
                    查看详细
                </nuxt-link>
            </li>
            
        </ul>
        <pagination-com :pageMes="pageMes"></pagination-com>
    </div>
</template>

<script>
import '~/assets/css/column.less'
import webConfig from '~/web-config.js'
import PaginationCom from '~/components/pagination'
import utilClient from '~/assets/js/util-client'
export default {
    watchQuery: ['page'],
    scrollToTop: true,
    components: {
        PaginationCom
    },
    async asyncData({ params, query, $axios}) {
        const page = parseInt(query.page) || 1
        let colMesAsync = $axios.get('/getColMes?alias='+ params.alias)
        let artListAsync = $axios.get('/getArtInCol?alias='+ params.alias + '&page=' + page + '&count=' + webConfig.count)
        let [colMes, artList] = await Promise.all([colMesAsync, artListAsync])
        return {
                artList: artList.data.artList,
                colMes: colMes.data,
                pageMes: {
                    page,
                    pageCount: Math.ceil(artList.data.resCount / webConfig.count),
                    tempName: 'index-alias',
                    id: params.id
                }
            }

    },
    fetch({store, params}) {
    },
    head() {
        return {
            title: this.colMes.title + '-' + this.$store.state.webSetting.webName,
            meta: [
                {
                    hid: 'keyword',
                    name: 'keyword',
                    content: this.colMes.keywords || this.$store.state.webSetting.keyword
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.colMes.description || this.$store.state.webSetting.description
                }
            ]
        }
    },
    methods: {
        timeFormat(str) {
            return utilClient.timeFormat(str)
        },
        formatWord(str, cate) {
            let num = cate === 'title' ? 8 : 50
            if (str.length > num)  return str.substr(0, num) + '...'
            else return str.substr(0, num)
        },
    }
}
</script>
<style  scoped>
</style>