import execa from 'execa';
import fs from 'fs';
import osTmpdir from 'os-tmpdir';
import path from 'path';
import repoInfo from '.';
import test from 'ava';

const fixtureDir = path.join(__dirname, 'fixtures', 'lpad');

test.beforeEach(async () => {
  await execa('git', ['checkout', 'master'], { cwd: fixtureDir });
  await execa('git', ['clean', '-dxf'], { cwd: fixtureDir });

  try {
    await execa('git', ['branch', '-d', 'foo'], { cwd: fixtureDir });
  } catch (error) {}
});

test.serial('with clean working directory', t => {
  const info = repoInfo(fixtureDir);

  t.deepEqual(info, {
    currentBranch: 'master',
    isClean: true,
    githubOwner: 'sindresorhus',
    githubName: 'lpad'
  });
});

test.serial('with unclean working directory', t => {
  const extraFilePath = path.join(fixtureDir, 'hi');
  fs.writeFileSync(extraFilePath, 'extra');

  const info = repoInfo(fixtureDir);

  t.deepEqual(info, {
    currentBranch: 'master',
    isClean: false,
    githubOwner: 'sindresorhus',
    githubName: 'lpad'
  });

  fs.unlinkSync(extraFilePath);
});

test.serial('when on a different branch', async t => {
  await execa('git', ['checkout', '-b', 'foo'], { cwd: fixtureDir });

  const info = repoInfo(fixtureDir);

  t.deepEqual(info, {
    currentBranch: 'foo',
    isClean: true,
    githubOwner: 'sindresorhus',
    githubName: 'lpad'
  });
});
