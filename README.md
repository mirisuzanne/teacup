# teacup gorilla

This site is built using:

- HTML, of course
- CSS w/ a load of Grids & Variables
- [Eleventy](http://www.11ty.io) JS w/ Markdown & Nunjucks
- Sass w/ OddBird's [Accoutrement](https://www.oddbird.net/accoutrement/) &
  [Herman](https://www.oddbird.net/herman/)
- [CircleCI](https://circleci.com/) for continuous integration
- [Netlify](https://www.netlify.com/) for deployment
- A lot of ideas from a lot of cool people

## Develop:

We recommend using [nvm](https://github.com/nvm-sh/nvm) for node version
management. Once you have it installed, run `nvm install` (once per active
shell) to use the correct version of node for OddLeventy development.

Install dependencies:

```
npm install
```

Compile and run [Eleventy](http://www.11ty.io) server, with a watcher for file
changes:

```
npm run serve
```

The site will be compiled into `_site/` and available at http://localhost:8080.

You can also run individual commands:

```
# build the static site for development
npm run build

# build the static site for production
npm run prod

# format and lint all files
npm run lint

# compile sass
npm run sass

# compile js
npm run js

# format and lint js
npm run lint:js
```

Sass Docs are compiled into the `_site/style/` folder, which is then available
at the URL: `/style/`.

## Deployment

The site is auto-deployed on [Netlify](https://www.netlify.com/) from the
`master` branch on GitHub. Deploys are automated on push to master.

Use branches and PRs for changes, and Netlify will create staging previews for
functional review before merge.
