// Setup Express web server
const express = require("express")
//const bodyParser = require("body-parser")
const cors = require("cors")

const path = __dirname + '/app/views/'

const app = express()

app.use(express.static(path))

var corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

//parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require("./app/models")

db.sequelize.sync({})

app.get('/', function (req, res) {
  res.sendFile(path + "index.html")
})

/* simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to hideq application."})
})
*/

require("./app/routes/tutorial.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})