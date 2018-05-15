const http = require('http')
      path = require('path')
      Routing = require('./rutas.js'),
      express = require('express')
      bodyParser = require('body-parser')
      mongoose = require('mongoose')
	  session = require('express-session');//SESION

const PORT = 8082
const app = express()

const Server = http.createServer(app)
mongoose.connect('mongodb://localhost/agendanode')

app.use(express.static(path.join(__dirname, '../client')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/', Routing)

app.use(session({secret: "Your secret key"})); //sesion



Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})



