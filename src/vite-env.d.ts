/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare const APP_VERSION: string
