'use strict'

var mongoose = require('mongoose')
var app = require('./app')
var port = process.env.PORT || 3999


mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/api_rest_node',{ useNewUrlParser: true })
    .then( () => {
        console.log('La conexion a la base de datos de mongo se ha realizado correctamente')

        //crear el servidor
        app.listen(port, () =>  {
            console.log('el servidor eeta corriendo perfecto localhost 3999 ')
        })
    }).catch ( err => console.log(err) )