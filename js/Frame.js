(function(){
    var defaultFrame = {
        offset: 0
    };

    /**
     * Окно для рисования графика
     * @param {Object} options настройки окна
     */
    var Frame = function(options){
        options || (options = {});
        options = $.extend({}, defaultFrame, options);

        // Получаем конекст для рисования
        this.el = $(options.el);
        if (this.el[0].getContext){
          this.context = this.el[0].getContext('2d');
        } else {
            console.warn('Canvas isn\'t supported');
        }

        this.width = this.el.width();
        this.height = this.el.height();

        // Хранилище точек
        this.collection = options.collection;

        this.offset = this.collection.getSummaryWidth() - this.width;

        this.drawInitLines(0, this.height / 2, this.width, this.height / 2);
        this.drawPoints(this.getVisiblePoints());

        var isPressed = false,
            lastPosition = this.offset,
            rightBorder = this.offset,
            that = this;

        this.el.on('mousedown', function(evt){
            isPressed = evt;
        });

        this.el.on('mousemove', function(evt){
            if (!isPressed) return true;

            var offset = lastPosition + isPressed.clientX - evt.clientX;
            
            if (offset >= 0 && offset <= rightBorder) {
                that.offset = offset;
                that.redraw();
            }
        });

        this.el.on('mouseup', function(evt){
            lastPosition = that.offset;
            isPressed = false;
        });
    };

    Frame.prototype = {
        drawInitLines: function(x, y, x2, y2, dashArray){
            if (!dashArray) dashArray = [10,5];
            if (!dashLength) dashLength = 0.001;

            var dashCount = dashArray.length,
                dx = (x2-x), dy = (y2-y),
                slope = dy/dx,
                distRemaining = Math.sqrt( dx*dx + dy*dy ),
                dashIndex=0, draw=true;

            this.context.lineWidth = 1;
            this.context.strokeStyle = "rgba(0, 0, 255, 0.8)";
            this.context.beginPath();
            this.context.moveTo(x, y);

            while (distRemaining >= 0.1){
                var dashLength = dashArray[dashIndex++%dashCount];
                if (dashLength > distRemaining) dashLength = distRemaining;
                var xStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
                if (dx < 0) xStep = -xStep;
                x += xStep;
                y += slope * xStep;
                this.context[draw ? 'lineTo' : 'moveTo'](x,y);

                distRemaining -= dashLength;
                draw = !draw;
            }

            this.context.stroke();
        },
        getVisiblePoints: function(){
            return this.collection.getPoints(this.width, this.offset);
        },
        drawPoints: function(points){
            _.each(points, function(point, i){
                point.draw(this.context, i, this.offset, this.height / 2);
            }, this);
        },
        redraw: function(){
            this.context.clearRect(0, 0, this.width, this.height);
            this.drawInitLines(0, this.height / 2, this.width, this.height / 2);
            this.drawPoints(this.getVisiblePoints());
        }
    };

    window.chart.Frame = Frame;
})();