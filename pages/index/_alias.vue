<template>
    <div class="box-width column-c">
        <nuxt-child></nuxt-child>
        <div class="column-c-slider">
            <div class="column-c-search">
                <input type="text" class="column-c-search-input" v-model="searchCon" placeholder="请输入">
                <button @click="goSearch"></button>
            </div>
            <div class="column-c-slider-list">
                <div class="column-c-slider-title">
                    为您推荐
                </div>
                <recommend :recommend="recommend"></recommend>
            </div>
        </div>
    </div>
</template>

<script>
import recommend from '~/components/recommend'
export default {
    components: {
        recommend,
    },
    validate({params, store}) {
        const colList = store.state.colList
        return colList.some((col) => {
            return params.alias === col.alias
        })
    },
    asyncData({$axios}) {
        return $axios.get('/getRecom?scope=column').then(res => {
            return {
                recommend: {
                    className: 'column-c-slider-ul',
                    picClassName: 'column-c-slider-li-img',
                    titleClassName: 'column-c-slider-li-t',
                    recom: res.data
                },
            }
        })
    },
    data() {
        return {
            searchCon: null
        }
    },
    methods: {
        goSearch() {
            if (!this.searchCon) {
                alert('请输入内容')
                return false
            } else {
                this.$router.push({name: 'index-search', params: {keyword: this.searchCon}})
            }
            
        }
    },
    mounted() {
        document.getElementsByClassName('nav-ul')[0].getElementsByTagName('li')[0].getElementsByTagName('a')[0].className = ''
    }
}
</script>
<style  scoped>
</style>