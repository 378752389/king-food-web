<template>
  <view class="water-fall" :style="{ height: containerHeight + 'px' }">
    <view
      class="item"
      :key="item.id"
      v-for="(item, index) in itemList"
      :style="{
        width: width + 'px',
        overflow: 'hidden',
        left: positionOffsets[index]?.left + 'px',
        top: positionOffsets[index]?.top + 'px',
      }"
    >
      <slot :item="item"></slot>
    </view>
  </view>
</template>
<script setup>
import { ref, getCurrentInstance, nextTick } from "vue";
import { onReady } from "@dcloudio/uni-app";

/**
 * gap: 上下元素之间间隙, 单位px
 * width: 元素宽度，单位px
 * itemList: 定义容器内每个项目的信息
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
  itemList: {
    type: Array,
    default: [],
  },
});
// 容器内每个项目的偏移信息 {left:xx, top: xx}
const positionOffsets = ref([]);
// 容器的高度
const containerHeight = ref(0);
// 获取当前组件实例
const { proxy } = getCurrentInstance();

onReady(() => {
  // 初始化项目偏移信息，确保模板渲染不会报错
  let tmp = new Array(props.itemList.length);
  tmp.fill({});
  positionOffsets.value = tmp;

  nextTick(() => {
    calcColumns();
  });
});

const calcColumns = () => {
  uni
    .createSelectorQuery()
    .in(proxy)
    .select(".water-fall")
    .boundingClientRect((rect) => {
      // 获取当前容器宽度
      const containerWidth = rect.width;

      uni
        .createSelectorQuery()
        .in(proxy)
        .selectAll(".item")
        .boundingClientRect()
        .exec(function (rects) {
          // 获取每个项目的宽度和高度
          setPositions(containerWidth, props.width, props.gap, rects[0]);
        });
    })
    .exec();
};

// 计算当前容器包含的列数和每列之间的间隙
const calc = (containerWidth, itemWidth) => {
  // 容器内项目的列数
  let columns = Math.floor(containerWidth / itemWidth);
  // 项目之间的间隔
  let space = (containerWidth - columns * itemWidth) / (columns + 1);
  return {
    columns,
    space,
  };
};

// 计算每个项目的偏移信息
const setPositions = (containerWidth, itemWidth, gap, itemInfoList) => {
  let info = calc(containerWidth, itemWidth);

  let columns = info.columns;
  let space = info.space;

  let arr = new Array(columns);
  arr.fill(0);

  let offsets = [];
  const itemLen = props.itemList.length;
  for (let i = 0; i < itemLen; i++) {
    let itemInfo = itemInfoList[i];
    let minTop = Math.min.apply(null, arr);
    let minIndex = arr.indexOf(minTop);

    let res = {
      // 项目左偏移
      left: minIndex * itemWidth + space * (minIndex + 1),
      /// 项目顶偏移
      top: minTop + gap,
    };
    offsets.push(res);
    arr[minIndex] = minTop + itemInfo.height + gap;
  }

  positionOffsets.value = offsets;
  // 设置父容器高度为当前项目列中最高列的高度
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
    // border: 1px solid rgba(0, 0, 0, 0.1);
    .pic {
      width: 300rpx;
      height: 450rpx;
    }
  }
}
</style>
