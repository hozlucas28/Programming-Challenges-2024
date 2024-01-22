const core = require('@actions/core')

// Required data
const changedFiles = core.getInput('changed-files').split(' ')
core.info(`changedFiles: ${changedFiles}\ntype: ${typeof changedFiles}`)

// if (changedFiles !== 1)
// On invalid pull request changed files, set the action as failed
// core.setFailed('Pull request must change exactly one file')

core.setOutput('changed-file', changedFiles[0])
