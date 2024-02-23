import { request } from "../utils/http";

export const wxMinLoginAPI = (code) => {
  return request({
    url: '/member/login/wxMin',
    method: 'get',
    data: {
      code
    }
  })
}

export const currentTimeAPI = () => {
  return request({
    url: '/currentTime'
  })
}