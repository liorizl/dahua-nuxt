<template>
    <div class="container">
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
import utilClient from '~/assets/js/util-client'
import recommend from '~/components/recommend'
import '~/assets/css/item-c.less'

export default {
    components: {
        topCom,
        headerCom,
        navCom,
        itemAdjArt,
        nowPosition,
        recommend,
        bottomPro,
        footerCom,
    },
    async validate({params, $axios}) {
        if (/^\d+$/.test(params.artid)) {
            return new Promise(resolve => {
                $axios.get('/valiArtInCol?id=' + params.artid + '&alias=' + params.aliasOrId).then(res => {
                    resolve(res.data.artInCol)
                }).catch(err => {
                    resolve(false)
                })
            })
        } else {
            return false
        }
    },
    async asyncData({ params, $axios, app }) {
        const colId = await app.$myUtil.getColId(params.aliasOrId)
        const artAdjAxios = app.$myUtil.getItemArtAdj(colId, parseInt(params.artid))
        const recomAxios = await $axios.get('/getRecom?scope=xm')
        const artConAxios = $axios.get('/getArtCon?id=' + params.artid)
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
                    temp: 'index-'+webConfig.itemName+'-alias-aliasOrId-artid',
                    preParams: preArt ? { alias: params.alias, aliasOrId: params.aliasOrId, artid: preArt.id} : null, 
                    nextParams: nextArt? { alias: params.alias, aliasOrId: params.aliasOrId, artid: nextArt.id } : null, 
                    preArt, 
                    nextArt
                }
            }
        })
    },
    head() {
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
    },
    data() {
        return {
        }
    },
    created() {
        
    },
    mounted() {
        utilClient.clearActive(this.$route.params.alias)
        utilClient.clearActive(this.$route.params.aliasOrId)
        this.$axios({
            url: '/showHit?id=' + this.$route.params.artid + '&add=1'
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
}
</script>
<style  scoped>
</style>