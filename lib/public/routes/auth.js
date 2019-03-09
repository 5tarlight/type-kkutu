const KLog = require('../../klog')
const mysql = require('mysql')
const dbsettings = require('../../sub/settings.json').db
const session = require('./session')

module.exports.join = (req, res) => {
  let username = session.getUsername(req, res)
  KLog.info( username.username + ' : auth')
  
  let context = {}

  if(username.ip) {
    context = { username: false }
  } else {
    context = { username: username.username }
  }

  res.app.render('auth', context, (err, html) => {
    if (err) {
      KLog.error(err.stack)
      return
    }

    res.end(html)
  })
}

module.exports.auth = (req, res) => {
  let username = req.body.username
  let password = req.body.password

  if(username == undefined || username == null || password == undefined || password == null) {
    res.redirect('/auth')
  }

  let conn = mysql.createConnection(dbsettings)
  conn.connect()
  conn.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, password], (err, results, fields) => {
    if(err) {
      KLog.err(err.stack)
      res.redirect('/')
      return
    }

    KLog.info(req.session.username + ' : new user')
    res.redirect('/login')
  })
}