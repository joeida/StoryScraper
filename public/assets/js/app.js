// grab the articles as a json
$.getJSON('/articles', function(data) {
  // for each one
  for (var i = 0; i<data.length; i++){
    // display the apropos information on the page
    $('#articles').append('<p data-id="' + data[i]._id + '">'+ data[i].title + '<br />'+ data[i].link + '</p>');
  }
});


// whenever someone clicks a p tag
$(document).on('click', 'p', function(){
  // empty the notes from the note section
  $('#notes').empty();
  // save the id from the p tag
  var thisId = $(this).attr('data-id');

  // now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // with that done, add the note information to the page
    .done(function( data ) {
      // the title of the article
      $('#submitNote').attr('data-id', data._id);
      $('#notes').attr('data-id', data._id);
      $('#notes').append('<h3>Title: ' + data.title + '</h3>');
      // if there's a note in the article
      if(data.note){
        for (var i = 0; i < data.note.length; i++) {
          // place the title of the note in the title input
          $('#notes').append('<h4>Note:</h4><p>Title: ' + data.note[i].title + '</p>');
          // place the body of the note in the body textarea
          $('#notes').append('<p>Body: ' + data.note[i].body + '</p>');
          $('#notes').append('<button data-id=' + data._id + ' note-id=' + data.note[i]._id + '>Remove</button>');
        }
      } else {
        console.log('no note');
      }
    });
});

$('#notes').on('click', 'button', function() {
  var thisId = $(this).attr('data-id');
  var noteId = $(this).attr('note-id');
  $.ajax({
    method: "POST",
    url: "/articles/delete",
    data: {
      thisId: thisId,
      noteId: noteId
    }
  })
    .done(function(data) {
      // log the response
      console.log(data);
      // empty the notes section
      $('#notes').empty();

      $.ajax({
        method: "GET",
        url: "/articles/" + thisId,
      })
        // with that done, add the note information to the page
        .done(function( data ) {
          // the title of the article
          $('#submitNote').attr('data-id', data._id);
          $('#notes').attr('data-id', data._id);
          $('#notes').append('<h3>Title: ' + data.title + '</h3>');
          // if there's a note in the article
          if(data.note){
            for (var i = 0; i < data.note.length; i++) {
              // place the title of the note in the title input
              $('#notes').append('<h4>Note:</h4><p>Title: ' + data.note[i].title + '</p>');
              // place the body of the note in the body textarea
              $('#notes').append('<p>Body: ' + data.note[i].body + '</p>');
              $('#notes').append('<button data-id=' + data._id + ' note-id=' + data.note[i]._id + '>Remove</button>');
            }
          } else {
            console.log('no note');
          }
        });
    })
})

// when you click the savenote button
$(document).on('click', '#submitNote', function(){
  // grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');

  // run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleInput').val(), // value taken from title input
      body: $('#bodyInput').val() // value taken from note textarea
    }
  })
    // with that done
    .done(function( data ) {
      // log the response
      console.log(data);
      // empty the notes section
      $('#notes').empty();

      $.ajax({
        method: "GET",
        url: "/articles/" + thisId,
      })
        // with that done, add the note information to the page
        .done(function( data ) {
          // the title of the article
          $('#submitNote').attr('data-id', data._id);
          $('#notes').attr('data-id', data._id);
          $('#notes').append('<h3>Title: ' + data.title + '</h3>');
          // if there's a note in the article
          if(data.note){
            for (var i = 0; i < data.note.length; i++) {
              // place the title of the note in the title input
              $('#notes').append('<h4>Note:</h4><p>Title: ' + data.note[i].title + '</p>');
              // place the body of the note in the body textarea
              $('#notes').append('<p>Body: ' + data.note[i].body + '</p>');
              $('#notes').append('<button data-id=' + data._id + ' note-id=' + data.note[i]._id + '>Remove</button>');
            }
          } else {
            console.log('no note');
          }
        });
    });

  // Also, remove the values entered in the input and textarea for note entry
  $('#titleInput').val("");
  $('#bodyInput').val("");
});
