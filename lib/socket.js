const KLog = require('korean-logger')
let io

module.exports.init = (server) => {
  io = require('socket.io').listen(server)

  io.connected = []

  io.on('connection', (socket) => {
    KLog.info(socket.id + " : connect")
    
    socket.on('request_usercount', (data) => {
      socket.emit('portal_usercount', {usercount: io.connected.length})
    })

    socket.on('newUser', (data) => {
      for(let i in io.connected) {
        if(data.username === io.connected[i].username) {
          socket.emit('same', {})
          KLog.warn(data.username + " : overload")
          return
        }
      }

      io.connected.push({username: data.username, id: socket.id})
      io.sockets.emit('refreshList', {list: io.connected})
    })

    socket.on('chat', (data) => {
      io.sockets.emit('newChat', {username: `[${data.username}]`, chat: `${data.chat}`})
    })

    socket.on('disconnect', () => {
      for(let i in io.connected) {
        if(io.connected[i].id == socket.id) {
          io.connected.splice(i, 1)
          break
        }
      }
      socket.broadcast.emit('refreshList', {list: io.connected})
      KLog.info(socket.id + " : disconnect")
    })
  })

  KLog.success('socket.io ready')
}