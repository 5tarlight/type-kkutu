const KLog = require('../../klog')

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