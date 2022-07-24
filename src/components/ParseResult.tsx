import { TVShows } from '@/components/TVShows'
import { Torrent } from '@/torrent/Torrent'
import { Card, Radio } from '@arco-design/web-react'
import { useEffect, useRef, useState } from 'react'
import { Movies } from './Movies'

const RadioGroup = Radio.Group

export interface DownloadParam {
    type: 'movies'|'tvshows',
    downloadLocation: string
}

export function ParseResult(props: { parseResult: Torrent, onParseChanged: (param: DownloadParam) => void }) {
    const { parseResult, onParseChanged } = props

    const [value, setValue] = useState<string>('movies')

    const [movieLocation, setMovieLocation] = useState('')
    const [tvShowsLocation, setTvVShowsLocation] = useState('')

    const valueCurrent = useRef(value)
    const movieLocationCurrent = useRef(movieLocation)
    const tvShowsLocationCurrent = useRef(tvShowsLocation)
    valueCurrent.current = value
    movieLocationCurrent.current = movieLocation
    tvShowsLocationCurrent.current = tvShowsLocation

    const onChange = (e: any) => {
        if (e == 'tvshows') {
            onParseChanged({ type: 'tvshows', downloadLocation: movieLocationCurrent.current })
        } else if (e === 'movies') {
            onParseChanged({ type: 'movies', downloadLocation: tvShowsLocationCurrent.current })
        }

        setValue(e)
    }

    useEffect(() => {
        if (parseResult.isMovie) {
            setValue('movies')
        } else {
            setValue('tvshows')
        }
    }, [parseResult.raw])

    useEffect(() => {
        onChange(valueCurrent.current)
    }, [movieLocation, tvShowsLocation, value])

    return (
        <div>
            <div>Wanna download to?</div>
            <RadioGroup style={{ marginTop: 10 }}
                        direction={'vertical'}
                        onChange={onChange} value={value}>
                <Radio value="movies">
                    <Card style={{ display: 'inline-block' }}>
                        <Movies onChange={(val) => {
                            setMovieLocation(val)
                        }} parseResult={props.parseResult} />
                    </Card>
                </Radio>
                <Radio style={{ marginTop: 10 }} value="tvshows">
                    <Card style={{ display: 'inline-block' }}>
                        <TVShows onChange={(val) => {
                            setTvVShowsLocation(val)
                        }} parseResult={props.parseResult} />
                    </Card>
                </Radio>
            </RadioGroup>
        </div>
    )
}