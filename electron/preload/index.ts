import {
    exposeInMainWorld,
    browserWindowPreloadApis,
} from '@modern-js/runtime/electron-render';
import * as fs from 'fs'

export const apis = {
    ...browserWindowPreloadApis,
    readFileSync: (path: string) => {
        return fs.readFileSync(path);
    },
    listFiles: (path: string) => {
        return fs.readdirSync(path)
    }
};

exposeInMainWorld(apis);