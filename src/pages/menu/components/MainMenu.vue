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
        <view class="item" :key="item.id" v-for="item in group.list">
          <card-item :option="item" @onAddTap="onAddTap"></card-item>
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
      <button class="opt-btn" @click="onCartListClick">购物车({{ cartCount }})</button>
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
import { ref, getCurrentInstance, computed } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { useCartStore } from "../../../store/cart";
const { safeAreaInsets } = uni.getSystemInfoSync();

const cartCount = computed(() => {
  return cartStore.cartList.reduce((pre, x) => pre + x.stock, 0)
})

const menuList = ref([
  {
    id: 1,
    name: "汉堡",
    list: [
      {
        id: 1,
        name: "汉堡",
        description: "分量足",
        price: 5,
        originPrice: 10,
        pic: "http://image.wenking.fun/king-food/food/%E5%8F%AF%E4%B9%90.png",
        productList: [
          {
            name: "汉堡",
            count: 1,
          }
        ]
      },
    ],
  },
  {
    id: 2,
    name: "零食小吃",
    list: [
      {
        id: 2,
        name: "奥尔良鸡翅根",
        description: "美味",
        price: 5,
        originPrice: 10,
        pic: "http://image.wenking.fun/king-food/food/%E5%8F%AF%E4%B9%90.png",
        productList: [
          {
            name: "炸鸡",
            count: 2,
          }
        ]
      },
    ],
  },
  {
    id: 3,
    name: "饮料",
    list: [
      {
        id: 5,
        name: "可乐",
        description: "清凉一夏，身轻预约",
        price: 5,
        originPrice: 10,
        pic: "http://image.wenking.fun/king-food/food/%E5%8F%AF%E4%B9%90.png",
        productList: [
          {
            name: "可乐",
            count: 1,
          }
        ]
      },
    ],
  },
]);

const { proxy } = getCurrentInstance();

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
  let timer = null;
  uni.$on("onPageScroll", (scrollTop) => {
    // 防抖，滚动监听
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      const index = relativeOffsets.value.findIndex((x) => x >= scrollTop);
      currentMenuIndex.value = index >= 0 ? index : 0;

      clearTimeout(timer);
    }, 100);
  });
});

const currentMenuIndex = ref(0);

// 菜单点击跳转
const onMenuTap = (index) => {
  // 确保不会滚动后更新选中索引
  // setTimeout(() => {
  //   currentMenuIndex.value = index;
  // }, 500);
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
  if (cartStore.cartList && cartStore.cartList.length > 0) {
    uni.navigateTo({
      url: "/pages/order/confirm",
    });
  } else {
    uni.showToast({
      title: '请先选择商品',
      icon: 'none'
    })
  }
};

const popup = ref();
const onCartListClick = () => {
  if (cartStore.cartList && cartStore.cartList.length === 0) {
    uni.showToast({
      title: "还未添加商品到购物车~",
      icon: "none",
    });
  } else {
    popup.value.open("bottom");
  }
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
    // padding-bottom: 300rpx;
    padding-bottom: 90vh;
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
