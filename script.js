$(document).ready(function() {
  'use strict';

  var userInput = '';
  var storedData = '';

  $.fn.scrollView = function() {
    return this.each(function() {
      $('html, body').animate({
        scrollTop: $(this).offset().top
      }, 1000);
    });
  };

  $('#submitIt').click(function(e) {
    e.preventDefault();

    userInput = $('#searchIt').val();

    // make container for episode data visible !!!!
    $('#displayIt').css('visibility', 'visible');

    // clear container of previous search
    $('#displayIt .row:not(.template)').remove();

    $.ajax({
      url: 'http://api.tvmaze.com/singlesearch/shows?q=' + userInput,
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

              // errors out when calling shows without images.
              $imageOutput.append($('<img src="' + value.image.medium + '">'));

              var $episodeOutput = $newRow.find('.episodeDetails');

              $episodeOutput.append($('<h3>' + value.name + '</h3>'));
              $episodeOutput.append($('<h5>' + 'Air date:' + ' ' + value.airdate + '</h5>'));
              $episodeOutput.append($("<button type='submit' class='addIt'>" + 'Add it!' + '</button>'));
              $episodeOutput.append($('<p>' + value.summary + '<p>'));

              $('#displayIt').append($newRow);

              var clickHandler = function() {
                storedData = $episodeOutput.clone();

                // change the column length to 10 instead of 6
                storedData.attr('class', 'episodeDetails col-md-11');

                // use localStorage to save myList each time Add It is clicked
                // the next line will get the saveData
                var saveData = JSON.parse(localStorage.getItem('myList')) || [];
                saveData.push(value);

                // console.log(saveData);
                localStorage.setItem('myList', JSON.stringify(saveData));

                var $newForm = $('.anotherTemplate.copy').clone().removeClass('copy');

                $('#revealIt article').append($newForm);
                $newForm.find('p').append(storedData);
                $newForm.find('input').click(function() {
                  $newForm.remove();

                  // next line to allows same episode to be clicked again
                  $newRow.find('.addIt').click(clickHandler);
                });
                $newRow.find('.addIt').off('click', clickHandler);
              };
              $newRow.find('.addIt').click(clickHandler);
            });
          }
        });
      },
      error: function(data) {
        console.log('error', data);
      }
    });
  });

  $('.myList, .midbuttons').click(function() {
    // something.preventDefault();
    // make container for My List visible !!!!
    $('#revealIt').css('visibility', 'visible');

    // work in progress - try to display saved list data when page loads
    // (function displayData() {
    //
    //   if (JSON.parse(localStorage.getItem('myList')) !== 'undefined' && JSON.parse(localStorage.getItem('myList')) !== null) {
    //
    //     var listValue = JSON.parse(localStorage.getItem('myList'));
    //     console.log(listValue);
    //
    //     $.each(listValue, function(key, value) {
    //       // build a new form template to throw myList into.
    //       var $anotherForm = $('.row.template').clone().removeClass('template');
    //       var $listEpisodeOutput = $anotherForm.find('.episodeDetails');
    //
    //       $listEpisodeOutput.append($('<h3>' + value.name + '</h3>'));
    //       $listEpisodeOutput.append($('<h5>' + 'Air date:' + ' ' + value.airdate + '</h5>'));
    //       $listEpisodeOutput.append($('<p>' + value.summary + '<p>'));
    //
    //       var $yetAnotherForm = $('.anotherTemplate.copy').clone().removeClass('copy');
    //
    //       $('#revealIt article').append($anotherForm);
    //         var savedListData = $listEpisodeOutput.clone();
    //
    //         $anotherForm.find('p').append(savedListData);
    //         $anotherForm.find('input').click(function() {
    //           $anotherForm.remove();
    //         });
    //
    //       console.log($yetAnotherForm);
    //       return $('#revealIt article').append($yetAnotherForm);
    //     });
    //   }
    // })();

  });

  $('#cornerButton').click(function() {
    $('#revealIt').scrollView();
  });
});
