// @ts-nocheck

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    "postcss-import": {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {})
  }
};
