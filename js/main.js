window.chart = {};

$(function(){
	var fakeData = [],
		x = 0;

	for (var i = 0, l = 100; i < l; i++) {
		var y = Faker.Helpers.randomNumber(300)-150,
			height = Faker.Helpers.randomNumber(130) + 20,
			y2 = Faker.Helpers.randomNumber(height),
			h2 = Faker.Helpers.randomNumber(height - y2) + 10;

		fakeData.push({
			x: x++,
			y: y,
			y2: y2,
			height: height,
			h2: h2,
			direction: (Faker.Helpers.randomNumber(10)-5) > 0
		});
	}

	function init(){
		var pointsCollection = new chart.PointsCollection(chart.Point);
		pointsCollection.add(fakeData);

		var chartGraph = new chart.Frame({
			el: $('#frame'),
			collection: pointsCollection
		});
	}

	setTimeout(init, 50);
});