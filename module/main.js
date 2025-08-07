'use strict'

import { getPhotos } from "./app.js";

async function  createImages() {
    const photosData = await getPhotos()
    const containerImg = document.querySelector('.container_images')
   
    photosData.forEach(element => {
        const divIMG = document.createElement('img')
        divIMG.src = element.imagem
        

        containerImg.appendChild(divIMG)
    })
}

createImages()