'use strict'

var validator = require('validator')

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
            
        } else {
            return res.status(200).send({
                message: 'validación de los datos del usuario incorrecta, intentalo de nuevo'
            })
        }

        //crear objeto de usuario

        //asignar valores al usuario

        //comprobar si el usuario existe

        //si no existe, cifrar la constraseña

        //guardar usuario

        //devolver respuesta

        return res.status(200).send({
            message:'registro de usuarios'
        })
    }
}

module.exports = controller