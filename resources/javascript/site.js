import { TabsCardsListener } from "./modules/TabsCards";
import { languageSelector, closeLanguageSelector } from "./modules/LanguageSelector";
import { openMenu, closeMenu, toggleMenu } from "./modules/Navigation"
import { armyButtonListener } from "./modules/ArmyButtons";

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

const newsScroll = document.querySelector('#news-scroll-button')
if (newsScroll) {
  const scrollableEl = newsScroll.closest('.forum-news').querySelector('.forum-news__list')
  newsScroll.addEventListener('click', () => {
    if (scrollableEl.scrollLeft < window.innerWidth / 2) {
      scrollableEl.scroll({
        left: window.innerWidth,
        behavior: 'smooth'
      })
    } else {
      scrollableEl.scroll({
        left: 0,
        behavior: 'smooth'
      })
    }
  })
  scrollableEl.addEventListener('scroll', () => {
    if (scrollableEl.scrollLeft < window.innerWidth / 2) {
      if (newsScroll.innerHTML != ">") {
        newsScroll.innerHTML = ">"
      }
    } else {
      if (newsScroll.innerHTML != "<") {
        newsScroll.innerHTML = "<"
      }
    }
  })
}

const armiesList = document.querySelector('.armies-list')
if (armiesList) {
  armyButtonListener(armiesList)
}