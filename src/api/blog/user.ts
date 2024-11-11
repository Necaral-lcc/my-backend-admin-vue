import { apiAdmin } from "../api";

export const getUserList = <T>(data: vPageParams) => {
  return apiAdmin.get<vResponseData<vListResponse<T>>>(
    "/admin-api/blog/user",
    data
  );
};

export const getUser = <T>(id: number) => {
  return apiAdmin.get<vResponseData<T>>(`/admin-api/blog/user/${id}`);
};

export const updateUser = <T>({ id, ...data }: vUserUpdate) => {
  return apiAdmin.put<vResponseData<T>>(`/admin-api/blog/user/${id}`, data);
};

export const createUser = <T = any>(data: vUserForm) => {
  return apiAdmin.post<vResponseData<T>>("/admin-api/blog/user", data);
};

export const deleteUser = <T = any>(id: number) => {
  return apiAdmin.delete<vResponseData<T>>(`/admin-api/blog/user/${id}`);
};
