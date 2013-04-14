(function(){
	/**
	 * Коллекция точек
	 * @param {Object} model Объект точки
	 */
	var PointsCollection = function(model){
		this.pointsStorage = [];
		this.model = model;
	};

	PointsCollection.prototype = {
		add: function(){
			var data = [].slice.call(arguments, 0)[0];
			if (_.isArray(data)) {
				_.each(data, function(item){
					this.pointsStorage.push(new this.model(item));
				}, this);
			} else {
				this.pointsStorage.push(new this.model(data));
			}
		},
		getSummaryWidth: function(){
			return _.reduce(this.pointsStorage, function(memo, point){
				return memo + point.getWidth();
			}, 0);
		},
		getPoints: function(width, offset){
			return _.filter(this.pointsStorage, function(point, i){
				return point.isVisible(width, offset, i);
			});
		}
	};

	window.chart.PointsCollection = PointsCollection;
})();