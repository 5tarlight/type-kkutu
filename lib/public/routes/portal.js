const KLog = require('../../klog')
const session = require('./session')

module.exports.join = (req, res) => {
  let username = session.getUsername(req, res)
  KLog.info( username+ ' : portal')

  res.app.render('portal', {}, (err, html) => {
    if(err) {
      KLog.error(err.stack)
      return
    }

    res.end(html)
  })
}