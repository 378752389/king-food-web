import { request } from "../utils/http";

export const getMenuAPI = () => {
  return request({
    url: '/content/menu',
    method: 'get',
  })
}