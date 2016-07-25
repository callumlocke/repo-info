var execa = require('execa');
var parseGitHubURL = require('parse-github-url');
var fs = require('fs');

module.exports = function repoInfo(repoPath) {
  if (!repoPath) throw new Error('repo-info: Must provide path to local repository');

  const gitStat = fs.statSync(repoPath);
  if (!gitStat.isDirectory(repoPath)) {
    throw new Error('repo-info: provided path is not a git respoitory');
  }

  var options = { cwd: repoPath };

  var currentBranch = execa.sync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], options).stdout;

  var isClean = execa.sync('git', ['status', '--porcelain'], options).stdout === '';

  var githubOwner = null;
  var githubName = null;

  var origin = execa.sync('git', ['remote', 'get-url', 'origin'], { cwd: repoPath }).stdout
  var parsedOrigin = parseGitHubURL(origin);

  if (parsedOrigin.host === 'github.com') {
    githubOwner = parsedOrigin.owner;
    githubName = parsedOrigin.name;
  }

  var info = {
    currentBranch: currentBranch,
    isClean: isClean,
    githubOwner: githubOwner,
    githubName: githubName
  };

  return info;
};
