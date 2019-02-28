$(() => {
  $('.submitBtn').prop('disabled', true)
  $('#error').hide()

  $('.passwordInput').on('blur', e => {
    if($('.usernameInput').val().trim().length < 5) {
      $('.submitBtn').prop('disabled', true)
      $('#text-zone').text('유저네임은 5글자 이상이여야 합니다.')
      $('#error').show()
    } else if($('.passwordInput').val().trim().length < 5) {
      $('.submitBtn').prop('disabled', true)
      $('#text-zone').text('비밀번호는 5글자 이상이여야 합니다.')
      $('#error').show()
    } else {
      $('#error').hide()
      $('.submitBtn').prop('disabled', false)
    }
  })
  $('.usernameInput').on('blur', e => {
    if($('.usernameInput').val().trim().length < 5) {
      $('.submitBtn').prop('disabled', true)
      $('#text-zone').text('유저네임은 5글자 이상이여야 합니다.')
      $('#error').show()
    } else if($('.passwordInput').val().trim().length < 5) {
      if($('.passwordInput').val().trim().length === 0) return
      $('.submitBtn').prop('disabled', true)
      $('#text-zone').text('비밀번호는 5글자 이상이여야 합니다.')
      $('#error').show()
    } else {
      $('#error').hide()
      $('.submitBtn').prop('disabled', false)
    }
  })
})
