$(function() {

    // FIXME get this from datazilla pages JSON, 34 is "cold_load_time" test
    var page_id = 34;

    $.getJSON('data/test_values.json', function(data) {
        // "page_id" is actually the test id
        var seriesData = [];
        $.each(data, function(index, value) {
            if (value.page_id == page_id) {
                seriesData.push({x: value.date_run, y: value.avg});
            }
        });

        graph(seriesData);
    });
});

function graph(seriesData) {
    var graph = new Rickshaw.Graph({
        element: document.getElementById('chart'),
        renderer: 'scatterplot',
        height: 300,
        width: 800,
        series: [
            {
                color: '#c05020',
                data: seriesData,
                name: 'Browser'
            }
        ]
    });

    var hoverDetail = new Rickshaw.Graph.HoverDetail({
        graph: graph
    });

    var y_ticks = new Rickshaw.Graph.Axis.Y( {
        graph: graph,
        orientation: 'left',
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
        element: document.getElementById('y_axis'),
    } );

    graph.render();
}
