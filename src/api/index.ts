import { apiAdmin } from "./api";
import { URL } from "./url";

const VITE_REQUEST_API = import.meta.env.VITE_REQUEST_API;

export const login = <T>(data: vUserLoginData) => {
  return apiAdmin.post<vResponseData<T>>(
    VITE_REQUEST_API + URL.login.url,
    data
  );
};

export const getRoute = (num: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(`Route ${num}`);
    }, 300);
  });
