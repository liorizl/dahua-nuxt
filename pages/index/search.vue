<template>
    <div class="box-width search-con">
        <div class="search-title">
            <input type="text" class="search-text" placeholder="请输入" v-model="keyword">
            <button class="search-button" @click="subSeach(start, count, true)">提交</button>
            <span>搜索范围</span>
            <select class="search-select" v-model="searchScope">
                <option value="title">文章标题</option>
                <option value="content">文章内容</option>
                <option value="column">栏目名称</option>
            </select>
        </div>
        <template v-if="artList === null">
            <div class="search-res" v-if="searching">正在搜索中....请稍候!</div>
        </template>
        <template v-else>
            <template v-if="artList && artList.length > 0">
                    <div class="search-res" v-for="(art, index) in artList">
                        <div class="search-res-title">
                            <template v-if="nowScope === 'column' || nowScope === 'title'">
                                <nuxt-link :to="{
                                        name: art.parentCol[art.parentCol.length - 1].name,
                                        params: art.parentCol[art.parentCol.length - 1].params
                                    }" v-html="titleFormat(art.title)">
                                </nuxt-link>
                            </template>
                            <template v-else>
                                <nuxt-link :to="{
                                        path: art.path + '/' + art.id
                                    }">
                                    {{art.title}}
                                </nuxt-link>
                            </template>
                            <span>{{index + 1}}</span>
                        </div>
                        <div class="search-res-source">位置： 
                            <span v-for="(col, index) in art.parentCol">
                                <nuxt-link :to="{name: col.name, params: col.params}">{{col.title}}</nuxt-link>
                                <span v-if="index < art.parentCol.length - 1">--</span>
                            </span>
                        </div>
                        <div class="search-res-intro" v-if="nowScope === 'content'">
                            <span v-html="contentFormat(art.content, true)"></span>
                        </div>
                        <div class="search-res-intro" v-else-if="nowScope === 'title'">
                            <span v-html="contentFormat(art.content, false)"></span>
                        </div>
                    </div>
            </template>
            <template v-else>
                <div class="search-res">没有搜索到任何内容!</div>
            </template>
        </template>
        <div class="search-more">
            <span v-if="searching === 2 && artList && artList.length < len" class="result-more" @click="getMore">点击显示更多内容</span>
            <span v-else-if="searching === 2 && artList && artList.length >= len && len !== 0" class="result-no-more" >没有更多内容了</span>
            <span v-else-if="searching === 1 && len > 0">搜索中...</span>
        </div>
    </div>
</template>

<script>
import webConfig from '~/web-config.js'
export default {
    data() {
        return {
            artList: null,
            keyword: null,
            searching: 0,  // 0还没开始搜索， 1搜索中，2搜索结束
            searchScope: 'content',
            nowScope: null,
            start: 0,
            count: 6,  //显示条数
            len: 0      //搜索的总条数
        }
    },
    created() {
        this.test()
        this.keyword = this.$route.params.keyword || ''
        if (this.keyword) {
            this.subSeach(this.start, this.count, false)
        }
    },
    methods: {
        test(){
            // let str = '<span style="color: #c49a4d; font-weight: bold;">大华<br><span style="color:red">激光</span>&mdash;&mdash;由美誉"光子先生"的吴院长领'
            // const regHtmlTag = /\<\/?(?!br).*?\>/g
            // let a = regHtmlTag.exec(str)
            // let b = str.match(regHtmlTag)
            // console.log(b)
        },
        subSeach(start, count, btnSub) {
            if (btnSub) start = this.start = 0
            if (!this.keyword) {
                alert('请输入要查找的内容!')
                return
            } else {
                
                this.searching = 1
                this.$axios.get(
                    '/getSearchArt?keyword=' + this.keyword + '&scope=' + this.searchScope + '&start=' + start + '&count=' + count
                )
                .then( res => {
                    this.artList =  this.getResList(res.data.res)
                    this.len = res.data.resCount || this.len
                    this.start += this.count
                    this.nowScope = this.searchScope
                    this.searching = 2
                }).catch(err => {
                    this.searching = 2
                })
            }
        },
        getResList(artList) {
            if (this.searchScope === 'column') {
                artList.forEach(art => {
                    art.parentCol = this.sourceFormat(art.path1, art.alias, art.title)
                })
            } else {
                artList.forEach((art, i) => {
                    art.parentCol = this.sourceFormat(art.path.substr(1), art.path.substr(1), art.title)
                })
            }
            return artList
            
        },
        contentFormat(content, mark) {
            const regHtmlTag = /\<\/?(?!br).*?\>/g
            content = content.replace(regHtmlTag, '')
            const regCon = new RegExp('\(?<=\。|\.|\,|\，|\r|\n)[^\。\.\,\，\r\n]*?' + this.keyword + '.+')
            const resReg = regCon.exec(content)
            if (resReg) content = resReg[0]
            if (mark) content = content.replace(this.keyword, '<span style="color:red">'+this.keyword+'</span>')
            if (content.length > 150) content = content.substr(0, 150).concat('....')
            return content
        },
        titleFormat(title) {
            return title = title.replace(this.keyword, '<span style="color:red">'+this.keyword+'</span>')
        },
        sourceFormat(path, aliasOrId, rTitle) {
            let links = [],
                name = 'index',
                params = {},
                title
            if (path.indexOf(webConfig.itemName) > -1){
                const paths = path.split('\/')
                const alias = aliasOrId
                for (let i = 0; i < paths.length; i++) {
                    if (i === 0) {
                        name = name + '-xm'
                        params = paths[i] === webConfig.itemName ?
                                    Object.assign(params, {xm: paths[i]}) :
                                    Object.assign(params, {alias: paths[i]})
                    }
                    else if (i === 1) {
                        name = name + '-alias'
                        params = Object.assign(params, {alias: paths[i]})
                    }
                    else if (i === 2) {
                        name = name + '-aliasOrId'
                        params = Object.assign(params, {aliasOrId: paths[i]})
                    }
                    title = this.getColTitleSync(paths[i], this.$store.state.colList)
                    links[i] = {
                        name,
                        params,
                        title
                    }
                }
                if (aliasOrId && path !== aliasOrId) {
                    links.push({
                        name: name + '-aliasOrId', 
                        title: rTitle, 
                        params: Object.assign(params, {aliasOrId: aliasOrId})
                    })
                }
            } else {
                links = [{
                    name: 'index-alias',
                    params: {
                        alias: path
                    },
                    title: this.searchScope === 'column' ? rTitle : this.getColTitleSync(aliasOrId, this.$store.state.colList)
                }]
            }
            return links
        },
        getColTitleSync(alias, colList) {
            let title = null
            const goSearch = (alias, cols) => {
                for (let i = 0; i < cols.length; i++) {
                    const col = cols[i]
                    if (col.alias === alias) {
                        title = col.title
                        break
                    } else {
                        if (col.haveChild) {
                            goSearch(alias, col.haveChild)
                        }
                    }
                }
            }
            goSearch(alias, colList)
            return title
        },
        getMore () {
            this.searching = 1
            this.$axios.get(
                '/getSearchArt?keyword=' + this.keyword + '&scope=' + this.searchScope + '&start=' + this.start + '&count=' + this.count
            )
            .then( res => {
                const arts = this.getResList(res.data.res)
                this.artList =  this.artList.concat(arts)
                this.start += this.count
                this.searching = 2
            }).catch(err => {
                this.searching = 2
            })
        }
    }
}
</script>
<style lang="less" scoped>
.search-con {
    border: 1px solid rgba(0,0,0,0.14);
    border-radius: 10px;
    margin: 30px auto;
    .search-title {
        display: flex; align-items: center; justify-content: center;
        height: 40px;
        margin-top: 10px;
        .search-text {
            width: 200px; height: 26px;
            border: 1px solid #999;
            border-radius: 5px;
            text-indent: .5em;
            outline: #999;
            background-color: #fff;
            &:focus{
                border-color: #409eff;
            }
        }
        .search-button {
            width: 70px; height: 30px;
            display: flex; align-items: center; justify-content: center;
            margin-left: 15px;
            border: 1px solid #666;
            border-radius: 4px;
            color: #333;
            cursor: pointer;
            outline: none;
            &:hover {
                border-color: #409eff;
                color: #409eff;
            }
            &:active {
                background-color: #e1eaf3;
                border-color: #409eff;
                color: #0681fc;
            }
        }
        span {
            font-size: 14px;
            margin-left: 25px;
        }
        .search-select {
            margin-left: 10px;
            outline: none;
            width: 100px; height: 24px;
        }
    }
    .search-res {
        width: 90%;
        margin: 10px auto;
        padding-bottom: 15px;
        border-bottom: 1px solid #ededed;
        &:first-of-type {
            margin-top: 20px;
        }
        .search-res-title {
            font: 500 18px/42px 'microsoft yahei';
            display: flex; justify-content: space-between;
            a {
                display: inline-block
            }
            span {
                display: inline-block;
                margin-right: 10px; color: #999;
            }
        }
        .search-res-source {
            font: 1rem/2rem 'microsoft yahei';
            a {
                color: #62a8ea;
            }
        }
        .search-res-intro {
            font: 1rem/2rem 'microsoft yahei';
        }
    }
    .search-more {
        margin: 20px auto;
        width: 300px;
        text-align: center;
        .result-more {
            cursor: pointer;
        }
        .result-no-more {
            color: #777;
        }
    }
}
</style>