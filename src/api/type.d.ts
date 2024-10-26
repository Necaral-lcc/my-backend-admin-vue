import type { AxiosRequestConfig } from "axios";

export interface vRequestParameters {
  method: RequestMethods;
  url: string;
  param?: AxiosRequestConfig;
}

type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface vURLPath {
  url: string;
  method: RequestMethods;
}

export interface vURL {
  [key: string]: vURLPath;
}
