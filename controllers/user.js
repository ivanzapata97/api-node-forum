'use strict'

var validator = require('validator')
var jwt = require('../services/jwt')
var bcrypt = require('bcrypt-nodejs')
var User = require('../models/user')

var controller = {
    probando: function(req, res) {
        return res.status(200).send({
            message: 'Soy el metodo probando'
        })
    },

    testeando: function(req, res) {
        return res.status(200).send({
            message: 'Soy el metodo testeando'
        })
    },

    save: function(req, res){
        //recoger los parametros de la petición
        var params = req.body

        //validar los datos
        var validate_name = !validator.isEmpty(params.name)
        var validate_surname = !validator.isEmpty(params.surname)
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email)
        var validate_password = !validator.isEmpty(params.password)

        if (validate_name && validate_surname && validate_email && validate_password){
            //crear objeto de usuario
            var user = new User()

            //asignar valores al usuario
            user.name = params.name
            user.surname = params.surname
            user.email = params.email.toLowerCase()
            user.role = 'ROLE_USER'
            user.image = null

            //comprobar si el usuario existe
            User.findOne({email:user.email}, (err, issetUser) => {
                if(err){
                    return res.status(500).send({
                        message:'Error al comprobar duplicidad de usuario'
                    })
                }
                if(!issetUser){
                    //si no existe, cifrar la constraseña
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash

                        //guardar usuario
                        user.save((err, userStored) => {
                            if(err){
                                return res.status(200).send({
                                    message:'Error al guardar el usuario'
                                })
                            }
                            if(!userStored){
                                return res.status(200).send({
                                    message:'El usuario no se ha guardado'
                                })
                            } else {
                                return res.status(200).send({
                                    status:'success',
                                    user: userStored
                                })
                            }
                        })
                    })   
                } else {
                    return res.status(200).send({
                        message:'El usuario ya esta registrado'
                    })
                }
            })
           
        } else {
            return res.status(200).send({
                message: 'validación de los datos del usuario incorrecta, intentalo de nuevo'
            })
        }
    },

    login: function(req, res){
        //recoger los parametros de la peticion
        var params = req.body
        
        //validar los datos 
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email)
        var validate_password = !validator.isEmpty(params.password)

        if(!validate_email || !validate_password){
            return res.status(200).send({
                message: 'Los datos son incorrectos'
            }) 
        }
        User.findOne({email: params.email.toLowerCase()}, (err, user) => {
            if(err){
                return res.status(500).send({
                    message: 'Error al intentar identificarse'
                }) 
            }

            if(!user){
                return res.status(404).send({
                    message: 'El usuario no existe'
                }) 
            } 

            //si existe, comprobar password 
            bcrypt.compare(params.password, user.password, (err, check) => {
                if(check){
                    //generar token JWT y devolverlo
                    if(params.gettoken){
                        res.status(200).send({
                            token: jwt.createToken(user)
                        })
                    } else {
                        //Limpiar el objeto
                        user.password = undefined

                        //Si las credenciales son correctas, devolvemos los datos 
                        res.status(200).send({
                            status:'success',
                            user
                        })  
                    }
                    
                } else {
                    return res.status(200).send({
                        message: 'Las credenciales no son correctas'
                    })
                }
               
            })
        })
        
    }
}

module.exports = controller