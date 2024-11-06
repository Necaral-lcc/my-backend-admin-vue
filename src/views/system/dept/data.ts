export const dialogFormData_default: Omit<vDept, "id"> &
  Partial<Pick<vDept, "id">> = {
  name: "",
  description: "",
  status: true,
  parentId: 0
};
