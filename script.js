$(document).ready(function() {

  var userInput = '';
  var showIdNumber = '';


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
        // get data I want to display on website
        var $test = $('#displayIt');
        $test.html(JSON.stringify(data));
        console.log($test);
      },
      error: function (data) {
        console.log('error', data);
      }
    });


  });

});
