const KLog = require('korean-logger')
let io

module.exports.init = (server) => {
  io = require('socket.io')(server)

  io.connected = {}

  io.on('connection', (socket) => {
    io.connected[socket.id] = socket
    socket.on('disconnect', () => {
      delete io.connected[socket.id]
      KLog.info(socket.id + " : disconnect")
    })
  })

  KLog.success('socket.io has just been set')
}