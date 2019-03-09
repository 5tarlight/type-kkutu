const KLog = require('./klog')
const io

module.exports.init = (server) => {
  io = require('socket.io')(server)

  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      KLog.info(socket.id + " : disconnect")
    })
  })
}