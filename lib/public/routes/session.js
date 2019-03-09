module.exports.getUsername = (req, res) => {
  req.session.ip = req.ip
  if(req.session.username) return { ip: false, username: req.session.username }
  else {
    return { ip: true, username: req.ip }
  }
}
