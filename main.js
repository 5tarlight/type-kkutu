const express = require('express')
const http = require('http')
const path = require('path')
const parser = require('body-parser')
const loader = require('./lib/public/routes/loader')
const klog = require('./lib/klog')
const settings = require('./lib/sub/settings.json')
const cors = require('cors')
const cookie = require('cookie-parser')
const session = require('express-session')

const app = express()

app.set('port', settings.port)
app.set('views', path.join(__dirname, '/lib/public/routes/views'))
app.set('view engine', 'pug')

app.use('/', express.static(path.join(__dirname, '/lib/public')))
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())
app.use(cors())
app.use(cookie())
app.use(session({
  resave: true,
  secret: '@#$%@#%^#@$!@$!$',
  saveUninitialized: false
}))

loader.init(app, express.Router())

const server = http.createServer(app)

server.listen(app.get('port'), () => {
  klog.alert('Serer On!')
})