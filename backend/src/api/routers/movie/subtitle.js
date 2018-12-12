import OS from 'opensubtitles-api'

const srt2vtt = require('srt-to-vtt')
const fs = require('fs')
const pump = require('pump')
const axios 	= require('axios');
const mkdirp = require('mkdirp');

const OpenSubtitles = new OS({
    useragent:'TemporaryUserAgent',
    username: 'neznamv',
    password: 'hypertube',
    ssl: true
});

// const getToken = async () => {
//     const response = await OpenSubtitles.login();

//     return response.token
// }

export const subtitle = async (imdbid, locale) => {
    // const token = await getToken()
    const SUBTITLE_STORAGE = '/tmp/hypertube/subtitle/'
    await mkdirp(SUBTITLE_STORAGE, function (err) {
        if (err) console.error(err)
        else console.log(SUBTITLE_STORAGE, 'folder created')
    });

    const resp = await OpenSubtitles.search({
        // "limit":"all", 
        imdbid
    })
    // TODO => change resp.en to resp[locale] from USER setting. Get from JWT token



     // sometimes resp.en is undefined
     // u need to handle it 
     // because frontend is crying ...

    let srtDownloadUrl = ''
    if (resp.en)
        srtDownloadUrl = resp.en.url
    

    const response = await axios({
        method: 'GET',
        url: srtDownloadUrl,
        responseType: 'stream'
    })

    var subtitleFile = SUBTITLE_STORAGE + resp.en.filename
    subtitleFile = subtitleFile.replace('.srt', '.vtt')

    const localFileWriteStream = fs.createWriteStream(subtitleFile);

    localFileWriteStream.on("open", () => {
        pump(response.data, srt2vtt(), localFileWriteStream, (err) => {
            if (err) {
                return 'error'
            }
        });
    });

    const NGINX = "http://localhost:8013"
    const file = NGINX+subtitleFile

    console.log('subtitle file returning:', file)
    return file
}
