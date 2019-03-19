module.exports = [
  {url: '/', path: './portal', method: 'join', type: 'get'},
  {url: '/auth', path: './auth', method: 'join', type: 'get'},
  {url: '/login', path: './login', method: 'join', type: 'get'},
  {url: '/process/auth', path: './auth', method: 'auth', type: 'post'},
  {url: '/process/login', path: './login', method: 'login', type: 'post'},
  {url: '/process/logout', path: './login', method: 'logout', type: 'get'},
  {url: '/game', path: './game', method: 'join', type: 'get'}
]