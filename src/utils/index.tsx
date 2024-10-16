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
