import fs from 'fs'

export function listFiles(path: string): string[] {
    return fs.readdirSync(path)
}
