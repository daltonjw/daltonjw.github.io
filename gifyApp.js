// Initialinzing variables. Topics array for creating initial search buttons...as chosen by my 3 year ol 
var topics = ["dinosaurs", "toys", "buckets"];

var authKey = "dc6zaTOxFJmzC";

// Variable to set number of gifs to return
var numResults = 10;


function renderButtons()
	{ 

		// Empties the div prior to adding new buttons (this is necessary otherwise you will have repeat buttons)
		$("#buttonsView").empty();
		// Loops through the array of topics
		for (var i = 0; i < topics.length; i++)
		{

			// Then dynamicaly generates buttons for each item in the array

		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('gifbutton'); // Added a class 
		    a.attr('data-name', topics[i]); // Added a data-attribute
		    a.text(topics[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}

	// This function handles events where one button is clicked
	$('#addGif').on('click', function(){

		// This line of code will grab the input from the textbox
		var newGif = $('#gif-input').val().trim();
		// Empty input field 
		// $('#gif-input').text(" ");
		// The movie from the textbox is then added to our array
		topics.push(newGif);
		
		// Our function then runs which handles the processing of our buttons/topics array
		renderButtons();

		// We have this line so that users can hit "enter" instead of clicking on submit button and it won't move to the next page
		return false;
	})

		// displayGif function now re-renders the HTML to display the appropriate content. 
	function displayGif(){

		var gif = $(this).attr('data-name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=" + numResults + "&api_key=" + authKey;
		
		// Creates AJAX call for the specific gif/button being 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

			console.log(response);

			// // Creates a generic div to hold the gif(s)
			var gifDiv = $('<div class="gif">');

			for (i = 0; i < numResults; i++) 
			{ 
				// Retrieves the Rating Data
				var rating = response.data[i].rating;

				// Creates an element to have the rating displayed
				var pOne = $('<p>').text( "Rating: " + rating);

				// Displays the rating
				gifDiv.append(pOne);

				// // Creates an element to hold the gif image 
				var image = $('<img>')
				image.attr("src", response.data[i].images.fixed_height_still.url);
				image.attr("data-still", response.data[i].images.fixed_height_still.url);
    			image.attr("data-animate", response.data[i].images.fixed_height.url);
    			image.attr("data-state", "still");
        		image.addClass("gifImage");

				// // Appends the image
				gifDiv.append(image);			
			}


			// Puts the entire set of gifs above the previous gifs.
			$('#gifView').prepend(gifDiv);
		});

	}

    function changeState() 
    {
      // defining a variable state and assigining data-state attribute 
      var state=$(this).attr("data-state");

      // Check if the variable state is equal to 'still',
      if (state == "still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");

      }

      // then update the src attribute of this image to it's data-animate value,
      // and update the data-state attribute to 'animate'.

      if (state != "still"){
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
      }
      // If state does not equal 'still', then update the src attribute of this
      // image to it's data-animate value and update the data-state attribute to 'still'
    };

renderButtons();

// Generic function for displaying the gifs
$(document).on('click', '.gifbutton', displayGif);
// Generic function for changing animation state of gifs when clicked on
$(document).on('click', '.gifImage', changeState);
