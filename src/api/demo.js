import { request } from "../utils/http";

export const authAPI = () => {
  return request({
    url: '/current',
    method: 'get'
  })
}

export const nonauthAPI = () => {
  return request({
    url: '/currentTime',
    method: 'get'
  })
}