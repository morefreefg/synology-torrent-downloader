import { Torrent } from '@/torrent/Torrent'
import { Input, Tag } from '@arco-design/web-react'
import { IconDownload } from '@arco-design/web-react/icon'
import { useEffect, useState } from 'react'

function formatSeason(season: number): string {
    if (season < 10) {
        return 's0' + season
    } else {
        return 's' + season
    }
}

export function TVShows(props: { parseResult: Torrent }) {
    const { parseResult } = props

    const [pathPrefix, setPathPrefix] = useState('')
    const [name, setName] = useState('')
    const [season, setSeason] = useState('')

    useEffect(() => {
        setPathPrefix('/Unraid')
        if (parseResult.isMovie) {
            setName('')
            setSeason('')
        } else {
            setName(parseResult.title)
            setSeason(formatSeason(parseResult.season))
        }
    }, [parseResult.raw])

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/*<div style={{ display: 'flex', flexDirection: 'row'}}>*/}
        <div style={{ fontWeight: 'bold' }}>{'📺 TV Shows'}</div>
        <Tag icon={<IconDownload />} size={'medium'} style={{ color: 'black', marginTop: 5 }}>
            {pathPrefix + '/' + name + '/' + season}
        </Tag>
        <Input prefix={'PathPrefix'}
               onChange={setPathPrefix}
               value={pathPrefix}
               style={{ width: 350, marginTop: 10 }}
               allowClear />
        <Input prefix={'Name'}
               value={name}
               onChange={setName}
               style={{ width: 350, marginTop: 10 }}
               allowClear />
        <Input prefix={'Season'}
               onChange={setSeason}
               value={season}
               style={{ width: 350, marginTop: 10 }}
               allowClear />
    </div>
}