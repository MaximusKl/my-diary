const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
	const candidate = await User.findOne({ email: req.body.email })

	if (candidate) {
		// Пользователь существует - проверим пароль
		const isPasswordSame = bcrypt.compareSync(req.body.password, candidate.password)
		if (isPasswordSame) {
			// генерация токена
			const token = jwt.sign(
				{
					email: candidate.email,
					userId: candidate._id,
				},
				keys.jwt,
				{
					expiresIn: 60 * 60 * 24,
				}
			)

			res.status(200).json({
				token, //: `Bearer ${token}`,
			})
		} else {
			res.status(401).json({
				message: 'wrong login data',
			})
		}
	} else {
		// Пользователь не существует
		res.status(404).json({
			message: 'user not found',
		})
	}
}

// module.exports.register = async function (req, res) {
// 	const candidate = await User.findOne({ email: req.body.email })
//
// 	if (candidate) {
// 		// Пользователь существует
// 		res.status(409).json({
// 			message: 'email already exists',
// 		})
// 	} else {
// 		// Нужно создать пользователя
// 		const salt = bcrypt.genSaltSync(10)
// 		const password = req.body.password
//
// 		const user = new User({
// 			email: req.body.email,
// 			password: bcrypt.hashSync(password, salt),
// 		})
//
// 		try {
// 			// await user.save()
// 			await User.create(user)
// 			console.log('User created')
// 			res.status(201).json(user)
// 		} catch (e) {
// 			// обработать ошибку
// 			errorHandler(res, e)
// 		}
// 	}
// }
