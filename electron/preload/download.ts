import path from 'path'
import { DownloadParam } from '../../src/components/ParseResult'
import { SynologyConnectionParams } from '../../src/storage/storage'
import { synologyLogin } from './synology'


export async function downloadActually(torrentFilePath: string,
                                 downloadParam: DownloadParam,
                                 loginParam: SynologyConnectionParams): Promise<any> {
    return new Promise((resolve, reject) => {
        console.log('downloadActually', torrentFilePath, downloadParam);

        const synology = synologyLogin(loginParam.username, loginParam.password, loginParam.url)

        // synology.FileStation.download({
        //     path: torrentFilePath,
        //     to: path.join(__dirname, "./image/example1.jpg"),
        //     mode: "download",
        // });

        setTimeout(() => {
            resolve({})
        }, 1000)
    })
}