const RecordType = require('../models/RecordType')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
	try {
		const recordTypes = await RecordType.find({})
		res.status(200).json(recordTypes)
	} catch (e) {
		errorHandler(res, e)
	}
}

// module.exports.create = async function (req, res) {
// 	try {
// 	} catch (e) {
// 		errorHandler(res, e)
// 	}
// }
//
// module.exports.update = async function (req, res) {
// 	try {
// 	} catch (e) {
// 		errorHandler(res, e)
// 	}
// }
//
// module.exports.remove = async function (req, res) {
// 	try {
// 	} catch (e) {
// 		errorHandler(res, e)
// 	}
// }
