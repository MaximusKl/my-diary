const Record = require('../models/Record')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
	const query = {
		user: req.user.id,
	}

	// Дата старта
	if (req.query.start) {
		query.date = {
			// Больше или равно
			$gte: req.query.start,
		}
	}

	// Дата окончания
	if (req.query.end) {
		if (!query.date) {
			query.date = {}
		}

		query.date['$lte'] = req.query.end
	}

	try {
		const records = await Record.find(query)
			.sort({ created: -1 })
			.skip(+req.query.offset || 0)
			.limit(+req.query.limit || 10)

		res.status(200).json(records)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.getCount = async function (req, res) {
	try {
		const recordsCount = await Record.count()
		res.status(200).json(recordsCount)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.getById = async function (req, res) {
	try {
		const record = await Record.findById(req.params.id)
		res.status(200).json(record)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.create = async function (req, res) {
	const record = new Record({
		user: req.user.id,
		aType: req.body.aType,
		content: req.body.content,
		tags: req.body.tags,
		modified: Date.now(),
	})
	try {
		await record.save()
		res.status(201).json(record)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.update = async function (req, res) {
	const updated = {
		aType: req.body.aType,
		content: req.body.content,
		tags: req.body.tags,
		modified: Date.now(),
	}
	try {
		const record = await Record.findByIdAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true })
		res.status(200).json(record)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.remove = async function (req, res) {
	try {
		await Record.remove({ _id: req.params.id })
		res.status(200).json({ message: 'Record has been deleted' })
	} catch (e) {
		errorHandler(res, e)
	}
}
