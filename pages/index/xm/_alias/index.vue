<template>
    <div>
        <item-art-list :artList="artList"></item-art-list>
        <pagination-com :pageMes="pageMes"></pagination-com>
    </div>
</template>

<script>
import PaginationCom from '~/components/pagination'
import itemArtList from '~/components/ItemArtList'
import webConfig from '~/web-config'
import utilClient from '~/assets/js/util-client'
export default {
    watchQuery: ['page'],
    components: {
        PaginationCom,
        itemArtList
    },
    async validate({params, store}) {
        const colList = store.state.colList
        const fatherCol = colList.find(col => {
            return col.alias === webConfig.itemName
        })
        return fatherCol.haveChild.some(col => {
            return col.alias === params.alias
        })
    },
    async asyncData({params, query, $axios, app, store}) {
        const page = parseInt(query.page) || 1,
            colId = await app.$myUtil.getColId(params.alias)
        return app.$myUtil.getArtsInCol(colId, page, webConfig.count).then(res => {
            return {
                artList: res.arts,
                pageMes : {
                    page,
                    pageCount: Math.ceil(res.num / webConfig.count),
                    tempName: 'index-'+webConfig.itemName+'-alias',
                    params
                }
            }
        })
    },
    fetch ({store, params}) {
    },
    data() {
        return {
            
        }
    },
    created() {
        
    },
    mounted() {
        utilClient.clearActive(this.$route.params.alias)
    }
}
</script>
<style  scoped>
</style>