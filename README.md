<p align="center">
    <img alt="Site logo" src="./src/assets/img/logo-text.svg" width="200" />
</p>
<p align="center">
    <img src="https://github.com/alexieyizhe/intern.plus/workflows/continuous%20integration/badge.svg">
</p>

## ✨ Design

Check out [the mocks](https://www.figma.com/file/FyfrbCpoSGAeY3eTROqPx5/intern?node-id=0%3A1) on Figma! You can also watch a [timelapse of the design process](https://youtu.be/0Ioruq2xIXw) on YouTube.

## 🥞 Tech Stack

Created with [React](https://reactjs.org/) and bootstrapped with `create-react-app`.  
Developed in [TypeScript](https://www.typescriptlang.org/).  
Powered by [GraphQL](https://graphql.org/) and [Apollo](https://www.apollographql.com/).  
Made pretty with [styled-components](https://www.styled-components.com).  
Functionality tested through [Cypress](https://www.cypress.io/) and [Percy](https://percy.io/).  
Code style enforced with [eslint](https://eslint.org/) and [Prettier](https://prettier.io/).  
Continuous integration with [Github Actions](https://github.com/features/actions).  
Deploys through [Netlify](http://netlify.com).

## 🚀 Development

To get started:

```sh
git clone https://github.com/alexieyizhe/intern.plus.git
cd intern.plus
npm install
npm start
```

This project (loosely) follows a [trunk based development](https://trunkbaseddevelopment.com/) style.

- Branches are split off from the `master` branch for features, fixes, and all other development.
- The `release` branch contains production code that must always be kept in a go-live state.

#### Branch naming

Branches are prefixed with the following codes to denote their purpose:

- `feat[-XX]/`: A larger feature or enhancement for the site.
- `fix[-XX]/`: A fix or patch for bugs or errors.
- `chore[-XX]/`: Development on aspects with no production changes (documentation, refactoring, style).

Branch names contain the issue number on which the development efforts are focused, if any.

#### Commits into `master` branch

When branches are merged back into `master`, they must be squashed committed.

The commit name is usually also prefixed with one of the following emojis based on the changes made in the commit, for better context when skimming through the `master` branch history:

- ✨: new feature
- 🐛: bug fixes
- ♻️: refactoring
- 💄: style changes
- 🧹: chore-related changes
- 📚: documentation

#### Commits into `release` branch (releases)

When a release is ready, a pull request should be made from `master` to `release`. This pull request title must be tagged with one of `#major|#minor|#patch`, determined by [semver rules](https://semver.org/). This is used by CI when deploying.

Once merged into `release`, CI will tag the last commit with the appropriate version number according to the pull request title.

###### Wanna get in touch? [Shoot Alex an email.](mailto:hi@alexxie.ca)
