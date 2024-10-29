import axios from "axios";
import type { AxiosRequestConfig, CustomParamsSerializer } from "axios";
import { AxiosError } from "axios";
import { stringify } from "qs";
import NProgress from "nprogress";
import { getToken, removeToken, setToken } from "@/utils/auth";
import type { vRequestParameters } from "./type";
import router from "@/router";
import { ElMessage } from "element-plus";

const config: AxiosRequestConfig = {
  timeout: 1000 * 10,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  timeoutErrorMessage: "请求超时",
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
};

interface ApiAdminConfig {
  limit?: number;
}

class ApiAdmin {
  constructor(config?: ApiAdminConfig) {
    const { limit } = config || {};
    if (limit) {
      ApiAdmin.limit = limit;
    }

    this.initAxiosRequest();
    this.initAxiosResponse();
  }

  private whiteList = ["/login", "/register"];

  protected static pools = new Map();

  protected static tokenPools = new Map();

  private static limit = 5;

  private static axiosInstance = axios.create(config);

  private initAxiosRequest() {
    ApiAdmin.axiosInstance.interceptors.request.use(
      config => {
        NProgress.start();
        const isInWhite = this.whiteList.some(url => config.url?.endsWith(url));
        if (isInWhite) {
          return config;
        }
        config.headers.Authorization = `Bearer ${getToken()}`;
        return config;
      },
      error => {
        NProgress.done();
        return Promise.reject(error);
      }
    );
  }

  private initAxiosResponse() {
    ApiAdmin.axiosInstance.interceptors.response.use(
      response => {
        NProgress.done();
        const { data, status } = response;
        if (status === 401 || data.code === 401) {
          removeToken();
          ElMessage.error("登录过期，请重新登录");
          router.push({
            path: "/login",
            query: {
              redirect: encodeURIComponent(router.currentRoute.value.fullPath)
            }
          });
          return Promise.reject("Unauthorized");
        } else if (status === 200 && data.code === 200) {
          const token = response.headers[
            import.meta.env.VITE_APP_TOKEN_KEY
          ] as string;
          if (token) {
            setToken(token);
          }
        }
        return response;
      },
      error => {
        NProgress.done();
        return Promise.reject(error);
      }
    );
  }

  public async request<T>({
    method,
    url,
    param
  }: vRequestParameters): Promise<T> {
    const config: AxiosRequestConfig = {
      method,
      url,
      ...param,
      cancelToken: new axios.CancelToken(cancel => {
        const cancelTokenExists = ApiAdmin.pools.has(url);
        if (cancelTokenExists) {
          ApiAdmin.pools.get(url)!.cancel("重复请求");
          ApiAdmin.pools.delete(url);
        }
        ApiAdmin.tokenPools.set(url, cancel);
      })
    };
    try {
      const result = await ApiAdmin.axiosInstance.request<T>(config);
      ApiAdmin.pools.delete(url);
      if (result.status === 200) {
        return result.data;
      } else if (result.status === 401) {
        return Promise.reject("Unauthorized");
      } else {
        return Promise.reject(result.data);
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        if (e.status === 401) {
        }
      }
      return Promise.reject(e);
    }
  }

  public async get<T, P = any>(url: string, params?: P): Promise<T> {
    return this.request<T>({
      method: "GET",
      url,
      param: {
        params
      }
    });
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({
      method: "POST",
      url,
      param: {
        data
      }
    });
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({
      method: "PUT",
      url,
      param: {
        data
      }
    });
  }

  public async delete<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({
      method: "DELETE",
      url,
      param: {
        data
      }
    });
  }

  public async patch<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({
      method: "PATCH",
      url,
      param: {
        data
      }
    });
  }
}

export const apiAdmin = new ApiAdmin();
