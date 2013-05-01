$(function() {

    // FIXME get this from datazilla pages JSON, 34 is "cold_load_time" test
    var page_id = 34,
            max_time = 800;

    $.getJSON('data/test_values.json', function(data) {
        // "page_id" is actually the test id
        var series = {data: [], max: undefined, min: undefined, 
                      last_date: undefined, last_value: undefined};

        $.each(data, function(index, value) {
            if (value.page_id == page_id) {
                if (value.avg > series.max || series.max == undefined) {
                    series.max = value.avg;
                }
                if (value.avg < series.min || series.min == undefined) {
                    series.min = value.avg;
                }
                if (value.date_run > series.last_date ||
                    series.last_date == undefined) {
                    series.last_date = value.date_run;
                    series.last_value = value.avg;
                }

                series.data.push({x: value.date_run, y: value.avg});
            }
        });

        console.log(series.last_value);
        console.log(series.last_date);

        if (series.last_value >= max_time) {
            $().toastmessage('showWarningToast', 'warning - last test run took longer than ' + max_time +'ms');
        }

        graph(series);
    });
});

function graph(series) {
    var graph = new Rickshaw.Graph({
        element: document.getElementById('chart'),
        renderer: 'scatterplot',
        height: 400,
        width: 800,
        min: series.min - 10,
        max: series.max + 10,
        series: [
            {
                color: '#c05020',
                data: series.data,
                name: 'Browser'
            }
        ]
    });

    var hoverDetail = new Rickshaw.Graph.HoverDetail({
        graph: graph
    });

    var x_axis = new Rickshaw.Graph.Axis.Time({ graph: graph });

    var y_axis = new Rickshaw.Graph.Axis.Y({
        graph: graph,
        orientation: 'left',
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
        element: document.getElementById('y_axis')
    });

    graph.render();
}
