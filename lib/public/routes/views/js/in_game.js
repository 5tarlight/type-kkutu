let socket
let username

function setUsername (_username) {
  username = _username
  socket = io()

  socket.on('refreshList', (data) => {
    const list = data.list
    const userlist = $('.userlist')
    
    userlist.html('')

    for(let i in list) {
      if(!list[i]) continue
      if(!list[i].username) continue

      userlist.append(`<div class='username'>${list[i].username}</div>`)
    }
  })

  socket.emit('newUser', {
    username: _username
  })
}