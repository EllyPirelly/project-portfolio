// dark-light mode
const darkLightMode = (function () {
    const darkModeClass = 'dark-theme'
    const localStorageKey = 'hasColorSchemeDark'

    const getColorScheme = () => {
        // return if dark colorscheme is enable
    }

    const removeColorScheme = () => {
        // remove everything related to dark colorscheme
    }

    const setColorScheme = () => {
        // set everything related to dark colorscheme
    }

    const toggleColorScheme = (setDarkColorScheme) => {
        // get toggle/ checkbox which toggles the color scheme (it shouldn't be
        // a button, but a checkbox, I changed the markup in the index.html already)

        // if checkbox doesn't exist exit the function

        // set the 'checked' property of the checkbox in accordance to the available color scheme

        // add an action/ function to toggle the color scheme
        // the function should be executed when the checkbox changes its state
    }

    const init = () => {
        if (getColorScheme()) {
            setColorScheme()
        }

        toggleColorScheme()
    }

    return {
        init
    }
})()

// toggle
const toggleClass = (item, targetItem) => {
    if (item.getAttribute('data-toggle')) {
        targetItem.classList.toggle('toggle');
    } else {
        targetItem.classList.remove('toggle');
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

// filter/show blog fractions by tags
const blogFractionSelection = (function () {
    const blogFractions = [];
    const defaultTags = [];
    const selectedTags = [];

    const getblogFractions = () => {
        Array.from(document.querySelectorAll('[data-element="blog-fraction"]')).forEach(blogfraction => blogFractions.push(blogfraction));
    }

    const hideBlogFractions = blogfractions => {
        blogfractions.forEach(blogfraction => {
            blogfraction.classList.add('hidden');
        })
    }

    const setHiddenBlogFractions = () => {
        if (selectedTags.length === 0) {
            return false;
        }

        const hiddenBlogFractions = blogFractions.filter(blogfraction => {
            const fractionTags = blogfraction.getAttribute('data-tags').split(' ');
            return !selectedTags.some(tag => fractionTags.includes(tag));
        })

        hideBlogFractions(hiddenBlogFractions);
    }

    const getDefaultTags = () => {
        blogFractions.forEach(blogfraction => {
            const tags = blogfraction.getAttribute('data-tags').split(' ');

            tags.forEach(tag => {
                if (!defaultTags.includes(tag)) {
                    defaultTags.push(tag);
                }
            })
        })

        defaultTags.sort();
    }

    const getSelectedTags = () => {
        const queryStringTags = new URLSearchParams(window.location.search);

        if (queryStringTags.has('tags')) {
            queryStringTags.get('tags').split(',').forEach(tag => selectedTags.push(tag));
        }
    }

    const getNewUrl = (tags = [], pathName = '/blog/blog-overview.html') => {
        const queryStrings = new URLSearchParams(window.location.search);

        if (tags.length > 0) {
            queryStrings.set('tags', tags.join(','));
        } else {
            queryStrings.delete('tags');
        }

        return `${window.location.origin}${pathName}?${queryStrings.toString()}`;
    }

    const tagLinkAction = event => {
        event.preventDefault();

        const tagLink = event.target;
        const tag = tagLink.getAttribute('data-taglink');

        if (!selectedTags.includes(tag)) {
            selectedTags.push(tag);
        } else {
            selectedTags.splice(selectedTags.indexOf(tag), 1);
        }

        window.location.href = getNewUrl(selectedTags);
    }

    const setTagFilterLinks = (tagWrapper, tags) => {
        tags.forEach(tag => {
            const link = document.createElement('a');
            link.classList.add('taglink');

            if (selectedTags.includes(tag)) {
                link.classList.add('selected');
            }

            link.href = '#';
            link.setAttribute('data-taglink', tag);
            link.text = tag;
            link.addEventListener('click', tagLinkAction);

            tagWrapper.insertAdjacentElement('beforeend', link);
        })
    }


    const buttonSelectAllAction = (selectAll = false) => {
        if (selectAll) {
            window.location.href = getNewUrl(defaultTags);
        } else {
            window.location.href = getNewUrl();
        }
    }

    const setSelectAllButtons = () => {
        const buttons = Array.from(document.querySelectorAll('[data-button]'));

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const selectAll = button.getAttribute('data-button') === 'select';
                buttonSelectAllAction(selectAll);
            })
        })
    }

    const init = () => {
        const tagWrapper = document.querySelector('[data-element="tag-filter"]');

        if (tagWrapper === null) return false;

        getblogFractions();
        getDefaultTags();
        getSelectedTags();

        setTagFilterLinks(tagWrapper, defaultTags);
        setHiddenBlogFractions();
        setSelectAllButtons();
    }

    return {
        init
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
    darkLightMode.init();
    AnchorJump.init();
    toggleVisibility();
    blogFractionSelection.init();
})
