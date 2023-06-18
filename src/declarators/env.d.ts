/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_NPM_API_URL: string
  readonly VITE_JS_DELIVR_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
