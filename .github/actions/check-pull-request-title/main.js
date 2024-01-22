const core = require('@actions/core')
const utils = require('../utils.js')

// Required data
const pullrequestTitle = core.getInput('title')
const languagesNames = utils.getLanguagesNames()

// Check if the pull request title is valid
const regex = new RegExp(`#[0-9][0-9] - (${languagesNames.join('|')})`)
const isValidPullRequestTitle = (pullrequestTitle.match(regex)?.length ?? 0) > 0

if (!isValidPullRequestTitle)
	// On invalid pull request title, set the action as failed
	core.setFailed(
		'Invalid pull request title.\n' +
			'Should follow this format: #<CHALLENGE NUMBER> - <LANGUAGE NAME>\n' +
			'For example: #01 - JavaScript'
	)
