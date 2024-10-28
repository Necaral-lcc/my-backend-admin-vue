import { apiAdmin } from "../api";

export const getMenus = <T>(data: vPageParams) => {
  return apiAdmin.get<vResponseData<vListResponse<T>>>(
    "/admin-api/system/menu",
    data
  );
};
export const getMenuTree = <T>() => {
  return apiAdmin.get<vResponseData<T>>("/admin-api/system/menuTree");
};
