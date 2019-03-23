$(() => {
  const socket = io()

  socket.on('portal_usercount', (data) => {
    $('.progress-bar').attr('aria-valuenow', data.usercount)
      .css('width', data.usercount * 10 + '%')
      .text(data.usercount + ' 명')

    if($('.progress-bar').width() < 15) {
      $('.progress-bar').css('color', 'black')
    } else {
      $('.progress-bar').css('color', 'white')
    }
  })

  socket.emit('request_usercount', {})

  setInterval(() => {
    socket.emit('request_usercount', {})
  }, 1000)
})