<template>
    <div>
        <div class="container" v-if="/^\d/.test($route.params.aliasOrId)">
            <div class="item-intro box-width">
                <div class="item-intro-c">
                    <!-- <now-position :nowPosi="nowPosi"></now-position> -->
                    <div class="item-intro-mes">
                        <div class="item-intro-pic">
                            <img v-if="artCon.picUrl" :src="artCon.picUrl" :alt="artCon.title" />
                            <img v-else src="~/static/images/no-item-pic.jpg" :alt="artCon.title" />
                        </div>
                        <div class="item-intro-word">
                            <div class="item-intro-title">{{artCon.title}}</div>
                            <div class="item-intro-word-c" v-html="artCon.intro">

                            </div>
                            <item-adj-art :adjArt="adjArt"></item-adj-art>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-article-outer">
                <div class="item-article">
                    <div class="item-art-recommend">
                        <div class="item-art-recommend-title">为您推荐</div>
                        <recommend :recommend="recommend"></recommend>
                    </div>
                    <div class="item-art-con">
                        <div class="item-article-con-t">
                            <span>详细信息</span>
                            <div class="art-hits">{{artCon.hits}}</div>
                        </div>
                        <div class="item-article-con-c" v-html="artCon.content">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template v-else>
            <item-art-list :artList="artList"></item-art-list>
            <pagination-com :pageMes="pageMes"></pagination-com>
        </template>
    </div>
</template>

<script>
import PaginationCom from '~/components/pagination'
import itemArtList from '~/components/ItemArtList'
import utilClient from '~/assets/js/util-client'
import recommend from '~/components/recommend'
import webConfig from '~/web-config'
export default {
    watchQuery: ['page'],
    components: {
        PaginationCom,
        recommend,
        itemArtList
    },
    async validate({params, $axios, store}) {
        if (/^\d+$/.test(params.aliasOrId)) {
            return new Promise(resolve => {
                $axios.get('/valiArtInCol?id=' + params.aliasOrId + '&alias=' + params.alias).then(res => {
                    resolve(res.data.artInCol)
                }).catch(err => {
                    resolve(false)
                })
            })
        } else {
            const colList = store.state.colList
            const fatherCol = colList.find(col => {
                return col.alias === webConfig.itemName
            })
            const fatherCol1 = fatherCol.haveChild.find(col => {
                return col.alias === params.alias
            })
            return fatherCol.haveChild.some(col => {
                return col.alias === params.aliasOrId
            })
        }
    },
    async asyncData({params, query, $axios, app}) {
        let colId
        if (/^\d+$/.test(params.aliasOrId)) {
            colId = await app.$myUtil.getColId(params.alias)
            const artAdjAxios = app.$myUtil.getItemArtAdj(colId, parseInt(params.aliasOrId))
            const recomAxios = await $axios.get('/getRecom?scope=xm')
            const artConAxios = $axios.get('/getArtCon?id=' + params.aliasOrId)
            return Promise.all([artAdjAxios, recomAxios, artConAxios]).then(res => {
                const { preArt, nextArt } = res[0]
                const recom = res[1]
                const artCon = res[2]
                return {
                    artCon: artCon.data[0],
                    recommend: {
                        className: 'item-art-recommend-c',
                        picClassName: '',
                        titleClassName: 'item-recomend-t',
                        recom: recom.data
                    },
                    adjArt: { 
                        name: 'item',
                        temp: 'index-'+webConfig.itemName+'-alias-aliasOrId',
                        preParams: preArt ? { alias: params.alias, aliasOrId: preArt.id} : null, 
                        nextParams: nextArt? { alias: params.alias, aliasOrId: nextArt.id } : null, 
                        preArt, 
                        nextArt
                    }
                }
            })
        } else {
            const page = parseInt(query.page) || 1,
            colId = await app.$myUtil.getColId(params.aliasOrId)
            return app.$myUtil.getArtsInCol(colId, page, webConfig.count).then(res => {
                return {
                    artList: res.arts,
                    pageMes : {
                        page,
                        pageCount: Math.ceil(res.num / webConfig.count),
                        tempName: 'index-'+webConfig.itemName+'-alias-aliasOrId',
                        params
                    }
                }
            })
        }
    },
    head() {
        if (/^\d+$/.test(this.$route.params.aliasOrId)) {
            return {
                title: this.artCon.title + '-' + this.$store.state.webSetting.webName,
                meta: [
                    {
                        hid: 'keyword',
                        name: 'keyword',
                        content: this.artCon.keywords || this.$store.state.webSetting.keyword
                    },
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.artCon.description || this.$store.state.webSetting.description
                    }
                ]
            }
        }
    },
    data() {
        return {
            title: null
        }
    },
    created() {
        
    },
    mounted() {
        utilClient.clearActive(this.$route.params.alias)
        if (!/^\d+$/.test(this.$route.params.aliasOrId)) {      //this.$route.params.aliasOrId为字母表示是栏目页，数字为内容页
            utilClient.clearActive(this.$route.params.aliasOrId)
        } else {
            this.$axios({
                url: '/showHit?id=' + this.$route.params.aliasOrId + '&add=1'
            }).then(res => {
                if (res.status === 200) {
                    if (res.data.hits) {
                        // console.log('hits添加成功！')
                    } else {
                        // console.log('hits添加不成功！')
                    }
                }
            }).catch(err => {
                // console.log('hits添加不成功！')
            })
        }
    },
    updated() {
        if (!/^\d+$/.test(this.$route.params.aliasOrId)) {
            utilClient.clearActive(this.$route.params.aliasOrId)
        }
    }
}
</script>
<style  scoped>
</style>