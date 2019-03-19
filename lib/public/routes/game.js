const KLog = require('korean-logger')
const session = require('./session')

module.exports.join = (req, res) => {
  let username = session.getUsername(req, res)  
  let context = {}

  if(username.ip) {
    context = { username: false }
  } else {
    context = { username: username.username }
  }

  res.app.render('game', context, (err, html) => {
    if (err) {
      KLog.error(err.stack)
      return
    }

    res.end(html)
  })
}