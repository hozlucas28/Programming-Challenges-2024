const core = require('@actions/core')
const path = require('node:path')
const utils = require('../../utils.js')

// Required data
const author = core.getInput('author')
const challengeNumber = core.getInput('challenge-number')
const changedOrModifiedFile = core.getInput('changed-or-modified-file')
const programmingLanguageName = core.getInput('programming-language-name')

const changedOrModifiedFileProps = path.parse(changedOrModifiedFile)
const challengeProps = utils.challenges.getChallengeProps(challengeNumber)
const languageProps = utils.programmingLanguages.getLanguageProps(programmingLanguageName)

// By the required actions we know that the challenge and language exists
if (challengeProps && languageProps) {
	const { folderName: challengeFolderName } = challengeProps
	const { folderName: languageFolderName, fileExtensionName: languageExtensionName } = languageProps
	const expectedDirectory = path.join('Roadmap', challengeFolderName, languageFolderName)

	// Check if directory is valid
	const isValidDirectory = changedOrModifiedFileProps.dir === expectedDirectory
	if (!isValidDirectory) {
		core.setFailed(
			"Directory of the changed or modified file of the pull request doesn't match with the challenge and programming language of the pull request title. " +
				'Please check the directory of the changed or modified file of the pull request. ' +
				`It should be: ${expectedDirectory}` +
				'If you think this is an error, please contact an administrator.'
		)
	}

	// Check if file name is valid
	const isValidFileName = changedOrModifiedFileProps.name === author
	if (!isValidFileName) {
		core.setFailed(
			"File name of the changed or modified file of the pull request doesn't match with the author name. " +
				'Please check the file name of the changed or modified file of the pull request. ' +
				`It should be: ${author}` +
				'If you think this is an error, please contact an administrator.'
		)
	}

	// Check if file extension name is valid
	const isValidFileExtensionName = changedOrModifiedFileProps.ext === languageExtensionName
	if (!isValidFileExtensionName) {
		core.setFailed(
			"File extension name of the changed or modified file of the pull request doesn't match with the programming language of the pull request title. " +
				'Please check the file extension name of the changed or modified file of the pull request. ' +
				`It should be: ${languageExtensionName}` +
				'If you think this is an error, please contact an administrator.'
		)
	}
}
