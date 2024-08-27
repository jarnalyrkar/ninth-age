const dropdown = document.querySelector('.language-selector__dropdown-container')
const button = document.querySelector('.language-selector__button')
export function languageSelector() {
  button.addEventListener('click', () => {
    dropdown.classList.toggle('language-selector__dropdown-container--open')
  })
}

export function closeLanguageSelector() {
  dropdown.classList.remove('language-selector__dropdown-container--open')
}