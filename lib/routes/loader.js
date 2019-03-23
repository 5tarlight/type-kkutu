const KLog = require('korean-logger')
const routes = require('./routes')

module.exports.init = (app, router) => {
  for(let i in  routes) {
    router.route(routes[i].url)[routes[i].type](require(routes[i].path)[routes[i].method])
    KLog.success('[ ' + routes[i].url + ' ] ' + routes[i].type + ' 라우팅 경로 추가됨')
  }
  app.use(router)
}