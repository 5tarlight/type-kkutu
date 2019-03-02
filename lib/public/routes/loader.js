const KLog = require('../../klog')
const routes = require('./routes')
const mysql = require('mysql')
const dbsettings = require('../../sub/settings.json').db
const session = require('./session')

module.exports.init = (app, router) => {
  for(let i in  routes) {
    router.route(routes[i].url)[routes[i].type](require(routes[i].path)[routes[i].method])
    KLog.success('[ ' + routes[i].url + ' ] ' + routes[i].type + '라우팅 경로 추가됨')
  }

  router.route('/w/:title').get((req, res) => {
    let title = req.params.title
    let username = session.getUsername(req, res)

    let conn = mysql.createConnection(dbsettings)
    conn.connect()
    conn.query('SELECT * FROM topic WHERE title=?', [title], (err, results, fields) => {
      if(err) {
        res.redirect('/')
        KLog.err(err.stack)
        return
      }

      if(results.length > 0) {
        KLog.info(username + ' : topic ' + title)
        
        req.app.render('topic', {
          title: results[0]['title'],
          description: results[0]['description'],
          article: results[0]['article'],
          authorid: results[0]['authorid']
        }, (err, html) => {
          if(err) {
            res.redirect('/')
            KLog.err(err.stack)
            return
          }

          res.end(html)
        })
      } else {
        KLog.info(username + ' : 404')
        res.writeHead(200, {'Content-type': 'text/html;charset=utf8'})
        res.end('<h1>Error 404 - Page Not Found</h1>')
      }
    })
    conn.end()
  })

  KLog.success('토픽 라우터 추가됨')
  app.use(router)
}