<template>
  <view class="recommend">
    <recommend-item :option="item" :key="item.id" v-for="item in itemList"></recommend-item>
  </view>
</template>
<script setup>
import RecommendItem from "@/components/recommend/RecommendItem";
import { ref } from "vue";

const itemList = ref([]);
for(let i=0; i< 20; i++) {
  itemList.value.push({
    id: i,
    pic: `https://picsum.photos/id/${i}/200/200?id=${i}`
  })
}
</script>
<style lang="scss" scoped>
.recommend {
  width: 90%;
}
</style>
