const express = require('express')
const passport = require('passport')
const controller = require('../controllers/record')

const router = express.Router()

router.get('/count', passport.authenticate('jwt', { session: false }), controller.getCount)
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router
