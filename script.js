$(document).ready(function() {

  var userInput = '';
  var showIdNumber = '';
  var imageSource = '';
  var storedData = '';


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
            console.log(episodeData);
            // get the data I want to display
            $.each(episodeData, function(key, value) {
              // make framework for data outpout
              var $newRow = $('.row.template').clone().removeClass('template');
              var $imageOutput = $newRow.find('.episodeImage');

              // next line works, errors out when calling shows with unreleased episodes.
              $imageOutput.append($('<img src="' + value.image.medium + '">'));

              var  $episodeOutput = $newRow.find('.episodeDetails');

              $episodeOutput.append($('<h3>' + value.name + '</h3>'));
              $episodeOutput.append($('<h5>' + 'Air date:' + ' ' + value.airdate + '</h5>'));
              $episodeOutput.append($("<button type='submit' class='addIt'>" + 'Add it!' + '</button>'));
              $episodeOutput.append($('<p>' + value.summary + '<p>'));

              $('#displayIt').append($newRow);


              // capture data of section where I click "add it"
              $newRow.find('.addIt').click(function(event) {
                storedData = $episodeOutput.clone();
                $('.appendHere').append(storedData);


              });

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
