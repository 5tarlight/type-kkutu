const KLog = require('korean-logger')
let io
let connected = []
let room = {
  index: 100,
  rooms: []
}

module.exports.init = (server) => {
  io = require('socket.io').listen(server)

  io.on('connection', (socket) => {
    KLog.info(socket.id + " : connect")
    
    socket.on('request_usercount', (data) => {
      socket.emit('portal_usercount', {usercount: connected.length})
    })

    socket.on('newUser', (data) => {
      for(let i in connected) {
        if(data.username === connected[i].username) {
          socket.emit('same', {})
          KLog.warn(data.username + " : overload")
          return
        }
      }

      connected.push({username: data.username, id: socket.id, room: 'lobby'})
      socket.join(getSocketById(socket.id).room)
      KLog.info(socket.id + " : " + getSocketById(socket.id).room)
      io.sockets.emit('refreshList', {list: connected})
    })

    socket.on('chat', (data) => {
      io.to(getSocketById(socket.id).room).emit('newChat', {username: `[${data.username}]`, chat: `${data.chat}`})
    })

    socket.on('disconnect', () => {
      for(let i in connected) {
        if(connected[i].id == socket.id) {
          connected.splice(i, 1)
          break
        }
      }
      socket.broadcast.emit('refreshList', {list: connected})
      KLog.info(socket.id + " : disconnect")
    })
    
    socket.on('createRoom', (data) => {
      socket.join(room.index)

      room.rooms.push({
        id: room.index,
        name: data.name,
        password: data.password,
        isSecret: data.isSecret,
        userLimit: data.userLimit,
        gameType: data.gameType,
        roundLimit: data.roundLimit,
        roundTime: data.roundTime,
        users: []
      })

      console.dir(room)
      getRoomById(room.index).users.push(socket.id)
      socket.join(room.index)
      room.index++

      io.to('lobby').emit('refreshRoomlist', room)
    })
  })

  KLog.success('socket.io ready')
}

function getSocketById(id) {
  for(let i in connected) {
    if(connected[i].id == id) {
      return connected[i]
    }
  }
}

function getRoomById(id) {
  for(let i in room.rooms) {
    if(room.rooms.id == id) {
      return room.rooms[i]
    }
  }
}