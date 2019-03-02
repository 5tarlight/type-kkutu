$(() => {
  $('.glyphicon-search').on('click', (e) => {
    window.location.href = '/search?q=' + $('.searchInput').val()
  })
})