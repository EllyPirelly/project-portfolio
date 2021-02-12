const toggleNavBar = () => {
    const toggles = Array.from(document.querySelectorAll('[data-toggle="nav-toggle"]'))

    toggles.forEach(toggle => {
        const targetSelector = toggle.getAttribute('data-target')
        const target = document.querySelector(targetSelector)

        toggle.addEventListener('click', () => target.classList.toggle('open'))
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

  /* code content button */
  const button = document.querySelector('[data-toggle="content-toggle"]');
  const content = document.querySelector("#code-content");
  let showContent = false;
  const buttonState = {
    "Click to show more examples" : "Click to hide",
    "Click to hide" : "Click to show more examples"
  };

  button.addEventListener("click", () => {
    showContent = !showContent;

    if (showContent === true) {
      content.style.display = "grid"
    } else {
      content.style.display = "none"
    };

    button.innerText = buttonState[button.innerText];

  });
