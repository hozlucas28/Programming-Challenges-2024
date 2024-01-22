const data = require('./data.json')
const stats = require('../../Roadmap/stats.json')

// Languages
function getLanguagesExtensions() {
	return data.languages.map(({ fileExtension }) => fileExtension)
}

function getLanguagesFoldersNames() {
	return data.languages.map(({ folderName }) => folderName)
}

function getLanguagesNames() {
	return data.languages.map(({ name }) => name)
}

// Challenges
function getChallengesFoldersNames() {
	return stats.challenges_ranking.map(({ name }) => name)
}

module.exports = {
	getLanguagesExtensions,
	getLanguagesFoldersNames,
	getLanguagesNames,
	getChallengesFoldersNames,
}
