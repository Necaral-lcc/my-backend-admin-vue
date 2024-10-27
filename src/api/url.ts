import type { vURL } from "./type";

const VITE_APP_PREFIX = import.meta.env.VITE_APP_PREFIX;

export const URL: vURL = {
  login: {
    url: VITE_APP_PREFIX + "/login",
    method: "post"
  }
};
