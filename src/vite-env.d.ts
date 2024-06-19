/// <reference types="vite/client" />
//Типы для env файлов
interface ImportMetaEnv {
    readonly VITE_TOKEN: string
    readonly VITE_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
