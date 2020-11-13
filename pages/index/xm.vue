<template>
    <div>
        <ul class="item-ul">
            <li>
                <nuxt-link 
                    :to="{name:'index-'+itemName}"
                    :id="itemName"
                >
                    全部
                </nuxt-link>
            </li>
            <li v-for="item in itemList.haveChild">
                <template v-if="item.haveChild">
                    <nuxt-link 
                        :to="{name: 'index-'+itemName+'-alias', params: {alias: item.alias}}"
                        class="item-more-icon"
                        :id="item.alias"
                    >
                        {{item.title}}
                    </nuxt-link>
                    <ul class="item-more">
                        <li>
                            <nuxt-link 
                                :to="{name: 'index-'+itemName+'-alias', params: {alias: item.alias}}"
                                :id="item.alias"
                            >
                                全部
                            </nuxt-link>
                        </li>
                        <li v-for="child in item.haveChild">
                            <nuxt-link 
                                :to="{name: 'index-'+itemName+'-alias-aliasOrId', params: {alias: item.alias, aliasOrId: child.alias}}"
                                :id="child.alias"
                            >
                                {{child.title}}
                            </nuxt-link>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <nuxt-link 
                        :to="{name: 'index-'+itemName+'-alias', params: {alias: item.alias}}"
                        :id="item.alias"
                    >
                        {{item.title}}
                    </nuxt-link>
                </template>
            </li>
        </ul>
        <nuxt-child></nuxt-child>
    </div>
</template>

<script>
import topCom from '~/components/top'
import headerCom from '~/components/head'
import navCom from '~/components/nav'
import bottomPro from '~/components/BottomPro'
import footerCom from '~/components/foot'
import '~/assets/css/items.less'
import webConfig from '~/web-config.js'
export default {
    components: {
        topCom,
        headerCom,
        navCom,
        bottomPro,
        footerCom,
    },

    data() {
        return {
            itemList: [],
            id: this.$route.params.id,
            itemName: webConfig.itemName,
            title: null
        }
    },
    head() {
        return {
            title: this.title +'-' + this.$store.state.webSetting.webName,
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
    created() {
        let colList = this.$store.state.colList
        if (colList) {
            for (let i = 0; i <= colList.length; i++) {
                if (colList[i].id === webConfig.itemId) {
                   this.itemList = colList[i]
                   this.title = colList[i].title
                   break
                }
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            setTimeout(() => this.$nuxt.$loading.finish(), 3000)
        })
        document.getElementsByClassName('nav-ul')[0].getElementsByTagName('li')[0].getElementsByTagName('a')[0].className = ''
    }
}
</script>
<style scoped></style>
