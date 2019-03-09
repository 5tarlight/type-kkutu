module.exports.getUsername = (req, res) => {
  req.session.ip = req.ip
  if(req.session.username) return req.session.username
  else {
    req.session.username = req.ip
    return req.session.username
  }
}
