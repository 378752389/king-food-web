import { request } from "../utils/http";


export const makeOrderAPI = ({mealWay, couponId, integration, remark, pkgList}) => {
    return request({
        url: "/v2/order/make",
        method: "post",
        data: {
            source: 1,
            mealWay,
            couponId,
            integration,
            remark,
            pkgList
        }
    })
}

export const confirmOrderAPI = ({pkgList}) => {
    return request({
        url: "/v2/order/confirm",
        method: "post",
        data: {
            pkgList
        }
    })
}