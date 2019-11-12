const core = require('@actions/core');
const io = require('@actions/io');
const toolcache = require('@actions/tool-cache');
const path = require('path');
const fs = require('fs');
const https = require('https');
const unzipper = require('unzipper');

async function run() {
  try {
    if (process.platform !== 'win32') {
      core.setFailed("git-sdk-64-minimal needs to run on Windows");
      return;
    }

    const tmp = process.env['RUNNER_TEMP'];
    if (!tmp) {
      core.setFailed('environment variable RUNNER_TEMP is undefined');
      return;
    }
    // TODO: obtain this URL dynamically
    const url = 'https://dev.azure.com/Git-for-Windows/f3317b6a-fa67-40d4-9a33-b652e06943df/_apis/build/builds/45513/artifacts?artifactName=git-sdk-64-minimal&api-version=5.1&%24format=zip';
    //core.startGroup('Downloading git-sdk-64-mininal...');
    //const zip = await toolcache.downloadTool(url);
    //core.endGroup();

    const path = core.getInput('path');
    core.startGroup(`Unzipping git-sdk-64-minimal to ${path}...`);
    await io.mkdirP(path);
    https.get(url, res => {
      res.pipe(unzipper.Extract({path: path}))
      core.endGroup();
    });
    //fs.createReadStream(zip).pipe(unzipper.Extract({path: path}));
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()

