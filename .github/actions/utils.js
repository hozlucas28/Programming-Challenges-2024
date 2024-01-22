const fs = require('node:fs')
const path = require('node:path')

const roadmapPath = path.resolve('../../Roadmap')
const excludeExtensions = ['.md', '.json']

// Helpers
/**
 * Converts an array of strings to a string with specified separators.
 * @param {Object} options - The options object.
 * @param {string[]} options.array - The array of strings to convert.
 * @param {string} options.finalSeparator - The separator to use before the last element.
 * @param {string} options.separator - The separator to use between elements.
 * @returns {string} The converted string.
 */
function arraytoString({ array, finalSeparator, separator }) {
	const lastElementI = array.length - 1

	const stringifiedArray = array.reduce((prev, current, index) => {
		const currentFmt = `"${current}"`

		if (index === 0) return currentFmt
		if (index === lastElementI) return prev + finalSeparator + currentFmt
		return prev + separator + currentFmt
	}, array[0])

	return stringifiedArray
}

// Challenges data
function getChallengeFolders() {
	const roadmapContent = fs.readdirSync(roadmapPath, { encoding: 'utf-8', withFileTypes: true })
	const challengeFolders = roadmapContent.filter((dirent) => dirent.isDirectory())
	return challengeFolders.map((folder) => folder.name)
}

function getChallengeNumbers() {
	const challengeFolders = getChallengeFolders()
	const challengeNumbers = challengeFolders.map((folder) => folder.slice(0, 2))
	return challengeNumbers
}

// Programming languages data
function getProgrammingLanguageExtensions() {
	const roadmapContentDeep = fs.readdirSync(roadmapPath, { recursive: true, withFileTypes: true })
	const files = roadmapContentDeep.filter((file) => file.isFile())
	const fileExtensions = files.map((file) => path.extname(file.name))
	const fileExtensionsFiltered = fileExtensions.filter((extension) => !excludeExtensions.includes(extension))
	return [...new Set(fileExtensionsFiltered).values()]
}

function getProgrammingLanguageFolderNames() {
	const challengesFolders = getChallengeFolders()
	const foldersToSeek = challengesFolders.map((folder) => path.resolve(`${roadmapPath}/${folder}`))
	const foldersContent = foldersToSeek.map((folder) => fs.readdirSync(folder)).flat()
	const folderNames = foldersContent.filter((folder) => path.extname(folder) === '')
	return [...new Set(folderNames).values()]
}

module.exports = {
	arraytoString,
	getChallengeFolders,
	getChallengeNumbers,
	getProgrammingLanguageFolderNames,
	getProgrammingLanguageExtensions,
}
