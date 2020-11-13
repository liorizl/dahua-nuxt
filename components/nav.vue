<template>
    <nav class="nav">
        <div class="nav-list">
            <div class="nav-list-title">服务项目导航</div>
            <div class="nav-list-slider">
                <ul class="nav-list-ul">
                    <template v-for="col in colList[0].haveChild" >
                        <li v-if="col.haveChild">
                            <div class="nav-list-ul-title">
                                <nuxt-link :to="{name: 'index-'+itemName+'-alias', params: {alias: col.alias}}">
                                    <span>{{ col.title }}</span>
                                </nuxt-link>
                            </div>
                            <div class="nav-list-list">
                                <span v-for="item in col.haveChild" :key="item.id" >
                                    <nuxt-link 
                                        :to="{name: 'index-'+itemName+'-alias-aliasOrId', params:{alias: col.alias,aliasOrId:item.alias}}"
                                    >
                                        {{ item.title }}
                                    </nuxt-link>
                                </span>
                            </div>
                        
                            <div class="nav-info">
                                <ul class="nav-info-left">
                                    <template v-if="col.haveChild">
                                        <li v-for="item in col.haveChild" :key="item.id">
                                            <div class="nav-info-title">
                                                <nuxt-link 
                                                    :to="{name: 'index-'+itemName+'-alias-aliasOrId', params:{alias: col.alias,aliasOrId:item.alias}}"
                                                >
                                                    {{ item.title }}
                                                </nuxt-link>
                                            </div>
                                            <div class="nav-info-list">
                                                <template v-for="art in item.arts">
                                                    <nuxt-link 
                                                        :to="{name: 'index-'+itemName+'-alias-aliasOrId-artid', params:{alias: art.alias[0],aliasOrId:art.alias[1],artid: art.id}}"
                                                    >
                                                        {{art.title}}
                                                    </nuxt-link>
                                                </template>
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                                <ul class="nav-info-right">
                                    <li v-for="re in recom.slice(0,2)">
                                        <nuxt-link :to="re.path+'/'+re.id">
                                            <img :src="re.picurl" :alt="re.title" :title="re.title" />
                                        </nuxt-link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </template>
                    <li>
                        <div class="nav-list-ul-title">
                            <span>更多</span>
                        </div>
                        <div class="nav-list-list"></div>
                        <div class="nav-info">
                            <ul class="nav-info-left" >
                                <template v-for="col in colList[0].haveChild">
                                    <li v-if="!col.haveChild">
                                        <div class="nav-info-title">
                                            {{ col.title }}
                                        </div>
                                        <div class="nav-info-list">
                                            <template v-for="art in col.arts">
                                                <nuxt-link 
                                                    :to="{
                                                        name: 'index-'+itemName+'-alias-aliasOrId', 
                                                        params:{
                                                            alias: art.alias[0],
                                                            aliasOrId: art.id
                                                        }
                                                    }"
                                                >
                                                    {{art.title}}
                                                </nuxt-link>
                                            </template>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                            <ul class="nav-info-right">
                                <li v-for="re in recom.slice(0,2)">
                                    <nuxt-link :to="re.path+'/'+re.id">
                                        <img :src="re.picurl" :alt="re.title" :title="re.title" />
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="nav-ul">
            <li>
                <nuxt-link :to="{name: 'index'}" >网站首页</nuxt-link>
            </li>
            <template v-for="(col, index) in colList">
                <template v-if="index === 0">
                    <li :key="col.id">
                        <nuxt-link 
                            :to="{name: 'index-'+itemName, params: {xm: itemName}}"
                        >
                            {{ col.title }}
                        </nuxt-link>
                    </li>
                </template>
                <template v-else>
                    <li :key="col.id">
                        <nuxt-link 
                            :to="{name: 'index-alias', params: {alias: col.alias}}"
                        >
                            {{ col.title }}
                        </nuxt-link>
                    </li>
                </template>
            </template>
        </div>
    </nav>
</template>

<script>
import webConfig from '~/web-config.js'
export default {
    props: {
        colList: Array,
        recom: Array
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
<style scoped>
</style>
