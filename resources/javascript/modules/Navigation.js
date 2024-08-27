const menu = document.querySelector('.site-navigation')

export function openMenu() {
  menu.classList.add('site-navigation--open')
}

export function closeMenu() {
  menu.classList.remove('site-navigation--open')
}

export function toggleMenu() {
  if (menu.classList.contains('site-navigation--open')) {
    menu.classList.remove('site-navigation--open')
  } else {
    menu.classList.add('site-navigation--open')
  }
}