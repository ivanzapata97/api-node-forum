'use strict'

var express = require('express')
var UserController = require('../controllers/user')


var router = express.Router()
var md_auth = require('../middlerwares/authenticated')

//rutas de prueba
router.get('/probando', UserController.probando)
router.post('/testeando', UserController.testeando)

//rutas de usuario
router.post('/register',UserController.save)
router.post('/login', UserController.login)
router.put('/update', md_auth.authenticated ,UserController.update)

module.exports = router