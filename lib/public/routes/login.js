const KLog = require('../../klog')

module.exports.join = (req, res) => {
  KLog.info(req.ip + ' : login')

  res.app.render('login', {}, (err, html) => {
    if (err) {
      KLog.error(err.stack)
      return
    }

    res.end(html)
  })
}