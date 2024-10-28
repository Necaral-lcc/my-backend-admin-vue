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
