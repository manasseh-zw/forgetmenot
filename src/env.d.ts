interface ImportMetaEnv {
  readonly TURSO_DB_URL: string;
  readonly TURSO_DB_AUTH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 