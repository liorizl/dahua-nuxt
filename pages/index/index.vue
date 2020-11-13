<template>
    <div>
        <div class="hot-pro">
            <ul>
                <li ><a href="/xm/pifu/qbmr/">祛斑美白</a></li>
                <li ><a href="/xm/fssmr/gxjd/">光纤精雕</a></li>
                <li ><a href="/xm/plastic/xbzx/">胸部整形</a></li>
                <li ><a href="/xm/plastic/ybzx/">眼部整形</a></li>
            </ul>
        </div>
        <div class="item">
            <div class="item-title">
                <span class="t1">人气爆款</span>
                <span class="t2"><i>HOT ITEM</i></span>
            </div>
            <div class="item-c">
                <ul class="item-c-title">
                    <li :class="nowId === 0 ? 'now': ''" @click="getDefaultArts()">全部</li>
                    <template v-for="item in itemList.haveChild">
                        <li :class="nowId === item.id ? 'now': ''"  @click="getArts(item.id)">
                            {{item.title}}
                            <!-- <nuxt-link :to="{name: 'index-'+itemName+'-alias', params: {alias: item.alias}}">
                                
                            </nuxt-link> -->
                        </li>
                    </template>
                </ul>
                <ul class="item-list">
                    <li v-for="art in arts">
                        <template v-if="art.alias.length > 1">
                            <div class="item-img">
                                <nuxt-link 
                                    :to="{
                                        name: 'index-'+itemName+'-alias-aliasOrId-artid', 
                                        params:{alias: art.alias[0], aliasOrId: art.alias[1], artid: art.id
                                    }}"
                                    target="_blank"
                                >
                                    <img v-if="art.picUrl" :src="art.picUrl" :alt="art.title" />
                                    <img v-else src="~/static/images/no-item-pic.jpg" :alt="art.title" />
                                </nuxt-link>
                            </div>
                            <div class="item-c-title">
                                <nuxt-link 
                                    :to="{
                                        name: 'index-'+itemName+'-alias-aliasOrId-artid', 
                                        params:{alias: art.alias[0], aliasOrId: art.alias[1], artid: art.id
                                    }}"
                                    target="_blank"
                                >
                                    {{art.title}}
                                </nuxt-link>
                            </div>
                        </template>
                        <template v-else-if="art.alias.length === 1">
                            <div class="item-img">
                                <nuxt-link :to="{name: 'index-'+itemName+'-alias-aliasOrId', params:{alias: art.alias[0], aliasOrId: art.id}}" target="_blank">
                                    <img v-if="art.picUrl" :src="art.picUrl" :alt="art.title" />
                                    <img v-else src="~/static/images/no-item-pic.jpg" :alt="art.title" />
                                </nuxt-link>
                            </div>
                            <div class="item-c-title">
                                <nuxt-link :to="{name: 'index-'+itemName+'-alias-aliasOrId', params:{alias: art.alias[0], aliasOrId: art.id}}" target="_blank">
                                    {{art.title}}
                                </nuxt-link>
                            </div>
                        </template>
                        <template v-else>
                            内容格式不正确！
                        </template>
                    </li>
                </ul>
                <nuxt-link class="item-more" :to="{name: 'index-' + itemName, params: {xm: itemName}}" target="_blank">
                    查看更多
                </nuxt-link>
            </div>
        </div>
        <div class="equip">
            <div class="equip-title">
                <span class="t1">激光设备</span>
                <span class="t2">BROUGHT TOGETHER INTERNATIONAL TOP STARS</span>
            </div>
            <div class="equip-c">
                <ul>
                    <li v-for="equip in equipList">
                        <div class="equip-img">
                            <img :src="equip.picUrl" :alt="equip.title">
                        </div>
                        <div class="equip-t"><span>{{equip.title}}</span></div>
                        <nuxt-link :to="{name: 'index-alias-artid', params: {alias: equip.path.substr(1), artid: equip.id}}" target="_blank">
                            <div class="equip-intro">
                                <div class="equip-intro-title">{{equip.title}}</div>
                                <div class="equip-intro-con">{{equip.intro}}</div>
                            </div>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="news">
            <div class="news-title">新闻资讯</div>
            <div class="news-c">
                <div class="news-next">
                    <div class="next-pre" ref="pre" :class="preColor"></div>
                    <div class="next-next" ref="next" :class="nextColor"></div>
                </div>
                <ul class="news-ul" ref="newsUl">
                    <template v-for="(news, index) in newsList">
                        <li :style="{display:index>3?'none':''}" ref="newsLi">
                            <div class="news-img">
                                <nuxt-link :to="{name: 'index-alias-artid', params: {alias: news.path.substr(1), artid: news.id}}" target="_blank" :title="news.title">
                                    <img :src="news.picUrl">
                                </nuxt-link>
                            </div>
                            <p class="news-intro" v-html="formatWord(news.intro, 'intro')">
                                
                            </p>
                            <div class="news-mes">
                                发布日期：{{timeFormat(news.upTime)}} 
                            </div>
                            <div class="news-li-title" >
                                <nuxt-link :to="{name: 'index-alias-artid', params: {alias: news.path.substr(1), artid: news.id}}" target="_blank" :title="news.title">
                                    {{formatWord(news.title, 'title')}}
                                </nuxt-link>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import '~/assets/css/index.less'
import webConfig from '~/web-config.js'
export default {
    asyncData({$axios, app}) {
        let equip = $axios.get('/equipList?cid=' + webConfig.equipCid),
            news = $axios.get('/newsList?cid=' + webConfig.newsCid),
            arts = app.$myUtil.getArtsInCol(webConfig.itemId, 1, 8, true)
        return Promise.all([equip, news, arts]).
            then(([resEquip, resNews, arts]) => {
                return {
                    equipList: resEquip.data,
                    newsList: resNews.data,
                    arts: arts.arts,
                    defaultArts: arts.arts
                }
            })
    },
    data() {
        return {
            arts: [],
            defaultArts: [],
            itemList: [],
            itemName: webConfig.itemName,
            nowId: 0,
            preColor: 'grey',
            nextColor: 'grey'
        }
    },
    created() {
        let colList = this.$store.state.colList
        if (colList) {
            for (let i = 0; i <= colList.length; i++) {
                if (colList[i].id === webConfig.itemId) {
                   this.itemList = colList[i]
                   break
                }
            }
        }
    },
    methods: {
        getArts(id) {
            this.$myUtil.getArtsInCol(id, 1, 8)
            .then(res => {
                this.arts = res.arts
                this.nowId = id
            })
        },
        getDefaultArts() {
            this.arts = this.defaultArts
            this.nowId = 0
        },
        formatWord(str, cate) {
            let num = cate === 'title' ? 14 : 66
            if (str.length > num)  return str.substr(0, num) + '...'
            else return str.substr(0, num)
        },
        timeFormat(timeStr) {
            const dayExp = /^\d{4}\-\d{1,2}\-\d{1,2}/
            const day = dayExp.exec(timeStr) || 0
            return ' ' + day[0]
        }
    },
    mounted() {
        const boxWidth = 1200, spacing = 20, num = 4  //这些是在css中定义的，避免页面重绘就不重新获取，分别是总宽度，li的间隙，显示条数
        const liWidth = (boxWidth - spacing * (num - 1)) / num
        let refs = this.$refs
        let elem = refs.newsUl
        let eleLi = refs.newsLi
        let pre = refs.pre
        let next = refs.next
        let left = 0
        if (eleLi.length > num) {
            this.nextColor = 'red'
            elem.style.width = boxWidth + (eleLi.length - num) * (liWidth + spacing) + 'px'
        }
        eleLi.forEach((ele, index) => {
            if (index >= num) {
                ele.style.display = ''
            }
        })
        pre.addEventListener('click', goPre)
        next.addEventListener('click', goNext)
        function goPre() {
            if (left < 0) {
                move(liWidth + spacing)
            }
        }
        function goNext() {
            if (left > - (liWidth + spacing) * (eleLi.length - num)) {
                move(-liWidth - spacing)
            }
        }
        function move(dis) {
            let step = dis > 0 ? 40 : -40,     //后面数字为每一帧移动的距离 省略单位px
                moveDis = 0
            let t = setTimeout(goMove, 30)
            function goMove() {
                left += step
                elem.style.left = left + 'px'
                moveDis += step
                if (Math.abs(moveDis) < Math.abs(dis)) {
                    if (Math.abs(dis - moveDis) <= Math.abs(step)) {
                        step = dis - moveDis
                    }
                    t = setTimeout(goMove, 30)
                }
                if (left >= 0) {
                    pre.className = 'next-pre grey'
                }
                else {
                    pre.className = 'next-pre red'
                }
                if (left <= - (liWidth + spacing) * (eleLi.length - num)) {
                    next.className = 'next-next grey'
                } else {
                    next.className = 'next-next red'
                }
            }
        }
    }
}
</script>
<style lang="less"  scoped>
.grey {
    color: grey
}
.red {
    color: red;
    cursor: pointer;
}
</style>