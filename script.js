$(document).ready(function() {

  var userInput = '';
  var showIdNumber = '';
  var imageSource = '';


  $('#submitIt').click(function(e) {
    // line 8 stops code from submitting the query and going away
    e.preventDefault();

    userInput = $('#searchIt').val();
    console.log(userInput);

    $.ajax({
      url:'http://api.tvmaze.com/singlesearch/shows?q=' + userInput,
      method: 'GET',
      success: function(data) {

        // add tv show id to another api search
        $.ajax({
          url: 'http://api.tvmaze.com/shows/' + data.id + '/episodes',
          method: 'GET',
          success: function(episodeData) {

            // get the data I want to display
            // $.each(episodeData, function(test) {
            //
            //
            // })

            // display the data
            var $output = $('#displayIt');
              $output.html(JSON.stringify(episodeData));
              console.log(episodeData);
          }
        });


      },
      error: function (data) {
        console.log('error', data);
      }
    });


  });

});