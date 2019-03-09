const KLog = require('./klog')
let io

module.exports.init = (server) => {
  io = require('socket.io')(server)

  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      KLog.info(socket.id + " : disconnect")
    })
  })

  KLog.success('socket done')
}