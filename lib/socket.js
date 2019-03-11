const KLog = require('./klog')
let io

module.exports.init = (server) => {
  io = require('socket.io')(server)

  io.connected = {}

  io.on('connection', (socket) => {
    io.connected[socket.id] = socket

    socket.on('newUser', (data) => {
      io.connected[data.socket.id] = data

      io.emit('refreshUserlist', {list: io.connected})
    })

    socket.on('disconnect', () => {
      delete io.connected[socket.id]
      KLog.info(socket.id + " : disconnect")
    })
  })

  KLog.success('socket done')
}