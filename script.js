$(document).ready(function() {

  var userInput = '';


  $('#submitIt').click(function(e) {
    // line 8 stops code from submitting the query and going away
    e.preventDefault();

    userInput = $('#searchIt').val();
    console.log(userInput);

    $.ajax({
      url:'http://api.tvmaze.com/singlesearch/shows?q=' + userInput,
      method: 'GET',
      success: function(data) {
        console.log(data);
      },
      error: function (data) {
        console.log('error', data);
      }
    });
  });

});
