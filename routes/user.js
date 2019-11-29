'use strict'

var express = require('express')
var UserController = require('../controllers/user')

var router = express.Router()

//rutas de prueba
router.get('/probando', UserController.probando)
router.post('/testeando', UserController.testeando)

//rutas de usuario
router.post('/register',UserController.save)

module.exports = router