var chart1;
var chart2;
var ws;

document.addEventListener('beforeunload',function(){
    ws.close();
});

document.addEventListener('DOMContentLoaded',function(){


    var Chart1Data = function() {
        this.timestamp = ((new Date()).getTime() / 1000)|0;
    }

    Chart1Data.prototype.rand = function() {
        return 15000000; //parseInt(Math.random() * 10000000) + 50;
    };

    Chart1Data.prototype.history = function(entries) {
        if (typeof(entries) != 'number' || !entries) {
            entries = 60;
        }
        var history = []
        history.push({ values: [] });

        for (var i = 0; i < entries; i++) {
            history[0].values.push({time: this.timestamp, y: this.rand()})
            this.timestamp++;
        }
        return history;
    };

    Chart1Data.prototype.next = function() {
        var entry = [];
        entry.push({time: this.timestamp, y: this.rand()})
		return entry;
    }

    var chart1Data = new Chart1Data(4);


    var myChart = $('#chart1').epoch({
        type: 'time.line',
        axes: ['left', 'bottom', 'right'],
        data: chart1Data.history()
    });

    /* Websocket stuff and fetching callback */
    function wsurl() {
	var l = window.location;
	return ((l.protocol === "https:") ? "wss://" : "ws://") + l.hostname + (((l.port != 80) && (l.port != 443)) ? ":" + l.port : "") + "/debug/charts/data-feed";
    }

    ws = new WebSocket(wsurl());
    ws.onopen = function () {
	ws.onmessage = function (evt) {
	    var data = JSON.parse(evt.data);
            the_date = ((new Date()).getTime() / 1000)|0;

            myChart.push([{time: the_date /1000, y: data.BytesAllocated}]);

	    //chart1.series[0].addPoint([data.Ts*1000, data.GcPause], true);
  	    //chart2.series[0].addPoint([data.Ts*1000, data.BytesAllocated], true);
        }
    }
})
