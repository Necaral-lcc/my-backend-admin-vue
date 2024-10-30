import { apiAdmin } from "./api";
import { URL } from "./url";

export const login = <T>(data: vUserLoginData) => {
  return apiAdmin.post<vResponseData<T>>(URL.login.url, data);
};

export const getRoute = (num: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(`Route ${num}`);
    }, 300);
  });

export const getUserInfo = <T>() => {
  return apiAdmin.get<vResponseData<T>>("/admin-api/userInfo");
};
