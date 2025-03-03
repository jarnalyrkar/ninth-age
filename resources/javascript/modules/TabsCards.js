export function TabsCardsListener(el) {
  const nav = el.querySelector('.tabs-cards__nav-list')
  nav.addEventListener('click', (ev) => {
    if (ev.target.classList.contains("tabs-cards__nav-button")
      && !ev.target.classList.contains('tabs-cards__nav-button--active')) {
        const currentlyActiveTab = el.querySelector('.tabs-card--active')
        const currentlyActiveButton = el.querySelector('.tabs-cards__nav-button--active')
        currentlyActiveTab.classList.remove('tabs-card--active')
        currentlyActiveButton.classList.remove('tabs-cards__nav-button--active')

        const buttonTarget = ev.target.value
        const newTab = el.querySelector(`.tabs-card[data-tab="${buttonTarget}"]`)
        ev.target.classList.add('tabs-cards__nav-button--active')
        newTab.classList.add('tabs-card--active')
    }
  })
}