import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000
    },
    esbuild: {
        exclude: ["*.test.tsx"],
    },
    build: {
        sourcemap: true,
    },
    plugins: [
        react(),
        svgrPlugin()
    ],
    resolve: {
        alias: {
            path: "path-browserify",
        }
    },
    optimizeDeps: {
        // exclude: ["@mathgrass/glsp-frontend"],
        esbuildOptions: {
            tsconfigRaw: {
                compilerOptions: {
                    experimentalDecorators: true,
                }
            }
        }
    }
});