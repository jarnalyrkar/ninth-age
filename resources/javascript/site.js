import { TabsCardsListener } from "./modules/TabsCards";
import { languageSelector, closeLanguageSelector } from "./modules/LanguageSelector";
import { openMenu, closeMenu, toggleMenu } from "./modules/Navigation"
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
