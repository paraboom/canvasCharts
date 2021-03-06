(function(){
	/**
	 * Коллекция точек
	 * @param {Object} model Объект точки
	 */
	var PointsCollection = function(model){
		this.pointsStorage = [];
		this.model = model;
		this.events = new chart.Events();
	};

	PointsCollection.prototype = {
		/**
		 * Добавление точек в коллекцию.
		 * Можно передать как массив точек, так и одну
		 */
		add: function(){
			var data = [].slice.call(arguments, 0)[0];
			if (_.isArray(data)) {
				_.each(data, function(item){
					this.pointsStorage.push(new this.model(item));
				}, this);
			} else {
				this.pointsStorage.push(new this.model(data));
			}
			this.trigger('pointsAdded');
		},
		/**
		 * Суммарная ширина всех точек
		 */
		getSummaryWidth: function(){
			return _.reduce(this.pointsStorage, function(memo, point){
				return memo + point.getWidth();
			}, 0);
		},
		/**
		 * Получаем список всех видимых точек в заданном промежутке
		 * @param  {Number} width  ширина
		 * @param  {Number} offset смещение
		 * @return {Array}        Point
		 */
		getPoints: function(width, offset){
			return _.filter(this.pointsStorage, function(point, i){
				return point.isVisible(width, offset, i);
			});
		},

		on: function(){
			this.events.subscribe.apply(this.events, arguments);
		},
		trigger: function(){
			this.events.publish.apply(this.events, arguments);
		}
	};

	window.chart.PointsCollection = PointsCollection;
})();