const core = require('@actions/core')
const utils = require('../../utils.js')

// Required data
const title = core.getInput('title')
const programmingLanguageNames = utils.programmingLanguages.getNames()

// Check if the title is valid
const regex = new RegExp(`#([0-9][0-9]) - (${programmingLanguageNames.join('|')})`)
const matches = title.match(regex)
const isValidTitle = matches && matches.length > 0

if (isValidTitle) {
	// On valid title, set the outputs
	core.setOutput('challenge-number', matches[1])
	core.setOutput('programming-language-name', matches[2])
} else {
	// On invalid title, set the action as failed
	core.setFailed(
		'Invalid pull request title. ' +
			'Should follow this format: #<CHALLENGE NUMBER> - <LANGUAGE NAME>. ' +
			'For example: #01 - JavaScript'
	)
}
