
export interface SynologyConnectionParams {
    url: string,
    username: string,
    password: string
}

export interface FileSaveLocation {
    movies: string,
    tvshows: string
}

const KEY_SynologyConnectionParams = "SynologyConnectionParams"
const KEY_FileSaveLocation = "FileSaveLocation"

export function saveSynologyConnectionParams(param: SynologyConnectionParams) {
    localStorage.setItem(KEY_SynologyConnectionParams, JSON.stringify(param))
}

export function getSynologyConnectionParams(): SynologyConnectionParams|undefined {
    const str = localStorage.getItem(KEY_SynologyConnectionParams)
    if (str && str.length > 0) {
        return JSON.parse(str) as SynologyConnectionParams
    } else {
        return undefined
    }
}

export function saveFileSaveLocation(location: FileSaveLocation) {
    localStorage.setItem(KEY_FileSaveLocation, JSON.stringify(location))
}

export function getFileSaveLocation(): FileSaveLocation|undefined {
    const str = localStorage.getItem(KEY_FileSaveLocation)
    if (str && str.length > 0) {
        return JSON.parse(str) as FileSaveLocation
    } else {
        return undefined
    }
}