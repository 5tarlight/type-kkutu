const KLog = require('../../klog')
const mysql = require('mysql')
const dbsettings = require('../../sub/settings.json').db
const session = require('./session')

module.exports.search = (req, res) => {
  let title = req.query.q
  let username = session.getUsername(req, res)

  let conn = mysql.createConnection(dbsettings)
  conn.connect()
  conn.query('SELECT * FROM topic WHERE title=?', [title], (err, results, fields) => {
    if(err) {
      res.redirect('/')
      KLog.error(err.stack)
      return
    }
    KLog.info(username + ' : search ' + title)

    if(results.length > 0) {
      req.app.render('search', {results: results}, (err, html) => {
        if(err) {
          KLog.error(err.stack)
          res.redirect('/')
          return
        }

        res.end(html)
      })
    }
  })
  conn.end()
}