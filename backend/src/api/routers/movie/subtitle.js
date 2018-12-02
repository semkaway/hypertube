import OS from 'opensubtitles-api'

const OpenSubtitles = new OS({
    useragent:'TemporaryUserAgent',
    username: 'neznamv',
    password: 'hypertube',
    ssl: true
});

const getToken = async () => {
    const response = await OpenSubtitles.login();

    return response.token
}

export const subtitle = async (req, res, next) => {
    
    const token = await getToken()
    const imdbid = "tt0095016"

    const resp = await OpenSubtitles.search( {"limit":"all", imdbid} )

    // console.log("resp => ", resp)
    console.log("en => ", resp.en)

    res.status(200).json({
        "success": true,
        "token": token,
        "resp": resp.en
    });
}
