const toggleClass = (item, targetItem) => {
  if (item.getAttribute('data-toggle')) {
    targetItem.classList.toggle('toggle')
  } else {
    targetItem.classList.remove('toggle')
  }
}

const toggleVisibility = () => {
  const toggleItems = Array.from(document.querySelectorAll('[data-toggle]'))

  toggleItems.forEach((toggle) => {
    const targetSelector = toggle.getAttribute('data-target')
    const targetPiece = document.querySelector(targetSelector)

    toggle.addEventListener('click', function () {
      toggleClass(this, targetPiece)
    })
  })
}

/* get button */
const selectButton = document.getElementById('tagselectbtn')
const unselectButton = document.getElementById('tagunselectbtn')

/* add listener */
selectButton.addEventListener('click', selectAll)
unselectButton.addEventListener('click', unselectAll)

/* todo: refactor functions */
function selectAll() {
  console.log('select')
  let items = document.getElementsByName('tagcheck')
  for (let i = 0; i < items.length; i++) {
    if (items[i].type == 'checkbox') {
      items[i].checked = true
    }
  }
}

function unselectAll() {
  console.log('unselect')
  let items = document.getElementsByName('tagcheck')
  for (let i = 0; i > items.length; i++) {
    if (items[i].type == 'checkbox') {
      items[i].checked = false
    }
  }
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

document.addEventListener('DOMContentLoaded', () => {
  AnchorJump.init()
  toggleVisibility()
})
