import { apiAdmin } from "../api";

export type vMenu = Omit<vRoute, "id" | "children"> & {
  parentId: number;
  status: boolean;
  readonly id?: number;
};

export const getMenus = <T>(data: vPageParams) => {
  return apiAdmin.get<vResponseData<vListResponse<T>>>(
    "/admin-api/system/menu",
    data
  );
};

export const getMenu = <T>(id: number) => {
  return apiAdmin.get<vResponseData<T>>(`/admin-api/system/menu/${id}`);
};
export const updateMenu = <T>(data: vMenu) => {
  return apiAdmin.put<vResponseData<T>>(
    `/admin-api/system/menu/${data.id}`,
    data
  );
};
export const createMenu = <T>(data: vMenu) => {
  return apiAdmin.post<vResponseData<vListResponse<T>>>(
    "/admin-api/system/menu",
    data
  );
};
export const getMenuTree = <T>() => {
  return apiAdmin.get<vResponseData<T>>("/admin-api/system/menu/options");
};
