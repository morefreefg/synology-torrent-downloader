import { DownloadParam } from '@/components/ParseResult'
import { SynologyConnectionParams } from '@/storage/storage'
import { Message } from '@arco-design/web-react'
import bridge from '@modern-js/runtime/electron-bridge'


export function downloadTorrent(torrentFile: File, downloadParam: DownloadParam,
                                loginParam: SynologyConnectionParams): Promise<any> {
    if (!torrentFile || !torrentFile.name) {
        return Promise.reject(new Error("No torrent file selected"))
    }

    if (!downloadParam.downloadLocation || downloadParam.downloadLocation.length === 0) {
        return Promise.reject(new Error("No download location found"))
    }

    return bridge.download(torrentFile.path, downloadParam, loginParam)
}