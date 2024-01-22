const core = require('@actions/core')
const utils = require('../utils.js')

// Required data
const title = core.getInput('title')
const programmingLanguageNames = utils.programmingLanguages.getNames()

// Check if the pull request title is valid
const regex = new RegExp(`#[0-9][0-9] - (${programmingLanguageNames.join('|')})`)
const isValidTitle = (title.match(regex)?.length ?? 0) > 0

if (!isValidTitle)
	// On invalid pull request title, set the action as failed
	core.setFailed(
		'Invalid pull request title. Should follow this format: #<CHALLENGE NUMBER> - <LANGUAGE NAME>. For example: #01 - JavaScript '
	)
