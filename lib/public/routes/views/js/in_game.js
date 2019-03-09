let socket
let username

function setUsername(_username) {
  username = _username
  socket = io()
  
  setup()
}

function setup() {
  socket.on('refreshUserlist', _list => {
    let list = _list.list
    console.dir(list)

    $('#userlist').html('')
    for(let i in list) {
      $('#userlist').append('<p>' + list[i].username + '</p>')
    }
  })

  emits()
}

function emits() {
  let data = {username: username, socket: socket}
  socket.io.emit('newUser', data)
}
