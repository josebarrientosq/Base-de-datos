const Router = require('express').Router();
var path = require('path')
const Evento = require('./modeloevento.js')
const Usuario = require('./modelousuario.js')

var viewsPath = path.join(__dirname, '../') + 'client/'
const session = require('express-session')

Router.get('/crearusuarios', function(req, res) {

    let user1 = new Usuario({
        
        id: '1',
        correo: 'jose@gmail.com',
        nombre: 'jose',
        password: '1234',
        fechanac: '2000-10-12',
      
    })
    let user2 = new Usuario({
        id: '2',
        correo: 'pepe@gmail.com',
        nombre: 'pepe',
        password: '1234',
        fechanac: '2000-10-12',



    })

    
    user1.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("usuario 1 guardado")
    })

    user2.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("usuario 2 guardado")
    })
})

//login
Router.post('/login', function(req, res) {
     
    Usuario.findOne({'correo' : req.body.user}     , function(err, docs) { 
        console.log("err "+err+"docs  "+ docs)
        //if (err) {
        //    res.status(500)
           // res.json(err)
        //}
        if(docs==null){
            res.send("no hay usuario")
        }else if(docs.password== req.body.pass){

            req.session.docs = docs;  //sesion
            console.log(req.session.docs)
            res.send("Validado")
        }
            
            else
                res.send("password incorrecto")
    })
    
})


//Obtener todos los eventos
Router.get('/all', function(req, res) {
    Evento.find().select({ "id": 1,"title": 1,"start": 1, "_id": 0}).exec(function(err, docs) { //IMPORTANTE seleccionar solo id y desactivar _id (generado por mongodb) para evitar ambiguedades
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})

Router.post('/new', function(req, res) {

    let event = new Evento({
        id: req.body.id,
        title: req.body.title,
        start: req.body.start,
      
    })

   
    event.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro guardado")
    })
})

// Eliminar un evento por su id
//Router.get('/delete', function(req, res) {
    Router.post('/delete', function(req, res) {
    
    //let uid = req.params.id
    let uid = req.body.id
    console.log(uid)
    Evento.remove({id: uid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }else
        res.send("Registro eliminado")
    })
})

Router.post('/update', function(req, res) {
    
    //let uid = req.params.id
    let uid = req.body.id
    console.log(uid+"  "+req.body.start )
    
    
    Evento.update({id: uid}, {start : req.body.start } , function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }else
        res.send("Registro actualizado")
    })
    
})




Router.all('*', function(req, res) {
  res.send('No se encontro el recurso solicitado no se ruteo')
  res.end()
})

module.exports = Router
