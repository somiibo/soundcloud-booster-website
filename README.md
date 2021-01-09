<div align="center">
  <a href="https://cdn.itwcreativeworks.com/assets/itw-creative-works/images/logo/itw-creative-works-brandmark-black-x.svg">
    <img src="https://cdn.itwcreativeworks.com/assets/itw-creative-works/images/logo/itw-creative-works-brandmark-black-x.svg">
  </a>
  <br>
  <br>

![GitHub package.json version](https://img.shields.io/github/package-json/v/iwiedenm/ultimate-jekyll.svg)

![David](https://img.shields.io/david/iwiedenm/ultimate-jekyll.svg)
![David](https://img.shields.io/david/dev/iwiedenm/ultimate-jekyll.svg) <!-- ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/iwiedenm/ultimate-jekyll.svg) -->
<!-- ![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability-percentage/iwiedenm/ultimate-jekyll.svg) -->
![Website](https://img.shields.io/website/https/template.itwcreativeworks.com.svg)
![GitHub](https://img.shields.io/github/license/iwiedenm/ultimate-jekyll.svg)
![GitHub contributors](https://img.shields.io/github/contributors/iwiedenm/ultimate-jekyll.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/iwiedenm/ultimate-jekyll.svg)

# Ultimate Jekyll
**Ultimate Jekyll** is a template that helps you jumpstart your Jekyll sites and is fueled by an intuitive incorporation of npm, gulp, and is fully SEO optimized and blazingly fast. You can sync this **Template** repo with your copy of the project to get all the updates!

[Site](https://template.itwcreativeworks.com) | [NPM Module](https://www.npmjs.com/package/ultimate-jekyll) | [GitHub Repo](https://github.com/iwiedenm/ultimate-jekyll)

</div>

# Creating & synching new repo from the ultimate-jekyll template
1. Navigate to [https://github.com/itw-creative-works/ultimate-jekyll/](https://github.com/itw-creative-works/ultimate-jekyll/) and click **Use this template** or just [generate it here](https://github.com/iwiedenm/ultimate-jekyll/generate).
2. In the next window, name the new repository and choose an organization to host the repository.
3. Create a branch called `master`, then make `master` the default branch, and finally delete the branch called `template`.
4. Open the newly created repository on GitHub and click **Open in Desktop** then choose location using GitHub desktop.
5. In the repo's settings add a secret called `ACCESS_TOKEN` and paste a GitHub token that has write permissions for this repo.
6. Open Terminal and do the following commands or simply `npm run template:setup`    
7. Go back into GitHub desktop on the new repo and press **Push** in top bar.
8. Initialize the new repo by entering this command in Terminal:
  * `npm start`

# Get changes from the ultimate-jekyll template
Perform the following steps or simply run `npm run template:update`
1. Open GitHub Desktop and select your project (not ultimate-jekyll, the project that uses ultimate-jekyll).
2. Change current branch to `template`.
3. Then press **Fetch upstream**.
4. Then **Pull upstream**.
5. Change current branch to `master`.
6. Click **Choose branch to merge into `master`** from the branch dropdown (at the bottom).
7. Select `template` from the list.
8. Click the blue **Merge `template` into `master`** button.
9. Press **Push origin** in the top right.

# How to properly use the template
This repo will only ever receive changes to files located in `master` folders. You can safely customize any file in `app` folders. For example:
  * Do **NOT** edit: `assets/_src/js/master/main.js`
  * Do edit: `assets/_src/js/app/app.js`
You can always run `npm run template:update` to get all the latest updates from the **Ultimate Jekyll template** but be sure to check if there were any breaking changes.

# Run a local https server
1. Execute:
  * `npm run create:cert`
  * `npm run prototype:https`
2. Press <kbd>cmd + option + i</kbd> on the webpage that opens.
3. Go to **Security** tab and press **Show certificate**.
4. Drag the certificate to your Desktop then double-click it
5. Double-click it when it has opened in keychain
6. Open the **trust** dropdown and change it to **always trust**

# Things to regularly update on ultimate-jekyll
* ./special/master/misc/master-service-worker.js = instances of Firebase SDKs being loaded

# Things to regularly update on web-manager
* Dependencies in package.json

# Reference
* https://medium.com/sweetmeat/how-to-keep-a-downstream-git-repository-current-with-upstream-repository-changes-10b76fad6d97
* https://medium.com/@smrgrace/having-a-git-repo-that-is-a-template-for-new-projects-148079b7f178
