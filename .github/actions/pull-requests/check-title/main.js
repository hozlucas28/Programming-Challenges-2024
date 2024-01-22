const core = require('@actions/core')
const utils = require('../../utils.js')
const process = require('node:process')

// Inputs
const title = core.getInput('title')
core.debug(`'title' (input): ${title}`)

// Required data
const challenges = utils.challenges.getNumbers()
const languageNames = utils.programmingLanguages.getNames()
core.debug(`Available challenge numbers: ${challenges}`)
core.debug(`Available names of programming languages: ${languageNames}`)

const challengesJoined = challenges.join('|')
const languageNamesJoined = languageNames.join('|')

// Regular expressions
const challengeNumberRegex = new RegExp(`#(${challengesJoined})`)
const programmingLanguageNameRegex = new RegExp(`(${languageNamesJoined})+$`)
core.debug(`Challenge number regular expression: ${challengeNumberRegex}`)
core.debug(`Programming language name regular expression: ${programmingLanguageNameRegex}`)

// Check if challenge number is valid
const isValidChallengeNumber = challengeNumberRegex.test(title)
core.debug(`Is valid challenge number? ${isValidChallengeNumber}`)

if (!isValidChallengeNumber) {
	const availableChallengeNumbers = utils.formatArraytoString({
		array: challenges,
		finalSeparator: ', or ',
		separator: ', ',
	})

	core.setFailed(
		"Challenge number of the pull request title doesn't match with existing ones. " +
			'Please check the challenge number of the pull request title. ' +
			`It should be one of these: ${availableChallengeNumbers}. ` +
			'If you think this is an error, please contact an administrator.'
	)
}

// Check if programming language name is valid
const isValidProgrammingLanguageName = programmingLanguageNameRegex.test(title)
core.debug(`Is valid programming language name? ${isValidProgrammingLanguageName}`)

if (!isValidProgrammingLanguageName) {
	const availableProgrammingLanguageNames = utils.formatArraytoString({
		array: languageNames,
		finalSeparator: ', or ',
		separator: ', ',
	})

	core.setFailed(
		"Programming language name of the pull request title doesn't match with existing ones. " +
			'Please check the programming language name of the pull request title. ' +
			`It should be one of these: ${availableProgrammingLanguageNames}. ` +
			'If you think this is an error, please contact an administrator.'
	)
}

if (isValidChallengeNumber && isValidProgrammingLanguageName) {
	const titleFormatRegex = new RegExp(`#(${challengesJoined}) - (${languageNamesJoined})`)
	core.debug(`Title format regular expression: ${titleFormatRegex}`)

	const matches = title.match(titleFormatRegex)
	const isValidTitleFormat = matches && matches.length > 0
	core.debug(`Is valid title format? ${isValidTitleFormat}`)

	if (!isValidTitleFormat) {
		// On invalid title, set the action as failed
		core.setFailed(
			'Invalid pull request title format. ' +
				'It should be: "#<CHALLENGE NUMBER> - <LANGUAGE NAME>". ' +
				'For example: "#01 - JavaScript".'
		)
	}
}
