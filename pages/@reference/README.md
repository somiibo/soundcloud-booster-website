# Getting started
```shell
npm run install:pre
npm install
```

# Creating & synching new repo from the ultimate-jekyll template
1. Navigate to <a href="https://github.com/itw-creative-works/ultimate-jekyll/" target="{{ site.escapes.underscore }}blank">https://github.com/itw-creative-works/ultimate-jekyll/</a> and click **Use this template** or just <a href="https://github.com/iwiedenm/ultimate-jekyll/generate" target="{{ site.escapes.underscore }}blank">generate it here</a>.
2. In the next window, name the new repository and choose an organization to host the repository.
3. Create a branch called `master`, then make `master` the default branch, and finally delete the branch called `template`.
4. Open the newly created repository on GitHub and click **Open in Desktop** then choose location using GitHub desktop.
5. In the repo's settings add a secret called `ACCESS_TOKEN` and paste a GitHub token that has write permissions for this repo.
6. Open Terminal and do the following commands:
    * `git remote add upstream https://github.com/itw-creative-works/ultimate-jekyll.git`.
    * `git remote set-url --push upstream no_push`.
    * `git fetch upstream template`.
    * If prompted, enter *username* and *password*/*GitHub access token*.
    * `git merge upstream/template --allow-unrelated-histories`.
    * Type `:quit` then press `enter`.
7. Go back into GitHub desktop on the new repo and press **Push** in top bar.
8. Initialize the new repo by entering these commands in Terminal:
    * `npm run install:pre`
    * `npm install`
    * `npm start`

# Get changes from the ultimate-jekyll template
1. Open GitHub Desktop and select the project (not ultimate-jekyll, the project requiring an update from it).
2. Change current branch to `template`.
3. Then press **Fetch upstream**.
4. Then **Pull upstream**.
5. Change current branch to `master`.
6. Click **Choose branch to merge into `master`** from the branch dropdown (at the bottom).
7. Select `template` from the list.
8. Click the blue **Merge `template` into `master`** button.
9. Press **Push origin** in the top right.

# Things to regularly update on ultimate-jekyll
* ./special/master/misc/master-service-worker.js = instances of Firebase SDKs being loaded

# Things to regularly update on web-manager
* Dependencies in package.json

# Reference
* https://medium.com/sweetmeat/how-to-keep-a-downstream-git-repository-current-with-upstream-repository-changes-10b76fad6d97
* https://medium.com/@smrgrace/having-a-git-repo-that-is-a-template-for-new-projects-148079b7f178
