$(function() {

    $.getJSON('data/test_values.json', function(data) {
        var by_revision = [];
        $.each(data, function(index, value) {
            if (value.revision in by_revision) {
                by_revision[value.revision].y.push(value.avg);
            } else {
                by_revision[value.revision] = {x: value.date_run,
                                               y: [value.avg]};
            }
        });

        var seriesData = [];
        for (var revision in by_revision) {
            var value = by_revision[revision];
            console.log(revision);
            console.log(value);
            seriesData.push({x: value.x, y: median(value.y)});
        }

        graph(seriesData);
    });
});

function graph(seriesData) {
    var graph = new Rickshaw.Graph( {
        element: document.getElementById("chart"),
        width: 960,
        height: 500,
        renderer: 'line',
        series: [
            {
                color: "#c05020",
                data: seriesData,
                name: 'Browser'
            }
        ]
    } );
    
    graph.render();
    
    var hoverDetail = new Rickshaw.Graph.HoverDetail( {
        graph: graph
    } );
    
    var legend = new Rickshaw.Graph.Legend( {
        graph: graph,
        element: document.getElementById('legend')
    
    } );
    
    var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
        graph: graph,
        legend: legend
    } );
    
    var axes = new Rickshaw.Graph.Axis.Time( {
        graph: graph
    } );

    axes.render();
}

function median(values) {
    values.sort( function(a,b) {return a - b;} );
  
    var half = Math.floor(values.length/2);
  
    if(values.length % 2) {
        return values[half];
    } else {
        return (values[half-1] + values[half]) / 2.0;
    }
}
