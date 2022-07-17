import { TVShows } from '@/components/TVShows'
import { Torrent } from '@/torrent/Torrent'
import { Card, Radio } from '@arco-design/web-react'
import { useEffect, useState } from 'react'
import { Movies } from './Movies'

const RadioGroup = Radio.Group


export function ParseResult(props: { parseReuslt: Torrent }) {
    const { parseReuslt } = props

    const [value, setValue] = useState<string>('movies')

    const onChange = (e: any) => {
        setValue(e)
    }

    useEffect(() => {
        if (parseReuslt.isMovie) {
            setValue('movies')
        } else {
            setValue('tvshows')
        }
    }, [parseReuslt.raw])

    return (
        <div>
            <div>You can change the auto-detected info as you wish</div>
            <RadioGroup style={{ marginTop: 10 }}
                        direction={'vertical'}
                        onChange={onChange} value={value}>
                <Radio value="movies">
                    <Card style={{ display: 'inline-block' }}>
                        <Movies parseResult={props.parseReuslt} />
                    </Card>
                </Radio>
                <Radio style={{ marginTop: 10 }} value="tvshows">
                    <Card style={{ display: 'inline-block' }}>
                        <TVShows parseResult={props.parseReuslt} />
                    </Card>
                </Radio>
            </RadioGroup>
        </div>
    )
}