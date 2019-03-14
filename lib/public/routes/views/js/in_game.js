let socket
let username

const emits = async () => {
  let data = {username: username, socket: socket}
  await socket.io.emit('newUser', data)
}

const setup = async () => {
  await socket.on('refreshUserlist', (_list) => {
    console.dir(_list)
    let list = _list.list

    $('.userlist').html('')
    for(let i in list) {
      $('.userlist').append('<p>' + list[i].username + '</p>')
    }
  })
  await emits()
}

function setUsername (_username) {
  username = _username
  socket = io()
  
  setup()
}