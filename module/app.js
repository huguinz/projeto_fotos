'use strict'

export const getPhotos = async () => {
    const url = 'https://back-projeto-fotos.onrender.com/fotos'
    const response = await fetch(url)
    const data = await response.json()

    return data
}