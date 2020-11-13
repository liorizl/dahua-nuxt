<template>
    <div>
        <item-art-list :artList="artList"></item-art-list>
        <pagination-com :pageMes="pageMes"></pagination-com>
    </div>
</template>

<script>
import webConfig from '~/web-config.js'
import PaginationCom from '~/components/pagination'
import itemArtList from '~/components/ItemArtList'
export default {
    components: {
        PaginationCom,
        itemArtList
    },
    watchQuery: ['page'],
    async asyncData({query, $axios, app, store}) {
        const page = parseInt(query.page) || 1
        let len = store.state.artsWithColArr.length || 0
        if (len === 0) {
            await app.$myUtil.getGloList($axios, '/getNavLists', webConfig.itemId)
            len = store.state.artsWithColArr.length
        }
        return app.$myUtil.getArtsInCol(webConfig.itemId, page, webConfig.count).then(res => {
            return {
                artList: res.arts,
                pageMes : {
                    page,
                    pageCount: Math.ceil(len / webConfig.count),
                    tempName: 'index-' + webConfig.itemName ,
                    params: {}
                }
            }
        })
    },
    fetch ({store, params}) {
    },
    data() {
        return {
           itemId: webConfig.itemId 
        }
    }
}
</script>
<style  scoped>
</style>