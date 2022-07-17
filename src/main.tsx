import { DragToUpload } from '@/components/DragToUpload'
import { ParseResult } from '@/components/ParseResult'
import { Torrent } from '@/torrent/Torrent'
import { Card, Descriptions } from '@arco-design/web-react'
import { useEffect, useState } from 'react'

const ptt = require('parse-torrent-title')

function transformTitle(title: string): string {
    if (title.match(/^\[.*\]/)) {
        return title.replace(/^\[.*\]/, '')
    } else {
        return title
    }
}

function isMovies(result: Torrent):boolean {
    if ((result.season ?? 0 > 0)
        && (result.episode ?? 0 > 0)) {
        return false
    } else {
        return true
    }
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

    useEffect(() => {
        setTorrent(parse("Better.Call.Saul.S06E06.1080p.WEB.H264-CAKES[rartv]-[rarbg.to].torrent"))
    }, [])


    return <div>
        <DragToUpload onFile={(file) => {
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
            torrent && <Card title={"Auto-Detected Result"} style={{ marginTop: 10 }} hoverable>
                <ParseResult parseReuslt={torrent}/>
            </Card>
        }
    </div>
}