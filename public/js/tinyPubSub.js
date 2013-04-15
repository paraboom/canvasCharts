(function($){
    var Events = function(){
        this.o = $({});
        
        $.each({ 
            "subscribe" : "bind", 
            "unsubscribe" : "unbind", 
            "publish" : "trigger" 
        }, function ( fn, api ) {
            $[ fn ] = function() {
                o[ api ].apply( o, arguments );
            };
        });
    };

    Events.prototype = {
        subscribe: function(){
            this.o.bind.apply(this.o, arguments);
        },

        unsubscribe: function(){
            this.o.unbind.apply(this.o, arguments);
        },

        publish: function(){
            this.o.trigger.apply(this.o, arguments);
        }
    };

    window.chart.Events = Events;
})($);