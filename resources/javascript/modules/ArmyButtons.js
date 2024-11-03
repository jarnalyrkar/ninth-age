export function armyButtonListener(el) {
  const armies = el.querySelector('.armies-list__armies')
  const buttonList = el.querySelector('.armies-list__buttons')
  buttonList.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('army-button--active')) return
    if (ev.target.classList.contains('army-button')) {
      const active = document.querySelector('.army-button--active')
      if (active) {
        active.classList.remove('army-button--active')
        const activeSection = armies.querySelector('.army-featured--show')
        activeSection.classList.remove('army-featured--show')
      }
      ev.target.classList.add('army-button--active')
      const targetSlug = ev.target.getAttribute('data-target')
      const targetSection = armies.querySelector(`[id="${targetSlug}"]`)
      targetSection.classList.add('army-featured--show')
    }
  })
}