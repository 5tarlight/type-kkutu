let socket
let username

function setUsername (_username) {
  username = _username
  socket = io()

  socket.on('refreshList', (data) => {
    const list = data.list
    const userlist = $('.userlist')

    userlist.html('')
    userlist.append('<div class="usercount"></div>')
    let i, count = 0
    for(i = 0; i < list.length; ++i) {
      if(!list[i]) continue
      if(!list[i].username) continue

      userlist.append(`<div class='username'>${list[i].username}</div>`)
      count++
      $('.usercount').html(`<div>접속자수: ${count}명</div>`)
      console.dir(count)
    }

    
  })

  socket.emit('newUser', {
    username: _username
  })
}