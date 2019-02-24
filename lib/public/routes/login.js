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