
const session = require('./session')
const KLog = require('../../klog')

module.exports.join = (req, res) => {
  let username = session.getUsername(req, res)
  KLog.info(username + ' : new')

  req.app.render('new', {}, (err, html) => {
    if (err) {
      KLog.error(err.stack)
      return
    }

    res.end(html)
  })
}