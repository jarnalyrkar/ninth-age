import { TabsCardsListener } from "./modules/TabsCards";
import { languageSelector, closeLanguageSelector } from "./modules/LanguageSelector";
import { openMenu, closeMenu, toggleMenu } from "./modules/Navigation"
import { imageHoverEffect } from './modules/ImageHoverEffect'

const tabsCards = document.querySelectorAll('.tabs-cards')
if (tabsCards) {
  tabsCards.forEach(el => {
    TabsCardsListener(el)
  })
}
languageSelector()

addEventListener('click', (ev) => {
  if (ev.target.classList.contains('burger')) {
    toggleMenu()
  }
})

addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') {
    closeLanguageSelector()
    closeMenu()
  }
})

imageHoverEffect()

const newsScroll = document.querySelector('#news-scroll-button')
newsScroll.addEventListener('click', () => {
  if (newsScroll.parentElement.scrollLeft < window.innerWidth / 2) {
    newsScroll.parentElement.scroll({
      left: window.innerWidth,
      behavior: 'smooth'
    })
  } else {
    newsScroll.parentElement.scroll({
      left: 0,
      behavior: 'smooth'
    })
  }
})
newsScroll.parentElement.addEventListener('scroll', () => {
  if (newsScroll.parentElement.scrollLeft < window.innerWidth / 2) {
    if (newsScroll.innerHTML != ">") {
      newsScroll.innerHTML = ">"
    }
  } else {
    if (newsScroll.innerHTML != "<") {
      newsScroll.innerHTML = "<"
    }
  }
})