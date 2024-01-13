import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000
    },
    plugins: [
        react({
            babel: {
                plugins: [
                    ["@babel/plugin-proposal-decorators", { legacy: true }],
                    [
                        "@babel/plugin-proposal-class-properties",
                        { loose: true },
                    ],
                ],
            },
        }),
        viteTsconfigPaths(),
        svgrPlugin()
    ],
    resolve: {
        alias: {
            path: "path-browserify",
        },
    },
});