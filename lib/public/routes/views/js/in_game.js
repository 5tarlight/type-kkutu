let socket
let username

function setUsername (_username) {
  username = _username
  socket = io()
}