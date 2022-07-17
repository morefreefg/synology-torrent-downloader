import { Torrent } from '@/torrent/Torrent'
import { Input, Tag } from '@arco-design/web-react'
import { IconDownload } from '@arco-design/web-react/icon'


export function Movies(props: { parseResult: Torrent}) {
    return <div style={{ display: 'inline-block'}}>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div style={{ fontWeight: 'bold' }}>{"🎬 Movie"}</div>
            <Tag icon={<IconDownload/>} size={'medium'} style={{ color: 'black',  marginTop: 5 }}>
                {"/Unraid/Movies"}
            </Tag>
        </div>
    </div>
}