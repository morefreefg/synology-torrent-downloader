import { TVShows } from '@/components/TVShows'
import { Torrent } from '@/torrent/Torrent'
import { Card, Radio } from '@arco-design/web-react'
import { useEffect, useState } from 'react'
import { Movies } from './Movies'

const RadioGroup = Radio.Group


export function ParseResult(props: { parseResult: Torrent }) {
    const { parseResult } = props

    const [value, setValue] = useState<string>('movies')

    const onChange = (e: any) => {
        setValue(e)
    }

    useEffect(() => {
        if (parseResult.isMovie) {
            setValue('movies')
        } else {
            setValue('tvshows')
        }
    }, [parseResult.raw])

    return (
        <div>
            <div>You can change the auto-detected info as you wish</div>
            <RadioGroup style={{ marginTop: 10 }}
                        direction={'vertical'}
                        onChange={onChange} value={value}>
                <Radio value="movies">
                    <Card style={{ display: 'inline-block' }}>
                        <Movies parseResult={props.parseResult} />
                    </Card>
                </Radio>
                <Radio style={{ marginTop: 10 }} value="tvshows">
                    <Card style={{ display: 'inline-block' }}>
                        <TVShows parseResult={props.parseResult} />
                    </Card>
                </Radio>
            </RadioGroup>
        </div>
    )
}