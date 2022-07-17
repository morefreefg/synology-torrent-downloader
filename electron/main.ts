import { app } from 'electron';
import Runtime, { winService } from '@modern-js/runtime/electron-main';
import { join } from 'path';

const PRELOAD_JS = join(
    __dirname,
    'preload',
    'index.dev.js'
);

const runtime = new Runtime({
  windowsConfig: [
    {
      name: 'main',
      options: {
        webPreferences: {
          enableRemoteModule: true,
          preload: PRELOAD_JS,
        },
      },
    },
  ],
  mainServices: {
    test: () => 'hello, modern js electron',
  },
});

app.whenReady().then(async () => {
  await runtime.init();

  winService.createWindow({
    name: 'main',
  });
});
