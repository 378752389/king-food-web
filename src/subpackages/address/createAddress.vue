<template>
  <view class="create-address">
    <uni-forms ref="formRef" :modelValue="formData" :rules="formRules">
      <uni-forms-item :label-width="80" label="收货人" name="receiver">
        <uni-easyinput
          type="text"
          v-model="formData.receiver"
          placeholder="请输入收货人名称"
        />
      </uni-forms-item>

      <uni-forms-item :label-width="80" label="手机号" name="phone">
        <uni-easyinput
          type="text"
          v-model="formData.phone"
          placeholder="请输入收货人名称"
        />
      </uni-forms-item>

      <uni-forms-item :label-width="80" label="地区">
        <picker
          @change="onRegionChange"
          mode="region"
          :value="[formData.province, formData.city, formData.distinct]"
          placeholder="请选择区域"
        >
          <view class="picker-content">{{
            formData.province + " " + formData.city + " " + formData.distinct
          }}</view>
        </picker>
      </uni-forms-item>

      <uni-forms-item :label-width="80" label="详细地址" name="detailAddress">
        <uni-easyinput
          type="text"
          v-model="formData.detailAddress"
          placeholder="请填写详细地址"
        />
      </uni-forms-item>

      <uni-forms-item :label-width="100" label="设为默认地址" name="default">
        <switch
          class="switch"
          color="#ff0000"
          placeholder="请填写详细地址"
          :checked="formData.default"
        />
      </uni-forms-item>

      <button type="primary" @click="onSubmit">提交</button>
    </uni-forms>
  </view>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useAddressStore } from "../../store/address";
const formData = reactive({
  id: 3,
  receiver: "",
  phone: "",
  province: "北京市",
  city: "北京市",
  distinct: "东城区",
  detailAddress: "",
  default: true,
});

// 区域选择时进行数据绑定
const onRegionChange = (e) => {
  const province = e.detail.value[0];
  const city = e.detail.value[1];
  const distinct = e.detail.value[2];

  form.province = province;
  form.city = city;
  form.distinct = distinct;
};

// 表单校验规则
const formRules = ref({
  receiver: {
    rules: [{ required: true, errorMessage: "收件人不能为空" }],
  },
  phone: {
    rules: [{ required: true, errorMessage: "手机号不能为空" }],
  },
  detailAddress: {
    rules: [{ required: true, errorMessage: "请填写详细地址" }],
  },
});

// 表单提交
const addressStore = useAddressStore();
const formRef = ref();
const onSubmit = () => {
  formRef.value
    .validate()
    .then((res) => {
      console.log("success", res);
      uni.showToast({
        title: `校验通过`,
      });

      // todo 提交表单信息  form
      const localAddressList = addressStore.addressList;
      if (formData.default) {
        // 重置之前地址列表中的默认地址
        localAddressList.forEach((x) => {
          x.default = false;
        });
        localAddressList.splice(0, 0, formData);
      } else {
        localAddressList.push(formData);
      }

      addressStore.setAddressList(localAddressList);
    })
    .catch((err) => {
      console.log("err", err);
    });
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f7f7f7;

  .create-address {
    padding-top: 50rpx;
    width: 94%;
    margin: auto;

    :deep(.uni-forms-item__content) {
      display: flex;
      align-items: center;

      .switch {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
