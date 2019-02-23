const KLog = require('../../klog')

module.exports.join = (req, res) => {
  KLog.info(req.ip + ' : portal')

  res.app.render('portal', {}, (err, html) => {
    if(err) {
      KLog.error(err.stack)
      return
    }

    res.end(html)
  })
}