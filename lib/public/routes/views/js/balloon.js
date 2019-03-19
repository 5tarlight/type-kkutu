$(() => {
  let balloon = $('<div class="balloon"></div>').appendTo('body')

  function updateBalloonPosition(x, y) {
    balloon.css({
        left: x + 15,
        top: y
      })
  }

  let text
  let element

  $('.showBalloon').hover(() => {
    element = $('.showBalloon')
    text = element.attr('title')
    element.attr('title', '')

    element.mousemove((event) => {
      updateBalloonPosition(event.pageX, event.pageY)
    })

    balloon.text(text)
    updateBalloonPosition(event.pageX, event.pageY)
    balloon.show()
  }, () => {
    element = $('.showBalloon')
    element.attr('title', text)
    balloon.hide()
  })
})