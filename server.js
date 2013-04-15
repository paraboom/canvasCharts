var http = require('http'),
    express = require('express'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    Faker = require('Faker');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

var fakeData = [],
    x = 0,
    id = 0, intervals = {};

function generatePoint() {
    var y = Faker.Helpers.randomNumber(300)-150,
        height = Faker.Helpers.randomNumber(130) + 20,
        y2 = Faker.Helpers.randomNumber(height),
        h2 = Faker.Helpers.randomNumber(height - y2) + 10;

    return {
        x: x++,
        y: y,
        y2: y2,
        height: height,
        h2: h2,
        direction: (Faker.Helpers.randomNumber(10)-5) > 0
    };
}

// Генерим фэйковые данные
for (var i = 0, l = 100; i < l; i++) {
    fakeData.push(generatePoint());
}

io.sockets.on('connection', function(socket){
    socket.emit('initData', {points: fakeData});

    var interval = setInterval(function(){
        socket.emit('point', {
            point: generatePoint()
        });
    }, 1000);

    socket.on('disconnect', function(){
        console.log('disconnected');
        clearInterval(interval);
    })
});

server.listen(8000);