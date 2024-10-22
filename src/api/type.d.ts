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
