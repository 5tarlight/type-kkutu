module.exports.getUsername = (req, res) => {
  if(req.session.username) return username
  else {
    req.session.username = req.ip
    return req.session.username
  }
}
