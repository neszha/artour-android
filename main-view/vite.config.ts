import { resolve } from 'path'
import {
    defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: tag => tag.startsWith('a-')
                }
            }
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@enums': resolve(__dirname, 'src/enums'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@stores': resolve(__dirname, 'src/stores'),
            '@interfaces': resolve(__dirname, 'src/interfaces'),
            '@components': resolve(__dirname, 'src/components'),
            '@api-urls': resolve(__dirname, 'src/constants/api-url.ts')
        }
    },
    build: {
        target: 'es2015',
        emptyOutDir: true,
        outDir: '../app/src/main/assets/web-view'
    }
})
