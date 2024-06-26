import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import dts from 'vite-plugin-dts'
import svgLoader from 'vite-svg-loader'
import { fileURLToPath, URL } from 'url'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      dts({
        rollupTypes: true,
      }),
      vue(),
      basicSsl(),
      svgLoader(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        imports: ['vue'],
        dts: 'src/auto-imports.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      devSourcemap: true,
    },
    server: {
      port: 3000,
      host: true,
    },
    build: {
      cssCodeSplit: false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'f2e',
        fileName: `f2e-base`,
      },
      rollupOptions: {
        external: ['@lctech-tw/f2e-doooooooog'],
        output: {
          format: 'es',
          globals: {
            '@lctech-tw/f2e-doooooooog': 'dog',
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name == 'style.css') {
              return 'f2e-base.css'
            }
            return assetInfo.name
          },
        },
      },
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    define: {
      'process.env': process.env,
      APP_VERSION: mode === 'production' ? JSON.stringify('v' + process.env.npm_package_version) : `"${mode}"`,
    },
  }
})
