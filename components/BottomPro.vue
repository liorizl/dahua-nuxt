<template>
    <div class="bottom-pro clearfix">
        <div class="bottom-pro-c clearFix">
            <div class="bottom-pro-contact">
                <h2>联系我们</h2>
                <p>四川省成都市东城根上街99号</p>
                <p>028-86693687</p>
                <div class="contact-icon">
                    <i class="wx">
                        <div class="erwei-big">
                            <div class="btmWxArrow"></div>
                            <div class="btmWxCon">
                                <img src="~/static/images/erwei.jpg" alt="">
                            </div>
                        </div>
                    </i>
                </div>
            </div>
            <div class="bottom-pro-item">
                <dl>
                    <template v-for="(col, index) in colList">
                        <dt v-if="index === 0">
                            <nuxt-link :to="'/'+itemName">{{col.title}}</nuxt-link>
                        </dt>
                        <dd v-else>
                            <nuxt-link :to="{name: 'index-alias', params: {alias: col.alias}}">{{col.title}}</nuxt-link>
                        </dd>
                    </template>
                </dl>
                <template v-for="(col, index) in colList[0].haveChild.slice(0, 7)">
                    <dl v-if="col.isNav==='true'">
                        <dt>
                            <nuxt-link :to="{name: 'index-' + itemName + '-alias', params: {xm: itemName, alias: col.alias}}">{{col.title}}</nuxt-link>
                        </dt>
                        <template v-if="col.haveChild">
                            <dd v-for="col1 in col.haveChild">
                                <nuxt-link :to="{name: 'index-' + itemName + '-alias-aliasOrId', params: {xm: itemName, alias: col.alias, aliasOrId: col1.alias}}">
                                    {{col1.title}}
                                </nuxt-link>
                            </dd>
                        </template>
                    </dl>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import webConfig from '~/web-config.js'
export default {
    scrollToTop: true,
    data() {
        return {
            colList: null,
            itemName: webConfig.itemName
        }
    },
    created() {
        this.colList = this.$store.state.colList
    }
}
</script>
<style lang="less">
.bottom-pro-item a.nuxt-link-active {
    color: #fff !important;
}
.bottom-pro-item a.nuxt-link-exact-active {
    color: #fff !important;
}
</style>
