import { fileURLToPath, URL } from 'url';
import Components from 'unplugin-vue-components/vite';
import type { ConfigEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import VitePluginCertificate from 'vite-plugin-mkcert';
import { viteMockServe } from 'vite-plugin-mock';
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: true,
        prodEnabled: true,
        injectCode: `
          import { setupProdMockServer } from '/mock/index';
    
          setupProdMockServer();
          `,
      }),
      VitePluginCertificate({
        source: 'coding',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      target: 'es2019',
      cssTarget: 'chrome80',
      sourcemap: true,
      terserOptions: {
        //打包后移除console和注释
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      https: true,
      // Listening on all local IPs
      host: true,
      port: 3200,
      proxy: {
        // 使用 proxy 实例
        '/basic-api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/basic-api/, ""),
        },
      },
    },
  };
};
