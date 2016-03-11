$(document).ready(function() {

  var userInput = '';
  var showIdNumber = '';
  var imageSource = '';
  var storedData = '';


  $.fn.scrollView = function () {
    return this.each(function () {
      $('html, body').animate({
        scrollTop: $(this).offset().top
      }, 1000);
    });
  }

  // work in progress - try to display saved list data when page loads
  // function displayData() {
  //   if (localStorage == true) {
  //     $episodeOutput.append(saveData);
  //   }
  //
  // }


  $('#submitIt').click(function(e) {
    e.preventDefault();

    userInput = $('#searchIt').val();

    // make container for episode data visible !!!!
    $('#displayIt').css('visibility', 'visible');

    // clear container of previous search
    $('#displayIt .row:not(.template)').remove();

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

              // next line works, errors out when calling shows with unreleased episode images.
              $imageOutput.append($('<img src="' + value.image.medium + '">'));

              var  $episodeOutput = $newRow.find('.episodeDetails');

              $episodeOutput.append($('<h3>' + value.name + '</h3>'));
              $episodeOutput.append($('<h5>' + 'Air date:' + ' ' + value.airdate + '</h5>'));
              $episodeOutput.append($("<button type='submit' class='addIt'>" + 'Add it!' + '</button>'));
              $episodeOutput.append($('<p>' + value.summary + '<p>'));

              $('#displayIt').append($newRow);

              var clickHandler = function(event) {
                storedData = $episodeOutput.clone();

                // change the column length to 10 instead of 6
                storedData.attr('class', 'episodeDetails col-md-11');

                // use localStorage to save myList each time Add It is clicked
                // the next line will get the saveData
                var saveData = JSON.parse(localStorage.getItem('myList')) || [];
                saveData.push(value);
                console.log(saveData);
                localStorage.setItem('myList', JSON.stringify(saveData));

                var $newForm = $('.anotherTemplate.copy').clone().removeClass('copy');

                $('#revealIt article').append($newForm);
                $newForm.find('p').append(storedData);
                $newForm.find('input').click(function() {
                  $newForm.remove();
                  // add this next line to allow same episode to be clicked again
                  $newRow.find('.addIt').click(clickHandler);
                });
                $newRow.find('.addIt').off('click', clickHandler);
              }
              $newRow.find('.addIt').click(clickHandler);
            });
          }
        });
      },
      error: function (data) {
        console.log('error', data);
      }
    });
  });
  
  $('.myList, .midbuttons').click(function (something) {
    // something.preventDefault();
    // make container for My List visible !!!!
    $('#revealIt').css('visibility', 'visible');
  });

  $('#cornerButton').click(function (dothething) {
    $('#revealIt').scrollView();

  });


});
