<template>
    <div class="column-content column-left">
        <now-position :nowPosi="nowPosi"></now-position>
        <div class="column-content-title">
            <h2>{{artCon.title}}</h2>
            <div class="column-content-title-info">
                <span class="col-c-uptime">{{artCon.upTime}}</span>
                <span class="col-c-author">{{artCon.author}}</span>
                <span class="col-c-viewNum">{{artCon.hits}}</span>
                <!-- <span class="col-c-star">{{artCon.stars}}</span> -->
            </div>
        </div>
        <article class="column-content-art" v-html="artCon.content">
        </article>
        <item-adj-art :adjArt="adjArt"></item-adj-art>
    </div>
</template>

<script>
import itemAdjArt from '~/components/ItemAdjArt'
import webConfig from '~/web-config'
import '~/assets/css/column.less'
export default {
    async validate({params, $axios}) {
        if (/^\d+$/.test(params.artid)) {
            return new Promise(resolve => {
                $axios.get('/valiArtInCol?id=' + params.artid + '&alias=' + params.alias).then(res => {
                    resolve(res.data.artInCol)
                }).catch(err => {
                    resolve(false)
                })
            })
        } else {
            return false
        }
    },
    async asyncData({params, $axios, store, app, ctx}) {
        const colMes = await app.$myUtil.getColTitle(params.alias, store.state.colList)
        let getArtMes = $axios.get('/getArtMes?id=' + params.artid),
            getAdjArt = $axios.get('/getAdjacentArt?id=' + params.artid + '&cid=' + colMes.cid)
        return Promise.all([getArtMes, getAdjArt]).then(res => {
            const { preArt, nextArt } = res[1].data
            return {
                artCon: res[0].data,
                adjArt: { 
                    name: 'column',
                    temp: 'index-alias-artid',
                    preParams: preArt ? { alias: params.alias, artid: preArt.id} : null, 
                    nextParams: nextArt ? { alias: params.alias, artid: nextArt.id } : null, 
                    preArt, 
                    nextArt
                },
                nowPosi: { title:colMes.title, temp: 'index-alias', params: { alias: params.alias }, isItem: false }
            }
        })
    },
    fetch({store, params}) {
        store.commit('changeNowPosi', {
            num: 1,
            posi: {
                title: params.title,
                id: params.id
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
    mounted() {
        this.$axios({
            url: '/showHit?id=' + this.$route.params.artid + '&add=1'
        })
    }
}
</script>
<style  scoped>
</style>