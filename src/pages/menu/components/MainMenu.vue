<template>
  <view class="main-menu">
    <scroll-view class="menu-list" scroll-y>
      <view
        :class="['menu', { active: currentMenuIndex === index }]"
        :key="menu.id"
        v-for="(menu, index) in menuList"
        @tap="onMenuTap(index)"
        >{{ menu.name }}</view
      >
    </scroll-view>

    <view class="item-group-list">
      <view
        class="item-group"
        :key="group.id"
        v-for="(group, index) in menuList"
      >
        <view class="item" :key="item" v-for="item in 3">
          <card-item @onAddTap="onAddTap"></card-item>
        </view>
      </view>
    </view>

    <view
      :style="{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: 50 + safeAreaInsets.bottom + 'px',
        background: 'white',
        display: 'flex',
      }"
    >
      <button class="opt-btn" @click="onCartListClick">购物车</button>
      <button class="opt-btn" @click="onBuyClick">选好了</button>
    </view>

    <!-- 普通弹窗 -->
    <uni-popup ref="popup" background-color="#fff">
      <view class="popup-content">
        <cart-list></cart-list>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { CardItem } from "./CardItem.vue";
import { CartList } from "./CartList.vue";
import { ref, getCurrentInstance } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { useCartStore } from "../../../store/cart";
const { safeAreaInsets } = uni.getSystemInfoSync();

const menuList = ref([
  {
    id: 1,
    name: "汉堡",
  },
  { id: 2, name: "零食小吃1" },
  { id: 3, name: "饮料1" },
  { id: 14, name: "汉堡1" },
  { id: 15, name: "零食小吃2" },
  { id: 16, name: "饮料2" },
  { id: 17, name: "汉堡2" },
  { id: 18, name: "零食小吃3" },
  { id: 19, name: "饮料3" },
  { id: 21, name: "汉堡3" },
  { id: 22, name: "零食小吃4" },
  { id: 23, name: "饮料4" },
  { id: 24, name: "汉堡4" },
]);

const { proxy } = getCurrentInstance();

const offset = ref();
const relativeOffsets = ref([]);
onReady(() => {
  // 计算每个 group 距离顶部偏离， 利于后面跳转
  uni
    .createSelectorQuery()
    .in(proxy)
    .selectAll(".item-group")
    .boundingClientRect((boxes) => {
      const tmp = [];
      boxes.forEach((box) => {
        console.log(box.top);
        tmp.push(box.top);
      });
      relativeOffsets.value = tmp;
    })
    .exec();

  // 子组件监听页面滚动 变化
  uni.$on("onPageScroll", (scrollTop) => {
    const index = relativeOffsets.value.findIndex((x) => x > scrollTop);
    currentMenuIndex.value = index - 1 >= 0 ? index - 1 : 0;
  });

  console.log("安全距离", safeAreaInsets.bottom);
});

const currentMenuIndex = ref(0);

// 菜单点击跳转
const onMenuTap = (index) => {
  // 确保不会滚动后更新选中索引
  setTimeout(() => {
    currentMenuIndex.value = index;
  }, 500);
  const targetOffset = relativeOffsets.value[index];
  // 滚动到预设的指定位置
  uni.pageScrollTo({ scrollTop: targetOffset });
};

const cartStore = useCartStore();

// 添加购物车事件
const onAddTap = (options) => {
  uni.showToast({
    title: `${options.name} 添加成功`,
    icon: "none",
  });
  cartStore.addCartItem(options);
};

const onBuyClick = () => {
  console.log(cartStore.cartList);
};

const popup = ref();
const onCartListClick = () => {
  console.log("点击购物车");
  popup.value.open("bottom");
};
</script>

<style lang="scss" scoped>
.main-menu {
  display: flex;

  .menu-list {
    width: 200rpx;
    height: 80vh;
    position: sticky;
    top: 0;

    .menu {
      border: 1px solid;
      height: 100rpx;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .active {
      color: red;
    }
  }

  .item-group-list {
    flex: 1;
    padding-bottom: 300rpx;
    // border: 1px solid;
    .item-group {
      margin-bottom: 50rpx;
      // border: 1px solid;
      .item {
        margin: 0 20rpx 20rpx;
        border: 1px solid;
        height: 200rpx;
      }
    }
  }

  .opt-btn {
    flex: 1;
  }
}
</style>
