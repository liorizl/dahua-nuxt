<template>
    <div id="slider" class="slider">
        <div class="slider-con">
            <div v-for="(banner, index) in bannerList" :key="index" class="slider-item">
                <template v-if="index===0">
                    <img :src="'/'+banner.pcurl" alt="" />
                </template>
                <template v-else>
                    <img src="" :data-source="'/'+banner.pcurl" alt="" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import '~/assets/css/slider.css'
export default {
    props: {
        bannerList: {}
    },
    created() {
        // console.log(this.bannerList)
    }
}
</script>
<style scoped></style>
