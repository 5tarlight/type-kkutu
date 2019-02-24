module.exports.getUsername = (req, res) => {
  if(req.session.username) return req.session.username
  else {
    req.session.username = req.ip
    return req.session.username
  }
}
