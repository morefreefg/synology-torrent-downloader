import {
    exposeInMainWorld,
    browserWindowPreloadApis,
} from '@modern-js/runtime/electron-render';
import * as fs from 'fs'
import { DownloadParam } from '../../src/components/ParseResult'
import { SynologyConnectionParams } from '../../src/storage/storage'
import { downloadActually } from './download'
import {synologyLogin} from "./synology";

export const apis = {
    ...browserWindowPreloadApis,
    readFileSync: (path: string) => {
        return fs.readFileSync(path);
    },
    listFiles: (path: string) => {
        return fs.readdirSync(path)
    },
    testSynologyLogin: (username: string, password: string, url: string) => {
        return synologyLogin(username, password, url);
    },
    download: (torrentFilePath: string, downloadParam: DownloadParam, loginParam: SynologyConnectionParams) => {
        return downloadActually(torrentFilePath, downloadParam, loginParam);
    }
};

exposeInMainWorld(apis);