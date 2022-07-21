import { Torrent } from '@/torrent/Torrent'
import { Input, Tag } from '@arco-design/web-react'
import { IconDownload } from '@arco-design/web-react/icon'
import {useEffect, useState} from "react";
import {getFileSaveLocation} from "@/storage/storage";


export function Movies(props: { parseResult: Torrent, onChange: (value: string) => void}) {

    const [pathPrefix, setPathPrefix] = useState('')

    useEffect(() => {
        setPathPrefix(getFileSaveLocation()?.movies ?? '')
        props.onChange(getFileSaveLocation()?.movies ?? '')
    }, [])


    return <div style={{ display: 'inline-block'}}>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div style={{ fontWeight: 'bold' }}>{"🎬 Movie"}</div>
            <Tag icon={<IconDownload/>} size={'medium'} style={{ color: 'black',  marginTop: 5 }}>
                {pathPrefix}
            </Tag>
        </div>
    </div>
}