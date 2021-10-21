const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
	user: {
		ref: 'users',
		type: Schema.Types.ObjectId,
		required: true,
	},
	aType: {
		ref: 'record-types',
		type: Schema.Types.ObjectId,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	tags: {
		type: [String],
		// required: true,
	},
	created: {
		type: Date,
		required: true,
		default: Date.now,
	},
	modified: {
		type: Date,
		required: true,
	},
})

module.exports = mongoose.model('records', recordSchema)
