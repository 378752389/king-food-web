<template>
  <view class="advertise-list">
    <swiper
      class="swiper"
      :circular="swiperOptions.circular"
      :indicator-dots="swiperOptions.indicatorDots"
      :autoplay="swiperOptions.autoplay"
      :interval="swiperOptions.interval"
      :duration="swiperOptions.duration"
    >
      <swiper-item  :key="advertise.id" v-for="advertise in advertiseList">
        <view class="advertise-item">
          <image
            :src="advertise.pic"
            :mode="swiperOptions.backgroundMode"
          />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script setup>
import { ref } from "vue";
const swiperOptions = ref({
  circular: true,
  indicatorDots: true,
  autoplay: true,
  interval: 2000,
  duration: 1000,
  backgroundMode: 'aspectFill'
});

const advertiseList = ref([
  {
    id: 1,
    pic: "https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/11/22/202311221503308377/202311221503308377_640_398.jpg?202310250918348984&rand=0827",
    url: "http://www.baidu.com",
  },
  {
    id: 2,
    pic: "https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/11/14/202311141821398888/202311141821398888_640_398.jpg?&rand=0827",
    url: "http://www.taobao.com",
  },
  {
    id: 3,
    pic: "https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/10/30/202310301939434000/202310301939434000_640_398.jpg?&rand=0827",
    url: "http://www.jd.com",
  },
]);
</script>
<style lang="scss" scoped>
.advertise-list {
  .swiper {
    height: 30vh;

    .advertise-item {
      image {
        width: 100%;
      }
    }
  }
}
</style>
