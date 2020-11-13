<template>
    <ul class="item-col-list">
        <li v-for="art in artList" class="item-col-list-pic">
            <template v-if="art.alias.length > 1">
                <div class="item-col-list-pic">
                    <nuxt-link :to="{name: 'index-'+itemName+'-alias-aliasOrId-artid', params:{alias: art.alias[0], aliasOrId: art.alias[1], artid: art.id}}">
                        <img v-if="art.picUrl" :src="art.picUrl" :alt="art.title" />
                        <img v-else src="~/static/images/no-item-pic.jpg" :alt="art.title" />
                    </nuxt-link>
                </div>
                <div class="item-col-list-title">
                    <nuxt-link :to="{name: 'index-'+itemName+'-alias-aliasOrId-artid', params:{alias: art.alias[0], aliasOrId: art.alias[1], artid: art.id}}">
                        {{art.title}}
                    </nuxt-link>
                </div>
            </template>
            <template v-else-if="art.alias.length = 1">
                <div class="item-col-list-pic">
                    <nuxt-link :to="{name: 'index-'+itemName+'-alias-aliasOrId', params:{alias: art.alias[0], aliasOrId: art.id}}">
                        <img v-if="art.picUrl" :src="art.picUrl" :alt="art.title" />
                        <img v-else src="~/static/images/no-item-pic.jpg" :alt="art.title" />
                    </nuxt-link>
                </div>
                <div class="item-col-list-title">
                    <nuxt-link :to="{name: 'index-'+itemName+'-alias-aliasOrId', params:{alias: art.alias[0], aliasOrId: art.id}}">
                        {{art.title}}
                    </nuxt-link>
                </div>
            </template>
            <template v-else>
                内容格式不正确！
            </template>
        </li>
    </ul>
</template>

<script>
import webConfig from '~/web-config.js'
export default {
    props: ['artList'],
    data() {
        return {
            itemName: webConfig.itemName
        }
    },
}
</script>
<style  scoped>
</style>