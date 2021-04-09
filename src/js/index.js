// toggle
const toggleClass = (item, targetItem) => {
    if (item.getAttribute('data-toggle')) {
        targetItem.classList.toggle('toggle')
    } else {
        targetItem.classList.remove('toggle')
    }
}

const toggleVisibility = () => {
    const toggleItems = Array.from(document.querySelectorAll('[data-toggle]'));

    toggleItems.forEach((toggle) => {
        const targetSelector = toggle.getAttribute('data-target');
        const targetPiece = document.querySelector(targetSelector);

        toggle.addEventListener('click', function () {
            toggleClass(this, targetPiece);
        })
    })
}

// filter/show blog snippets
const blogSnippets = (function () {

    let selectAllButton;
    let unselectAllButton;
    let tag;
    let tagCollection = [];
    let tagLinks = [];
    let blogPosts = [];

    const getButtonElement = () => {
        selectAllButton = document.querySelector('[data-button="select"]');
        unselectAllButton = document.querySelector('[data-button="unselect"]');
    }

    const buttonAction = () => {
        if (selectAllButton !== null && unselectAllButton !== null) {
            selectAllButton.addEventListener('click', () => {
                tagLinkClicked(tagLinks);
                showBlogPosts(blogPosts);
            })
            unselectAllButton.addEventListener('click', () => {
                tagLinkUnclicked(tagLinks);
                showBlogPosts(blogPosts);
            })
        }
    }

    const getTagLinks = () => {
        tagLinks = Array.from(document.querySelectorAll('[data-tag-link]'));
    }

    /* better and cleverer solution to combine both?? */
    const tagLinkClicked = (tagLinks) => {
        tagLinks.forEach(tagLink => {
            tagLink.classList.add('clicked');
        })
    }

    const tagLinkUnclicked = (tagLinks) => {
        tagLinks.forEach(tagLink => {
            tagLink.classList.remove('clicked');
        })
    }

    /* same here, when above can be solved better, same applies to this?? */
    const tagCollectionPopulation = () => {
        tagLinks.forEach((tagLink) => {
            tagLink.addEventListener('click', function () {
                tag = this.getAttribute('data-tag-link');
                tagLink.classList.add('clicked');
                tagLinkPresence(tag);
            })
        })
    }

    function tagLinkPresence(tag) {
        if (!tagCollection.includes(tag)) {
            tagCollection.push(tag);
        } else {
            const index = tagCollection.indexOf(tag);
            tagCollection.splice(index, 1);
        }
        console.log('tagCollection', tagCollection);
    }

    const getBlogPosts = () => {
        blogPosts = Array.from(document.querySelectorAll('[data-element="blog-post"]'));
    }

    const showBlogPosts = (posts) => {
        posts.forEach(post => {
            post.classList.remove('hide');
        })
    }

    const createURL = () => {
        // adapt query string to selection -> /blog/blog-overview.html?tags=...,...
        // remove query string from URL back to default/base
        // let baseUrl = window.location.origin
        // URLSearchParams.append(name, value)
    }

    const init = () => {
        getBlogPosts();
        getButtonElement();
        getTagLinks();
        buttonAction();
        tagCollectionPopulation();
        createURL();
    }

    return {
        init,
    }
})()

/* anchor jump */
const AnchorJump = (function () {

    let links;

    const setLinks = () => {
        links = Array.from(document.querySelectorAll('[data-link]'));
    }

    const linkAction = function (event) {
        event.preventDefault();

        const href = this.getAttribute('href');
        const target = document.querySelector(href);

        history.pushState(null, null, href);
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const setLinkAction = () => {
        links.forEach((link) => link.addEventListener('click', linkAction));
    }

    const init = () => {
        setLinks();
        setLinkAction();
    }

    return {
        init,
    }
})()

document.addEventListener('DOMContentLoaded', () => {
    AnchorJump.init();
    toggleVisibility();
    blogSnippets.init();
})
