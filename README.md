# Portfolio site

### What is this about?

- first draft of my portfolio site
- this draft is **NOT modular on purpose**
-  content and design have been developped along the way, so extent and complexity of site was unclear when starting
- TODO: refactoring this portfolio site to a modular approach

### Preconditions

As at the beginning all I came up with was "I want a website":
- start building with HTML and (vanilla) JavaScript - **non-modular**
- use SCSS
    - try out [parcel.js](https://parceljs.org/getting_started.html), as a less work intense bundler than Webpack
- come up with design myself
- taking care of images, svgs, et all myself
- come up with possible content

### How to run this?

- clone the repo
- cd into project
- run `npm install`
- to run in development mode: `npm run dev`, this will fire up the server at http://localhost:1234
- to run in production mode: `npm run build`, this will also minify your files into the `dist` folder
- stop the server with `control c`

### TODO / ongoing

- implementation of filtering for tagged blog posts
