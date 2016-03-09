$(document).ready(function() {

  var userInput = '';
  var showIdNumber = '';
  var imageSource = '';


  $('#submitIt').click(function(e) {
    // line 8 stops code from submitting the query and going away
    e.preventDefault();

    userInput = $('#searchIt').val();
    console.log(userInput);

    // make container for episode data visible !!!!
    $('#displayIt').css('visibility', 'visible');

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
            $.each(episodeData, function(key, value) {

            // make framework for data outpout
            var $newRow = $('.row.template').clone().removeClass('template');
            var $imageOutput = $newRow.find('.episodeImage');

            $imageOutput.append($('<img src=' + value.image.medium + '>'));

            var  $episodeOutput = $newRow.find('.episodeDetails');

            $episodeOutput.append($('<h3>' + value.name + '</h3>'));
            $episodeOutput.append($('<h5>' + value.airdate + '</h5>'));
            $episodeOutput.append($("<button type='submit' class='addIt'>" + 'Add it!' + '</button>'));
            $episodeOutput.append($('<p>' + value.summary + '<p>'));

            $('#displayIt').append($newRow);

            });

            // populate My List on "add it" click with Episode Details
            $('#addIt').click(function(event) {
              event.preventDefault();

              var holdEpDetails = '';

              

            });




          }
        });
      },
      error: function (data) {
        console.log('error', data);
      }
    });


  });

});
