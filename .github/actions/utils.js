const data = require('./data.json')
const stats = require('../../Roadmap/stats.json')

const challenges = {
	getNumbers: () => challenges.getChallengesProps().map(({ number }) => number),

	getChallengeProps: (challengeNumber) => {
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
}

function formatArraytoString({ array, finalSeparator, separator }) {
	const lastElementI = array.length - 1

	const stringifiedArray = array.reduce((prev, current, index) => {
		const currentFmt = `"${current}"`

		if (index === 0) return currentFmt
		if (index === lastElementI) return prev + finalSeparator + currentFmt
		return prev + separator + currentFmt
	}, array[0])

	return stringifiedArray
}

const programmingLanguages = {
	getExtensionNames: () => data.languages.map(({ fileExtension }) => fileExtension),
	getFolderNames: () => stats.languages_ranking.map(({ name }) => name),
	getNames: () => data.languages.map(({ name }) => name).flat(),

	getLanguageProps: (programmingLanguage) => {
		const language = data.languages.find(({ name }) => name === programmingLanguage)
		const folderName = stats.languages_ranking.find(
			({ name }) => name.toLowerCase() === programmingLanguage.toLowerCase()
		)?.name

		return {
			...language,
			folderName,
		}
	},
}

module.exports = {
	challenges,
	formatArraytoString,
	programmingLanguages,
}
