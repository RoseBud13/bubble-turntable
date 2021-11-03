import request from '../utils/request'

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