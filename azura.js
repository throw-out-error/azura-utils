const fetch = require("node-fetch")

/**
 * @typedef Song
 * @property id {string}
 * @property text {string}
 * @property artist {string}
 * @property title {string}
 * @property album {string}
 * @property genre {string}
 * @property lyrics {string}
 * @property art {string} Song artwork url
 * @property custom_fields {unknown[]}
 */

/**
 * @typedef PlayingStatus
 * @property elapsed {number}
 * @property remaining {number}
 * @property played_at {number}
 * @property duration {number}
 * @property playlist {string}
 * @property streamer {string}
 * @property is_request {boolean}
 * @property song {Song}
 */

/**
 * @param baseUrl {string}
 * @returns {(stationName: string) => Promise<PlayingStatus>}
 */
const getStatus = (baseUrl) =>
    (stationName) => new Promise((resolve, reject) => {
        fetch(`${baseUrl}/api/nowplaying`).then(res => res.json()).then(res => {
            const station = getStationByName(stationName, res);
            if (station !== undefined)
                resolve(station.now_playing);
            else reject(new Error("Invalid station data"))
        })
    })

/**
 * @param name {string}
 * @param data {unknown[]}
 */
const getStationByName = (name, data) => {
    return data.filter(d => d.station && d.station.name && d.station.name.toLowerCase() === name.toLowerCase())[0] || undefined
}

/**
 * @param baseUrl {string}
 */
const azuraCast = (baseUrl) => {
    return {
        getStationByName,

        getStatus: getStatus(baseUrl),

        /**
         * @param station {string}
         * @returns {Promise<string>}
         */
        getSongName: (station) => getStatus(baseUrl)(station).then(s => s.song.text)
    }
}

exports.azuraCast = azuraCast;