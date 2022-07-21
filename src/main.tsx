import { DragToUpload } from '@/components/DragToUpload'
import { DownloadParam, ParseResult } from '@/components/ParseResult'
import { downloadTorrent } from '@/download/download'
import { Torrent } from '@/torrent/Torrent'
import {Button, Card, Descriptions} from '@arco-design/web-react'
import { useEffect, useState } from 'react'
import {IconDownload} from "@arco-design/web-react/icon";

const ptt = require('parse-torrent-title')

function transformTitle(title: string): string {
    if (title.match(/^\[.*\]/)) {
        return title.replace(/^\[.*\]/, '')
    } else {
        return title
    }
}

function isMovies(result: Torrent):boolean {
    return !((result.season ?? 0 > 0)
        && (result.episode ?? 0 > 0));
}

function parse(name: string): Torrent {
    const result = ptt.parse(name)
    return {
        ...result,
        title: transformTitle(result.title),
        raw: name,
        isMovie: isMovies(result)
    } as Torrent
}

export function Main() {

    const [torrent, setTorrent] = useState<Torrent | undefined>(undefined)
    const [file, setFile] = useState<File|undefined>(undefined)

    const [downloadParm, setDownloadParam] = useState<DownloadParam|undefined>(undefined)

    useEffect(() => {
        setTorrent(parse("Better.Call.Saul.S06E06.1080p.WEB.H264-CAKES[rartv]-[rarbg.to].torrent"))
    }, [])


    return <div>
        <DragToUpload onFile={(file) => {
            setFile(file)
            setTorrent(parse(file.name))
        }
        } />
        {
            torrent && <Card title={"Torrent Info"} style={{ marginTop: 10 }} hoverable>
                <Descriptions title={torrent.raw} data={[
                    { label: 'title', value: torrent.title },
                    { label: 'season', value: torrent.season },
                    { label: 'episode', value: torrent.episode },
                    { label: 'resolution', value: torrent.resolution },
                    { label: 'source', value: torrent.source },
                    { label: 'group', value: torrent.group },
                ]} />
            </Card>
        }
        {
            torrent && <Card title={"Download To"} style={{ marginTop: 10 }} hoverable>
                <ParseResult onParseChanged={(param) => {
                    setDownloadParam(param)
                }
                } parseResult={torrent}/>
            </Card>
        }
        {
            <Button onClick={() => {
                if (file && downloadParm) {
                    downloadTorrent(file, downloadParm)
                }
            }
            } style={{ marginTop: 30 , width: 300}} type={'outline'}><IconDownload/>Download</Button>
        }
    </div>
}