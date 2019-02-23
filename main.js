const express = require('express')
const http = require('http')

const app = express()

app.set('port', 80)

http.createServer(app).listen(app.get('port'), () => {
  console.log('Serer On!')
})