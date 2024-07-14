<div align="center">
  <a href="https://itwcreativeworks.com">
    <img src="https://cdn.itwcreativeworks.com/assets/itw-creative-works/images/logo/itw-creative-works-brandmark-black-x.svg" width="100px" alt="ITW Creative Works">
  </a>
  <br>
  <br>

![GitHub package.json version](https://img.shields.io/github/package-json/v/itw-creative-works/ultimate-jekyll.svg)

![David](https://img.shields.io/david/itw-creative-works/ultimate-jekyll.svg)
![David](https://img.shields.io/david/dev/itw-creative-works/ultimate-jekyll.svg) <!-- ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/itw-creative-works/ultimate-jekyll.svg) -->
<!-- ![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability-percentage/itw-creative-works/ultimate-jekyll.svg) -->
![Website](https://img.shields.io/website/https/template.itwcreativeworks.com.svg)
![GitHub](https://img.shields.io/github/license/itw-creative-works/ultimate-jekyll.svg)
![GitHub contributors](https://img.shields.io/github/contributors/itw-creative-works/ultimate-jekyll.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/itw-creative-works/ultimate-jekyll.svg)

# 🦄 Ultimate Jekyll
**Ultimate Jekyll** is a template that helps you jumpstart your Jekyll sites and is fueled by an intuitive incorporation of npm, gulp, and is fully SEO optimized and blazingly fast. You can sync this **Template** repo with your copy of the project to get all the updates!

[Site](https://template.itwcreativeworks.com) | [NPM Module](https://www.npmjs.com/package/ultimate-jekyll) | [GitHub Repo](https://github.com/itw-creative-works/ultimate-jekyll)

</div>

# 🚀 Getting started
Before getting started, be sure you are using **Node.js** `v10` (higher versions may not work).
1. [Create a repo](https://github.com/itw-creative-works/ultimate-jekyll/generate) from the **Ultimate Jekyll** template.
2. Rename the `template` branch to `master`.
3. In the repo's settings add a secret called `GH_TOKEN` and paste a GitHub token that has write permissions for this repo.
4. Clone the repo to your local machine with the [GitHub Desktop app](https://desktop.github.com/).
5. Run `npm run template:setup` in Terminal to setup the template.
6. Run `npm start` in Terminal to launch the website locally.

# 📦 How to sync with the template
1. Simply run `npm run template:update` in Terminal to get all the latest updates from the **Ultimate Jekyll template**.

# 🌎 Publishing your website
1. Change the `url` in `_config.yml` to your domain.
2. Push your changes to GitHub using `npm run dist` in Terminal.

# 💈 How to properly use the template
This repo will only ever receive changes to files located in `master` folders. You can safely customize any file in `app` folders. For example:
  * You should **NOT** edit: `assets/_src/js/master/main.js`
  * You should edit: `assets/_src/js/app/app.js`
You can always run `npm run template:update` to get all the latest updates from the **Ultimate Jekyll template** but be sure to check if there were any breaking changes.

# 🔒 Run a local https server
1. Execute:
  * `npm run create:cert`
  * `npm run prototype:https`
2. Press <kbd>cmd + option + i</kbd> on the webpage that opens.
3. Go to **Security** tab and press **Show certificate**.
4. Drag the certificate to your Desktop then double-click it
5. Double-click it when it has opened in keychain
6. Open the **trust** dropdown and change it to **always trust**

# 🖖 Reference
* https://medium.com/sweetmeat/how-to-keep-a-downstream-git-repository-current-with-upstream-repository-changes-10b76fad6d97
* https://medium.com/@smrgrace/having-a-git-repo-that-is-a-template-for-new-projects-148079b7f178
