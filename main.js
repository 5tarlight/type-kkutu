const express = require('express')
const http = require('http')
const path = require('path')

const app = express()

app.set('port', 80)

app.use('/', express.static(path.join(__dirname, '/lib/public')))

http.createServer(app).listen(app.get('port'), () => {
  console.log('Serer On!')
})