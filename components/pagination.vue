<template>
    <div class="pagetion">
        <template v-if="pageMes.page===1">
            <span class="page-act cannotlink">上一页</span>
        </template>
        <template v-else>
            <span class="page-act canlink">
                <nuxt-link :to="{name: pageMes.tempName, params: pageMes.params, query:{page: pageMes.page - 1}}">上一页</nuxt-link>
            </span>
        </template>
        <template v-for="n in pageMes.pageCount">
            <span class="page-no" :class="n === pageMes.page ? 'pagenow' : ''">
                <template v-if="n === pageMes.page">
                    {{n}}
                </template>
                <template v-else>
                    <nuxt-link :to="{name: pageMes.tempName, params: pageMes.params, query: {page: n}}">{{n}}</nuxt-link>
                </template>
            </span>
        </template>
        <template v-if="pageMes.page === pageMes.pageCount">
            <span class="page-act cannotlink">下一页</span>
        </template>
        <template v-else>
            <span class="page-act canlink">
                <nuxt-link :to="{name: pageMes.tempName, params: pageMes.params, query: {page: pageMes.page + 1}}">下一页</nuxt-link>
            </span>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        pageMes: {
            page: Number,
            pageCount: Number,
            tempName: String,
            id: Number,
        }
    },
    created() {
    }
}
</script>
<style  scoped>
</style>