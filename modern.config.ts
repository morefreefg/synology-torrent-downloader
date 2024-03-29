import { defineConfig } from '@modern-js/app-tools';

// https://modernjs.dev/docs/apis/config/overview
export default defineConfig({
  output: {
    assetPrefix: '../../',
  },
  runtime: {
    state: true,
    router: {
      supportHtml5History: process.env.NODE_ENV === 'development',
    },
  },
  tools: {
    babel: {
      plugins: [
        // [
        //   'babel-plugin-import',
        //   {
        //     libraryName: '@arco-design/web-react',
        //     libraryDirectory: 'es',
        //     camel2DashComponentName: false,
        //     style: true, // 样式按需加载
        //   },
        // ],
      ],
    },
  },
  electron: {
    builder: {
      baseConfig: {
        appId: 'com.bytedance.demo',
        // eslint-disable-next-line no-template-curly-in-string
        artifactName: 'demo_${env.VERSION}.${ext}',
        files: [
          {
            from: '.',
            to: '.',
            filter: ['!**/*.map', '!**/*.d.ts', '!*.log', '!*.lock'],
          },
        ],

        directories: {
          app: 'dist',
        },
      },
    },
  },
});
