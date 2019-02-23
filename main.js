const express = require('express')
const http = require('http')
const path = require('path')
const parser = require('body-parser')
const loader = require('./lib/public/routes/loader')

const app = express()

app.set('port', 80)
app.set('views', path.join(__dirname, '/lib/public/routes/views'))
app.set('view engine', 'pug')

app.use('/', express.static(path.join(__dirname, '/lib/public')))
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

loader.init(app, express.Router())

http.createServer(app).listen(app.get('port'), () => {
  console.log('Serer On!')
})