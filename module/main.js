'use strict'

import { getPhotos } from "./app.js";

async function  createImages() {
    const photosData = await getPhotos()
    const containerImg = document.querySelector('.slides')
   
    photosData.forEach(element => {
        const divIMG = document.createElement('img')
        divIMG.src = element.imagem
        divIMG.classList.add('slide')

        containerImg.appendChild(divIMG)
    })
}

createImages()