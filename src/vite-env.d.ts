/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TEST_ANSWER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
