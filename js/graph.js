$(function() {
    var graph = new Rickshaw.Graph( {
    	element: document.querySelector("#chart"),
    	width: 235,
    	height: 85,
    	renderer: 'scatterplot',
    	stroke: true,
    	series: [ {
    		data: [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 } ],
    		color: 'steelblue'
    	} ]
    } );
    var axes = new Rickshaw.Graph.Axis.Time( { graph: graph } );
    graph.render();
});
