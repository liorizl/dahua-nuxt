<template>
    <ul :class="adjArt.name==='column'?'column-art-more':'item-intro-more'">
        <li>
            上一篇：
            <template v-if="adjArt.preArt">
                <nuxt-link :to="{name: adjArt.temp, params: adjArt.preParams}">{{adjArt.preArt.title}}</nuxt-link>
            </template>
            <template v-else>
                没有了！
            </template>
        </li>
        <li>
            下一篇：
            <template v-if="adjArt.nextArt">
                <nuxt-link :to="{name: adjArt.temp, params: adjArt.nextParams}">{{adjArt.nextArt.title}}</nuxt-link>
            </template>
            <template v-else>
                没有了！
            </template>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        adjArt: {
            name: String,
            temp: String,
            preParams: Object,
            nextParams: Object,
            preArt: Object,
            nextArt: Object
        }
    },
    // props: ['preArt', 'nextArt'],
    data() {
        return {
        }
    },

    created() {
    },

    methods: {}
}
</script>
<style  scoped>
</style>