$(function() {

    // FIXME get this from datazilla pages JSON, 34 is "cold_load_time" test
    var page_id = 34;

    $.getJSON('data/test_values.json', function(data) {
        // "page_id" is actually the test id
        var series = {data: [], max: undefined, min: undefined};

        $.each(data, function(index, value) {
            if (value.page_id == page_id) {
                if (value.avg > series.max || series.max == undefined) {
                    series.max = value.avg;
                }
                if (value.avg < series.min || series.min == undefined) {
                    series.min = value.avg;
                }
                series.data.push({x: value.date_run, y: value.avg});
            }
        });

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
