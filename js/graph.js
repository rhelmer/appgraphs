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
        width: 960,
        height: 500,
        renderer: 'scatterplot',
        series: [
            {
                color: '#c05020',
                data: seriesData,
                name: 'Browser'
            }
        ]
    });

    graph.render();

    var hoverDetail = new Rickshaw.Graph.HoverDetail({
        graph: graph
    });

    var legend = new Rickshaw.Graph.Legend({
        graph: graph,
        element: document.getElementById('legend')

    });

    var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
        graph: graph,
        legend: legend
    });

    var axes = new Rickshaw.Graph.Axis.Time({
        graph: graph
    });

    axes.render();
}

