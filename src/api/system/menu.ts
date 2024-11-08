import { apiAdmin } from "../api";

export type vMenu = Omit<vRoute, "id" | "children"> & {
  status: boolean;
  readonly id?: number;
  permission?: string;
};

export const getMenus = <T>(data?: { parentId?: number }) => {
  return apiAdmin.get<vResponseData<T[]>>("/admin-api/system/menu", data);
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
export const createMenu = (data: vMenu) => {
  return apiAdmin.post<vResponseData<any>>("/admin-api/system/menu", data);
};
export const getMenuOption = <T>() => {
  return apiAdmin.get<vResponseData<T[]>>("/admin-api/system/menu/options");
};

export const deleteMenu = (id: number) => {
  return apiAdmin.delete<vResponseData<any>>(`/admin-api/system/menu/${id}`);
};
