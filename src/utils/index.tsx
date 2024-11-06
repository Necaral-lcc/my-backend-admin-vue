export * from "./date";

export function toSnakeCase(camelCaseStr: string) {
  return camelCaseStr.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

export function toCssNameCase(camelCaseStr: string) {
  return camelCaseStr.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function toCamelCase(snakeCaseStr: string) {
  return snakeCaseStr.replace(/(\_\w)/g, m => m[1].toUpperCase());
}

export function menuArrToTree(arr: vMenuTree[]): vTreeOption[] {
  const root: vTreeOption = {
    value: 0,
    label: "主菜单",
    children: []
  };

  root.children = mapMenuTree(arr, 0);

  return [root];
}
export const mapMenuTree = (ar: vMenuTree[], parentId: number) => {
  return ar
    .filter(item => item.parentId === parentId)
    .map(item => {
      const obj: vTreeOption = {
        value: item.id,
        label: item.title,
        children: mapMenuTree(ar, item.id)
      };
      return obj;
    });
};
