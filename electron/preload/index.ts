import {
    exposeInMainWorld,
    browserWindowPreloadApis,
} from '@modern-js/runtime/electron-render';
import * as fs from 'fs'
import {testSynologyLogin} from "./synology";

export const apis = {
    ...browserWindowPreloadApis,
    readFileSync: (path: string) => {
        return fs.readFileSync(path);
    },
    listFiles: (path: string) => {
        return fs.readdirSync(path)
    },
    testSynologyLogin: (username: string, password: string, url: string) => {
        return testSynologyLogin(username, password, url);
    }
};

exposeInMainWorld(apis);