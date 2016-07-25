# repo-info [![Build Status](https://travis-ci.org/callumlocke/repo-info.svg?branch=master)](https://travis-ci.org/callumlocke/repo-info)

A function that returns some basic information about a local repo.

```js
var repoInfo = require('repo-info');

var info = repoInfo('/some/local/repo');
```

Synchronously returns an object like this:

```js
{
  currentBranch: 'master',
  isClean: true,
  githubOwner: 'sindresorhus',
  githubName: 'cat-names'
}
```

Properties:

- `isClean` – whether the working directory is clean (i.e. no changes and no untracked files).
- `currentBranch` – the name of the current branch.
- `githubOwner` – the GitHub user/org who owns the repo (or `null` if it's not a GitHub repo)
- `githubName` – the name of the repo on GitHub (or `null` if it's not a GitHub repo)

## Licence

MIT
