window.chart = {};

$(function(){
    var socket = io.connect('http://localhost:8000');

    (function init(){
        // Коллекция точек
        var pointsCollection = new chart.PointsCollection(chart.Point);

        socket.on('initData', function (data) {
            // Добавляем точки в коллекцию
            pointsCollection.add(data.points);
        });

        socket.on('point', function(data){
            // Пришла новая точка
            pointsCollection.add(data.point);
        });

        // График с коллекцией точек
        var chartGraph = new chart.Frame({
            el: $('#frame'),
            collection: pointsCollection
        });
    })();
});