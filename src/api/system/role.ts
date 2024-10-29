import { apiAdmin } from "../api";

export type vRole = {
  name: string;
  menuIds: number[];
};

export const getRoles = <T>(data: vPageParams) => {
  return apiAdmin.get<vResponseData<vListResponse<T>>>(
    "/admin-api/system/role",
    data
  );
};

export const getRole = <T>(id: number) => {
  return apiAdmin.get<vResponseData<T>>(`/admin-api/system/role/${id}`);
};

export const updateRole = <T>(data: vRole & { id: number }) => {
  return apiAdmin.put<vResponseData<T>>(
    `/admin-api/system/role/${data.id}`,
    data
  );
};
export const createRole = <T>(data: vRole) => {
  return apiAdmin.post<vResponseData<vListResponse<T>>>(
    "/admin-api/system/role",
    data
  );
};

export const deleteRole = (id: number) => {
  return apiAdmin.delete<vResponseData<any>>(`/admin-api/system/role/${id}`);
};

export const getRoleOptions = () => {
  return apiAdmin.get<vResponseData<vOption[]>>(
    "/admin-api/system/role/options"
  );
};
