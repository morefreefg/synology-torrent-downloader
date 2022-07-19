const Synology = require('@ltaoo/synology/index');

function parseHostAndPortFromUrl(url: string) {
    if (!url.includes(':')) {
        let port, host
        if (url.startsWith('http://')) {
            port = '80'
        } else if (url.startsWith('https://')) {
            port = '443'
        }

        host = url.replace("https://", '')
            .replace("http://", '')

        return {host, port}
    }

    const realUrl = url.replace("https://", '')
        .replace("http://", '')

    const urlSplit = realUrl.split(':');
    const host = urlSplit[0];
    const port = urlSplit[1];
    return {host, port};
}

export async function testSynologyLogin(username: string,
                              password: string,
                              url: string) {

    const parsed = parseHostAndPortFromUrl(url)
    const options = {
        protocol: url.startsWith("https") ? "https" : "http",
        host: parsed.host,
        port: parsed.port,
    }

    console.log(options)

    const synology = new Synology(options);

    await synology.Auth.auth({username, password,});
}