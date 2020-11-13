<template>
    <ul :class="recommend.className" >
        <li v-for="re in recommend.recom">
            <div :class="recommend.picClassName">
                <nuxt-link :to="re.path+'/'+re.id">
                    <img v-if="re.picurl" :src="re.picurl" :alt="re.title">
                    <img v-else src="~/static/images/pro1.jpg" :alt="re.title">
                </nuxt-link>
            </div>
            <div :class="recommend.titleClassName">
                <nuxt-link :to="re.path+'/'+re.id">
                    {{re.title}}
                </nuxt-link>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        recommend: {
            className: String,
            picClassName: String,
            titleClassName: String,
            recom: Array
        }
    },
    created() {
        // console.log(this.recommend)
    }
}
</script>
<style  scoped>
</style>