interface VImportMetaEnv {
  readonly VITE_APP_PORT: number;
  readonly VITE_APP_TITLE: string;
  readonly VITE_REQUEST_API: string;
  readonly VITE_APP_URL: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_REQUEST_API_2: string;
  readonly VITE_REQUEST_API_3: string;
  readonly VITE_APP_TOKEN_KEY: string;
}

interface VImportMeta {
  readonly env: ImportMetaEnv;
}
