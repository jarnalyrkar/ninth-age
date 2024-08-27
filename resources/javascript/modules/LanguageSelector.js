const dropdown = document.querySelector('.language-selector__dropdown-container')
const button = document.querySelector('.language-selector__button')
export function languageSelector() {
  addEventListener('click', (ev) => {
    if (ev.target.classList.contains('language-selector__link')) return
    if (ev.target === button) {
      dropdown.classList.toggle('language-selector__dropdown-container--open')
    } else {
      closeLanguageSelector()
    }
  })
}

export function closeLanguageSelector() {
  dropdown.classList.remove('language-selector__dropdown-container--open')
}