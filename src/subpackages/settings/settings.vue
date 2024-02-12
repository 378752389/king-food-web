<template>
  <view class="settings">
    <uni-card :is-shadow="false">
      <uni-list>
        <uni-list-item
          showArrow
          to="/subpackages/address/address"
          title="地址管理"
        />
      </uni-list>
    </uni-card>

    <uni-card :is-shadow="false">
      <uni-list>
        <uni-list-item clickable showArrow title="授权管理" />
        <uni-list-item clickable showArrow title="问题反馈" />
        <uni-list-item clickable showArrow title="联系我们" />
      </uni-list>
    </uni-card>

    <uni-card :is-shadow="false">
      <uni-list>
        <uni-list-item showArrow title="关于King Menu" />
      </uni-list>
    </uni-card>

    <uni-card :is-shadow="false">
      <button @tap="onLogout" class="logout-btn">退出登录</button>
    </uni-card>
  </view>
</template>

<script setup>
import { useMemberStore } from "../../store/member";

const onLogout = () => {
  // 清除登录信息
  const memberStore = useMemberStore();
  memberStore.clearInfo();
  // 弹出登录提示
  uni.showToast({
    title: "退出登录成功！",
    icon: "success",
    duration: 500,
  });
  // 页面返回
  setTimeout(() => {
    uni.navigateBack();
  }, 500);
};
</script>

<style scoped>
.logout-btn {
  color: white;
  background-color: red;
}
</style>
