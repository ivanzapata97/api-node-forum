'use strict'

var secret = "clave-secreta-para-generar-el-token-9999"
var jwt = require('jwt-simple')
var moment = require('moment')

exports.authenticated = function(req, res, next){
    //comprobar si llega autorizacion
    if(!req.headers.authorization){
        return res.status(403).send({
            message:'La petición no tiene la cabecera de autorización'
        })
    }
    //limpiar el token y quitar comillas 
    var token = req.headers.authorization.replace(/['"]+/g,'')

    //decodificar token
    try{
        var payload = jwt.decode(token, secret)
        //comprobar si el token ha experida
        if(payload.exp <= moment().unix()){
            return res.status(403).send({
                message:'El token ha expirado'
            })
        }
    } catch(err){
        return res.status(403).send({
            message:'El token no es válido'
        })
    }


    //adjuntar usuario identificado a request
    req.user = payload
    //pasar a la accion
    next();
}