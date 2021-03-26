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

const blogTeaserSelection = (function () {
  let selectAllButton
  let unselectAllButton
  let tagItems
  let tagLinks
  let tag

  /* array for collected/selected tags */
  const tagCollection = []

  /* grab select/unselect button */
  const getButtonElement = () => {
    selectAllButton = document.querySelector('[data-button="select"]')
    unselectAllButton = document.querySelector('[data-button="unselect"]')
  }

  /* check if select/unselect button element is present, add listener, invoke funcs */
  const buttonAction = () => {
    if (selectAllButton !== null && unselectAllButton !== null) {
      selectAllButton.addEventListener('click', () => {
        checkAllTagItems()
        showBlogPosts()
      })
      unselectAllButton.addEventListener('click', () => {
        uncheckAllTagItems()
        showBlogPosts()
      })
    }

    /* grab tagItems (input tag) - check all */
    function checkAllTagItems() {
      tagItems = document.querySelectorAll('[data-input="tagcheck"]')
      for (let i = 0; i < tagItems.length; i++) {
        if (tagItems[i].type == 'checkbox') {
          tagItems[i].checked = true
        }
      }
    }

    /* grab tagItems (input tag) - uncheck all */
    function uncheckAllTagItems() {
      tagItems = document.querySelectorAll('[data-input="tagcheck"]')
      for (let i = 0; i < tagItems.length; i++) {
        if (tagItems[i].type == 'checkbox') {
          tagItems[i].checked = false
        }
      }
    }

    function showBlogPosts() {
      // ToDo - show only selected/checked teaser
    }
  }

  /* grab tagLinks (a tag) elements */
  const getTagLinks = () => {
    tagLinks = Array.from(document.querySelectorAll('[data-tag-link]'))
  }

  /* add listener on single tagLink element */
  const tagAction = () => {
    tagLinks.forEach((tagLink) => {
      tagLink.addEventListener('click', function () {
        tag = this.getAttribute('data-tag-link')
        checkTagLink(tag)
      })
    })

    /* tag - push/pull to tagCollection array */
    function checkTagLink(tag) {
      if (!tagCollection.includes(tag)) {
        tagCollection.push(tag)
      } else if (tagCollection.includes(tag)) {
        tagCollection.pop(tag)
      }
      console.log(tag)
      console.log(tagCollection)
    }
  }

  /* create URL of selected tags, set created URL back to default */
  const createURL = () => {
    // adapt query string to selection -> blogoverview.html?tags=...,...
    // remove query string from URL back to default/base
  }

  const init = () => {
    getButtonElement()
    buttonAction()
    getTagLinks()
    tagAction()
    createURL()
  }

  return {
    init,
  }
})()

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
  blogTeaserSelection.init()
})
