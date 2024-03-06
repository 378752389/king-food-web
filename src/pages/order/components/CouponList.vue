<template>
    <scroll-view scroll-y class="coupon-list">
        <view class="coupon" :key="coupon.id" v-for="coupon in couponList">
            <image :src="coupon.pic" class="pic"></image>
            <view class="msg">
                <view class="name">{{ coupon.name }}</view>
                <view v-if="coupon.tags?.length > 0" class="tag"><text :key="tag" v-for="tag in coupon.tags">{{ tag }}</text></view>
                <view class="amount">{{ coupon.amount }}元</view>
                <view class="last">
                    <view class="time">{{ `${coupon.effectiveTime}-${coupon.expireTime}` }}</view>
                    <button class="king-primary-btn use-btn" @click="onCouponClick(coupon)">
                        立即使用
                    </button>
                </view>

                <view class="reason" v-if="!coupon.usable">
                    <view style="color: red;">不可用原因</view>
                    {{ coupon.unUseReason }}
                </view>
            </view>
        </view>
    </scroll-view>
</template>
<script setup>
import { ref } from "vue";

const couponList = ref([
    {
        id: 1,
        name: "任意口味派1只",
        pic: `https://picsum.photos/200/300?id=1`,
        effectiveTime: "2024-02-10",
        expireTime: "2024-03-10",
        limit: 0,
        amount: 8.8,
        thresholdAmount: 19,
        usable: true,
        unUseReason: "",
        tags: ["再来一杯", "仅限使用一次"],
    },
    {
        id: 2,
        name: "王炸炸鸡任选5个",
        pic: `https://picsum.photos/200/300?id=2`,
        effectiveTime: "2024-02-10",
        expireTime: "2024-03-10",
        limit: 0,
        amount: 8.8,
        thresholdAmount: 19,
        usable: true,
        unUseReason: "",
        tags: [],
    },
    {
        id: 3,
        name: "7.8元鸡类小食券",
        pic: `https://picsum.photos/200/300?id=3`,
        effectiveTime: "2024-02-10",
        expireTime: "2024-03-10",
        limit: 0,
        amount: 8.8,
        useable: false,
        unUseReason: "该券有效期未开始",
        thresholdAmount: 19,
    }
]);


const onCouponClick = (coupon) => {
    console.log(coupon)
}
</script>
<style lang="scss" scoped>
$coupon-height: 240rpx;
$coupon-valve-height: 60rpx;

.coupon-list {
    
    height: 90vh;

    .coupon {
        background-color: #f3f3f3;
        // height: $coupon-height;
        display: flex;
        margin-bottom: 90rpx;
        position: relative;

        .pic {
            height: $coupon-height;
            width: $coupon-height;
        }

        .msg {
            border-radius: 60rpx;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 20rpx;

            ::after {
                content: "兑换说明";
                color: gray;
                font-size: 0.8rem;
                line-height: 2.5;
                text-indent: 2ch;

                display: block;
                height: $coupon-valve-height;
                position: absolute;
                top: $coupon-height;
                left: 0;
                right: 0;
                border-top: 1rpx dashed;

                background-color: #eae7e7;
            }

            .name {
                margin: 10rpx 0;
                font-size: 1.2rem;
            }

            .tag {
                font-size: 0.8rem;
            }

            .amount {
                color: red;
                font-size: 1.2rem;
            }

            .last {
                display: flex;
                justify-content: space-around;
                align-items: flex-end;
                padding-bottom: 10rpx;

                .time {
                    font-size: 0.7rem;
                }

                .use-btn {
                    font-size: 0.8rem;
                    line-height: 2;
                    height: 50rpx;
                    width: 160rpx;
                }
            }

            .reason {
                outline: 1rpx dashed;
                margin: 0 20rpx 10rpx 0;
                font-size: 0.5rem;
                background-color: #c0bebe;
                padding-left: 20rpx;
            }

        }


    }
}
</style>