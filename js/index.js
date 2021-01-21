const toggleNavBar = () => {
  const toggle = document.querySelector('[data-element="nav-toggle"]')
  const targetSelector = toggle.getAttribute('data-target')
  const target = document.querySelector(targetSelector)

  toggle.addEventListener('click', () => target.classList.toggle('open'))
}

const AnchorJump = (function () {
  let links

  const setLinks = () => {
    links = Array.from(document.querySelectorAll('[data-link]'))
  }

  const linkAction = function (event) {
    event.preventDefault()

    const href = this.getAttribute('href')
    const target = document.querySelector(href)

    history.pushState(null, null, href)
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const setLinkAction = () => {
    links.forEach((link) => link.addEventListener('click', linkAction))
  }

  const init = () => {
    setLinks()
    setLinkAction()
  }

  return {
    init,
  }
})()

toggleNavBar()
document.addEventListener('DOMContentLoaded', AnchorJump.init)
