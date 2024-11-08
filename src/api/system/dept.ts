import { apiAdmin } from "../api";

export const getDepts = (data?: { parentId?: number }) => {
  return apiAdmin.get<vResponseData<Array<vToTree<vDept & vTime>>>>(
    "/admin-api/system/dept",
    data
  );
};

export const getDept = (id: number) => {
  return apiAdmin.get<vResponseData<vDept>>(`/admin-api/system/dept/${id}`);
};

export const updateDept = <T>({
  id,
  ...data
}: Partial<vDept> & { id: number }) => {
  return apiAdmin.put<vResponseData<T>>(`/admin-api/system/dept/${id}`, data);
};
export const createDept = <T>(data: Omit<vDept, "id">) => {
  return apiAdmin.post<vResponseData<T>>("/admin-api/system/dept", data);
};

export const deleteDept = (id: number) => {
  return apiAdmin.delete<vResponseData<any>>(`/admin-api/system/dept/${id}`);
};

export const getDeptTree = () => {
  return apiAdmin.get<vResponseData<Array<vToTree<vListOption>>>>(
    "/admin-api/system/dept/tree"
  );
};
