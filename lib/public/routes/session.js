module.exports.getUsername = (req, res) => {
  req.session.ip = req.ip

  if(req.session.username) {
    req.session.isip = false
    return { ip: false, username: req.session.username }
  }
  else {
    req.session.isip = true
    username = gen(4)
    return { ip: true, username: req.ip }
  }
}

function gen(length) {
  let a = 'ABCDEFGHIJKLNMOPQRSTUVWXYZ0123456789abcdefghijklnmopqrstuvwxyz'
  let temp = ''
  for (let i = 0; i < length; i++) {
    var land = Math.floor(Math.random() * (a.length - 1 - 0 + 1)) + 0
    temp += a[land]
  }
  return temp
}