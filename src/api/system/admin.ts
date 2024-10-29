import { apiAdmin } from "../api";

interface vAdminUserPageParams {
  name?: string;
  email?: string;
}

export const getAdminUsers = <T>(data: vPageParams & vAdminUserPageParams) => {
  return apiAdmin.get<vResponseData<vListResponse<T>>>(
    "/admin-api/system/adminUser",
    data
  );
};

export const createAdminUser = <T>(data: T) => {
  return apiAdmin.post<vResponseData<T>>("/admin-api/system/adminUser", data);
};

export const getAdminUser = <T>(id: number) => {
  return apiAdmin.get<vResponseData<T>>(`/admin-api/system/adminUser/${id}`);
};

export const updateAdminUser = <T>(id: number, data: T) => {
  return apiAdmin.put<vResponseData<T>>(
    `/admin-api/system/adminUser/${id}`,
    data
  );
};
