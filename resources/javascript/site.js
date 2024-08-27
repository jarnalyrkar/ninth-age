import { TabsCardsListener } from "./modules/TabsCards";
import { languageSelector, closeLanguageSelector } from "./modules/LanguageSelector";
const tabsCards = document.querySelectorAll('.tabs-cards')
if (tabsCards) {
  tabsCards.forEach(el => {
    TabsCardsListener(el)
  })
}
languageSelector()

addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') {
    closeLanguageSelector()
  }
})
