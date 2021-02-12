const toggleAction = (toggle, target) => {
    if(toggle.tagName.toLowerCase() === 'button') {
        target.classList.toggle('open')
    } else {
        target.classList.remove('open')
    }
}

const toggleNavBar = () => {
    const toggles = Array.from(document.querySelectorAll('[data-toggle]'))

    toggles.forEach(toggle => {
        const targetSelector = toggle.getAttribute('data-target')
        const target = document.querySelector(targetSelector)

        toggle.addEventListener('click', function() {
            toggleAction(this, target)
        })
    })
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
    toggleNavBar()
})