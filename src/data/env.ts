export const env = {
  IS_DEV: import.meta.env.DEV,
  NPM_API_URL: import.meta.env.VITE_NPM_API_URL,
  JS_DELIVR_API_URL: import.meta.env.VITE_JS_DELIVR_API_URL
} as const
