$(function() {
  $.each(['products', 'tests', 'test_values', 'pages', 'revisions'],
         function(index, value) {
    $.getJSON('data/' + value + '.json', function(data) {
      console.log(data);
    });
  });
});
