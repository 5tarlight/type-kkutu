const KLog = require('../../klog')
const mysql = require('mysql')
const dbsettings = require('../../sub/settings.json').db
const session = require('./session')

module.exports.join = (req, res) => {
  let username = session.getUsername(req, res)
  KLog.info(username + ' : login')

  res.app.render('login', {}, (err, html) => {
    if (err) {
      KLog.error(err.stack)
      return
    }

    res.end(html)
  })
}

module.exports.login = (req, res) => {
  let username = req.body.username
  let password = req.body.password

  if (username == undefined || username == null || password == undefined || password == null) {
    res.redirect('/login')
  }

  let conn = mysql.createConnection(dbsettings)
  conn.connect()
  conn.query('SELECT * FROM user WHERE username=? AND password=?', [username, password], (err, results, fields) => {
    if(err) {
      KLog.err(err.stack)
      res.redirect('/')
      return
    }
    
    if(results.length < 1) {
      KLog.info(session.getUsername(req, res) + ' : login fail')
      res.redirect('/login')
      return
    }

    req.session.username = results[0]['username']
    KLog.info(session.getUsername(req, res) + ' : login success')
    res.redirect('/')
  })
}