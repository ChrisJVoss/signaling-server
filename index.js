const https = require('https').createServer({
  key: process.env.KEY,
  cert: process.env.CERT
})
const io = require('socket.io')(https)

let connections = []

io.on('connection', socket => {
  connections.push(socket)
  console.log('%s users connected', connections.length)
  socket.on('yourId', (id) => {
    socket.broadcast.emit('otherId', id)
  })
  socket.on('disconnect', function() {
    connections.splice(connections.indexOf(socket), 1)
    console.log('%s users connected', connections.length)
  })
})

https.listen(process.env.PORT, () => {
  console.log('Listening...')
})
