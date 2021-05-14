# Portfolio site

### What is this about?

- first draft of my portfolio site
- this draft is **NOT modular on purpose**
- content and design have been developped while coding, so extent and complexity of site was unclear at start
- TODO: refactoring of the first draft to a modular approach

### Preconditions

At the beginning there only was this statement: "I want a website".<br>
From that, following preconditions have been derived:

- start building with HTML and (vanilla) JavaScript - **non-modular**
- use SCSS
  - use [parcel.js](https://parceljs.org/getting_started.html) as a less work intense bundler than Webpack
- come up with design myself
- taking care of images, svgs, etc, myself
- create content
- desirable features will arise along the way
- identify the right moment to start refactoring to modular

### Collaboration

The filtering function for the blogpost overview page and the dark-light mode toggle has been developped in collaboration with [@bermael](https://github.com/bermael)

### How to run this?

- clone the repo
- cd into project
- run `npm install`
- to run in development mode: `npm run dev`, this will fire up the server at http://localhost:1234
- to run in production mode: `npm run build`, this will also minify your files into the `dist` folder
- stop the server with `control c`
