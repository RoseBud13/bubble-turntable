import request from '../utils/request'

export function getEpisodes() {
    return request({
        url: `/episodes.json`,
        method: 'get'
    })
}

export function getSongs(episode) {
    return request({
        url: `/${episode}/songs.json`,
        method: 'get'
    })
}

export function getCards(episode) {
    return request({
        url: `/${episode}/cards.json`,
        method: 'get'
    })
}

export function getPoem(location) {
    return request({
        url: `/${location}/poem.json`,
        method: 'get'
    })
}