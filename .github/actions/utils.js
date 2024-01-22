const data = require('./data.json')
const stats = require('../../Roadmap/stats.json')

const challenges = {
	getFolderNames: () => stats.challenges_ranking.map(({ name }) => name),
}

const programmingLanguages = {
	getExtensionNames: () => data.languages.map(({ fileExtensionName }) => fileExtensionName),
	getFolderNames: () => data.languages.map(({ folderName }) => folderName),
	getNames: () => data.languages.map(({ names }) => names).flat(),
}

module.exports = {
	challenges,
	programmingLanguages,
}
