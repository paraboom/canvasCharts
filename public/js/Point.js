(function(){
	var defaultPoint = {
		width: 15
	};

	var redColor = "#ff0000";
	var blueColor = "#0000ff";

	/**
	 * Объект точки
	 * @param {Object} options инициализационные данные
	 */
	var Point = function(options){
		options || (options = {});
		options = $.extend({}, defaultPoint, options);

		for (var key in options) {
			this[key] = options[key];
		}
		this.x = this.x * this.width;
	};

	Point.prototype = {
		// Ширина
		getWidth: function(){
			return this.width;
		},
		// Проверка видима ли точка в заданном отрезке
		isVisible: function(width, offset){
			var x = this.x;

			if ((x + this.width) >= offset && (x <= width + offset)) {
				return true;
			} else {
				return false;
			}
		},
		// Отрисовка элемента точки
		draw: function(ctx, i, offsetX, offsetY){
			var x = this.x - offsetX - 2,
				lineX = x + this.width / 2 - 1,
				y = offsetY + this.y;

			ctx.strokeStyle = "rgba(0, 0, 0, 1)";
			ctx.beginPath();
			ctx.moveTo(lineX, y);
			ctx.lineTo(lineX, y + this.height);
			ctx.stroke();

			ctx.fillStyle = (this.direction) ? blueColor : redColor;
			ctx.fillRect(x, y + this.y2, this.width - 2, this.h2);
		}
	};

	// статичные данные
	Point.width = defaultPoint.width;

	window.chart.Point = Point;
})();