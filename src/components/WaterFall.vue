<template>
  <view class="water-fall" :style="{ height: containerHeight + 'px' }">
    <view
      class="item"
      :key="item.id"
      v-for="(item, index) in itemList"
      :style="{
        width: width + 'px',
        overflow: 'hidden',
        left: positionOffsets[index].left + 'px',
        top: positionOffsets[index].top + 'px',
      }"
    >
      <!-- <slot></slot> -->
      <image class="pic" :src="item.pic"></image>
      <view class="content">这是一段简短的描述</view>
    </view>
  </view>
</template>
<script setup>
import { ref, getCurrentInstance, nextTick } from "vue";
import { onReady } from "@dcloudio/uni-app";

/**
 * gap: 上下元素之间间隙, 单位px
 * width: 元素宽度，单位px
 */
const props = defineProps({
  gap: {
    type: Number,
    default: 50,
  },
  width: {
    type: Number,
    default: 200,
  },
});

const generatePics = (n) => {
  let tmp = [];
  for (let i = 1; i <= n; i++) {
    tmp.push({
      id: i,
      pic: `https://picsum.photos/200/300?id=${i}`,
    });
  }
  return tmp;
};

const itemList = ref([]);
const positionOffsets = ref([]);
const containerHeight = ref(0);

onReady(() => {
  console.log(props.option);
  let n = 9;
  itemList.value = generatePics(n);
  let tmp = new Array(n);
  tmp.fill({});
  positionOffsets.value = tmp;

  nextTick(() => {
    calcColumns();
  });
});

const { proxy } = getCurrentInstance();
// 计算当前瀑布流拥有几列元素
const calcColumns = () => {
  uni
    .createSelectorQuery()
    .in(proxy)
    .select(".water-fall")
    .boundingClientRect((rect) => {
      const containerWidth = rect.width;

      uni
        .createSelectorQuery()
        .in(proxy)
        .selectAll(".item")
        .boundingClientRect()
        .exec(function (rects) {
          // 获取每个元素的宽度和高度
          setPositions(containerWidth, props.width, props.gap, rects[0]);
        });
    })
    .exec();
};

// 计算当前容器包含的列数和每列之间的间隙
const calc = (containerWidth, itemWidth) => {
  let columns = Math.floor(containerWidth / itemWidth);
  let space = (containerWidth - columns * itemWidth) / (columns + 1);
  return {
    columns,
    space,
  };
};

const setPositions = (containerWidth, itemWidth, gap, itemInfoList) => {
  let info = calc(containerWidth, itemWidth);

  let columns = info.columns;
  let space = info.space;

  let arr = new Array(columns);
  arr.fill(0);

  let offsets = [];
  const itemLen = itemList.value.length;
  for (let i = 0; i < itemLen; i++) {
    let itemInfo = itemInfoList[i];
    let minTop = Math.min.apply(null, arr);
    let minIndex = arr.indexOf(minTop);

    let res = {
      left: minIndex * itemWidth + space * (minIndex + 1),
      top: minTop + gap,
    };
    offsets.push(res);
    arr[minIndex] = minTop + itemInfo.height + gap;
  }

  positionOffsets.value = offsets;
  containerHeight.value = Math.max.apply(null, arr) + gap;
};
</script>
<style lang="scss" scoped>
.water-fall {
  width: 100%;
  position: relative;

  .item {
    width: 200px;
    position: absolute;
    border: 1px solid rgba(0, 0, 0, 0.1);
    .pic {
      width: 300rpx;
      height: 450rpx;
    }
  }
}
</style>
