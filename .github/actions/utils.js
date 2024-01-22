const data = require('./data.json')
const stats = require('../../Roadmap/stats.json')

const challenges = {
	getChallengeProps: (/** @type {string} */ challengeNumber) => {
		const challengesProps = challenges.getChallengesProps()
		return challengesProps.find(({ number }) => number === challengeNumber)
	},
	getChallengesProps: () =>
		stats.challenges_ranking.map(({ name }) => {
			const separatorIndex = name.indexOf('-')

			return {
				folderName: name.trim(),
				number: name.slice(0, separatorIndex).trim(),
				title: name.slice(separatorIndex + 1).trim(),
			}
		}),
	getNumbers: () => challenges.getChallengesProps().map(({ number }) => number),
}

const programmingLanguages = {
	getExtensionNames: () => data.languages.map(({ fileExtensionName }) => fileExtensionName),
	getFolderNames: () => data.languages.map(({ folderName }) => folderName),
	getLanguageProps: (/** @type {string} */ programmingLanguageName) => {
		const language = data.languages.find(({ names }) => names.includes(programmingLanguageName))
		return language
	},
	getNames: () => data.languages.map(({ names }) => names).flat(),
}

module.exports = {
	challenges,
	programmingLanguages,
}
