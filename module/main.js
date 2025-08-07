'use strict'

import { getPhotos } from './app.js'

const carousel = document.getElementById('carousel')
const indicatorsContainer = document.getElementById('indicators')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')

let currentIndex = 0
let slides = []
let slideInterval

const createSlide = (photo) => {
  const slide = document.createElement('div')
  slide.classList.add('carousel-item')

  const img = document.createElement('img')
  img.src = photo.imagem
  img.alt = photo.legenda || 'Foto do evento'

  const overlay = document.createElement('div')
  overlay.classList.add('overlay')

  const title = document.createElement('h3')
  title.textContent = photo.legenda || ''

  const date = document.createElement('p')
  date.textContent = photo.data || ''

  overlay.appendChild(title)
  overlay.appendChild(date)

  slide.appendChild(img)
  slide.appendChild(overlay)

  return slide
}

const createIndicator = (index) => {
  const indicator = document.createElement('button')
  indicator.classList.add('indicator')
  if (index === 0) indicator.classList.add('active')

  indicator.addEventListener('click', () => {
    currentIndex = index
    updateCarousel()
    resetInterval()
  })

  return indicator
}

const updateCarousel = () => {
  const width = carousel.clientWidth
  carousel.style.transform = `translateX(-${currentIndex * width}px)`

  // Atualiza indicadores
  const indicators = indicatorsContainer.querySelectorAll('.indicator')
  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === currentIndex)
  })
}

const nextSlide = () => {
  currentIndex = (currentIndex + 1) % slides.length
  updateCarousel()
}

const prevSlide = () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length
  updateCarousel()
}

const resetInterval = () => {
  clearInterval(slideInterval)
  slideInterval = setInterval(nextSlide, 4000)
}

const loadSlides = async () => {
  try {
    slides = await getPhotos()

    slides.forEach((photo, index) => {
      const slide = createSlide(photo)
      carousel.appendChild(slide)

      const indicator = createIndicator(index)
      indicatorsContainer.appendChild(indicator)
    })

    updateCarousel()
    slideInterval = setInterval(nextSlide, 4000)
  } catch (error) {
    console.error('Erro ao carregar slides:', error)
  }
}

prevBtn.addEventListener('click', () => {
  prevSlide()
  resetInterval()
})

nextBtn.addEventListener('click', () => {
  nextSlide()
  resetInterval()
})

window.addEventListener('resize', updateCarousel)

loadSlides()