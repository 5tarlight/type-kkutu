const KLog = require('../../klog')
const mysql = require('mysql')
const dbsettings = require('../../sub/settings.json').db

module.exports.join = (req, res) => {
  KLog.info(req.ip + ' : auth')

  res.app.render('auth', {}, (err, html) => {
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
    }

    KLog.info(req.ip + ' : new user')
    res.redirect('/')
  })
}