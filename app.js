var express = require('express'); 
var app = express.createServer(); 
var io = require('socket.io').listen(app);

app.listen(8080);

app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler());
});

io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    console.log(data);
	  socket.emit('message', data);
	  socket.broadcast.emit('message', data);
  });
});