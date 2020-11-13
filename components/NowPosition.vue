<template>
    <div class="page-posi">
        <nuxt-link to="/">网站首页 /</nuxt-link>
        <span v-if="nowPosi.isItem">
            <nuxt-link :to="'./' + itemName">大华项目</nuxt-link>
        </span>
        <span >
            <nuxt-link :to="{name: nowPosi.temp, params: nowPosi.params}">{{nowPosi.title}}</nuxt-link>
        </span>
        <span>
            浏览文章
        </span>
    </div>
</template>

<script>
import webConfig from '~/web-config.js'
export default {
    props: {
        nowPosi: {}
    },
    data() {
        return {
            itemName: webConfig.itemName
        }
    },
    created() {
    }
}
</script>
<style  scoped>
</style>