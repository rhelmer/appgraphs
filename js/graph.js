$(function() {

    $.getJSON('data/test_values.json', function(data) {
        // there are multiple test runs per revision, aggregate these by rev
        var by_rev = [];
        $.each(data, function(index, value) {
            if (value.revision in by_rev) {
                by_rev[value.revision].y.push(value.avg);
            } else {
                by_rev[value.revision] = {x: value.date_run,
                                          y: [value.avg]};
            }
        });

        // prepare data for plotting - take median of individual runs
        var seriesData = [];
        for (var revision in by_rev) {
            var value = by_rev[revision];
            seriesData.push({x: value.x, y: median(value.y)});
        }

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

function median(values) {
    values.sort(function(a, b) {return a - b;});

    var half = Math.floor(values.length / 2);

    if (values.length % 2) {
        return values[half];
    } else {
        return (values[half - 1] + values[half]) / 2.0;
    }
}

function max(values) {
    return Math.max.apply(null, values);
}

function avg(values) {
    var sum = value.reduce(function(a, b) { return a + b });
    return sum / times.length;
}
