var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/jquery-1.6.4.min.js', function (req, res) {
  res.sendfile(__dirname + '/jquery-1.6.4.min.js');
});

io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    console.log(data);
	  socket.emit('message', data);
  });
});