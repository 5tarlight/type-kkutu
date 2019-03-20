const KLog = require('korean-logger')
let io

module.exports.init = (server) => {
  io = require('socket.io').listen(server)

  io.connected = []

  io.on('connection', (socket) => {
    KLog.info(socket.id + " : connect")
    
    socket.on('newUser', (data) => {
      io.connected.push({username: data.username, id: socket.id})
      io.sockets.emit('refreshList', {list: io.connected})
    })

    socket.on('disconnect', () => {
      for(let i in io.connected) {
        if(io.connected[i].id == socket.id) {
          delete io.connected[i]
          break
        }
      }
      socket.broadcast.emit('refreshList', {list: io.connected})
      KLog.info(socket.id + " : disconnect")
    })
  })

  KLog.success('socket.io ready')
}