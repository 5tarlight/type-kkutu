const express = require('express')
const http = require('http')
const path = require('path')
const parser = require('body-parser')

const app = express()

app.set('port', 80)

app.use('/', express.static(path.join(__dirname, '/lib/public')))
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

http.createServer(app).listen(app.get('port'), () => {
  console.log('Serer On!')
})