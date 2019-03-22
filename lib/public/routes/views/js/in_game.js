let socket
let username

function setUsername (_username) {
  username = _username
  socket = io()

  _socket()
  chat()
  dialog()
}

function msg() {
  let val = $('.inchat').val()
  $('.inchat').val('')

  socket.emit('chat', {
    username: username,
    chat: val
  })
}

function _socket() {
  socket.on('newChat', (data) => {
    let chat = data.chat

    if(chat.trim().length == 0) return
    else if (!chat) return

    $('.oldchat').append('<div class="chatmessage">' + data.username + ' ' + chat + '</div>')
    $(".oldchat").scrollTop($(".oldchat")[0].scrollHeight);
  })

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
    }
  })

  socket.on('same', (data) => {
    console.log('다중접속')
    alert('해당 계정은 이미 접속중입니다.')
    window.location.href = '/process/logout'
  })

  socket.emit('newUser', {
    username: username
  })
}

function chat() {
  $(document).keydown(function(event) {
    if (event.keyCode == '13') {
      msg()
    }
  });

  $('.submit').on('click', (event) => {
    msg()
  })
}

function dialog() {
  $('.dialog-close').on('click', (event) => {
    $('.dialog').hide()
  })

  $('#createRoom').on('click', (event) => {
    $('.dialog').show()
    createRoom()
  })

  $('#shortEnter').on('click', (event) => {
    $('.dialog').show()
  })

  $('#shop').on('click', (event) => {
    $('.dialog').show()
  })

  $('#dict').on('click', (event) => {
    $('.dialog').show()
  })
  
  $('#replay').on('click', (event) => {
    $('.dialog').show()
  })

  $('#ranking').on('click', (event) => {
    $('.dialog').show()
  })
}

function createRoom() {
  $('.dialog-content').html(`
  <input type='text' placeholder='방 이름'>
  <input type='password' placeholder='비밀번호'>
  <input type='text' placeholder='인원'>

  <div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
      게임 유형 
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu">
      <li><a href="#">한국어 끝말잇기</a></li>
      <li><a href="#">한국어 쿵쿵따</a></li>
      <li><a href="#">한국어 앞말잇기</a></li>
      <li><a href="#">한국어 타자대결</a></li>
      <li><a href="#">한국어 단어대결</a></li>
      <li><a href="#">한국어 십자말풀이</a></li>
      <li><a href="#">한국어 솎솎</a></li>
      <li><a href="#">자음퀴즈</a></li>
      <li><a href="#">훈민정음</a></li>

      <li class="divider"></li>

      <li><a href="#">영어 끝말잇기</a></li>
      <li><a href="#">영어 끄투</a></li>
      <li><a href="#">영어 타자대결</a></li>
      <li><a href="#">영어 단어대결</a></li>
      <li><a href="#">영어 솎솎</a></li>
    </ul>
  </div>

  <input type='text' placeholder='라운드 수'>
  <input type='text' placeholder='라운드 시간'>
  `)
}

function shortEnter() {

}

function shop() {

}

function dict() {

}

function replay() {

}

function ranking() {

}