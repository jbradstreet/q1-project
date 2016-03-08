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
            $.each(episodeData, function(key, value) {

            // make framework for data outpout
            var $newRow = $('.row.template').clone().removeClass('template');


            var $imageOutput = $newRow.find('.episodeImage');
            console.log(value)
            $imageOutput.append($('<img src=' + value.image.medium + '>'));

            var  $episodeOutput = $newRow.find('.episodeDetails');
            $episodeOutput.append($('<h3>' + value.name + '</h3>'));
            $episodeOutput.append($('<h5>' + value.airdate + '</h5>'));
            $episodeOutput.append($('<p>' + value.summary + '<p>'));

            $('#displayIt').append($newRow);





              // display the data
              // var $imageOutput = $('.episodeImage');
              // console.log(value)
              // $imageOutput.append($('<img src=' + value.image.medium + '>'));

              // var  $episodeOutput = $('.episodeDetails');
              // $episodeOutput.append($('<h3>' + value.name + '</h3>'));
              // $episodeOutput.append($('<h5>' + value.airdate + '</h5>'));
              // $episodeOutput.append($('<p>' + value.summary + '<p>'));
              // $output.append(value.name);
              // $output.append(value.number);
              // $output.append(value.summary);

                // $output.html(JSON.stringify(episodeData));
                // console.log(episodeData);

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
