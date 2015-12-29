/* **** Global Variables **** */
// try to eliminate these global variables in your project, these are here just to start.

var playersGuess;
var winningNumber;
var guesses = [];
var numGuesses = 0;
var guessExists;
var hintMessage;
var hintClass;

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	return Math.floor(Math.random() * 100) + 1;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// get value
	$('html').removeClass();
	$('#hint-message').remove();
	if (numGuesses == 5) {
		$('#status').text("Game Over");
		$('#guess-count').text("You don't have any guesses left.  Why don't you play again?");
	} else {
		playersGuess = +$('#playersGuess').first().val();
		$('#playersGuess').first().val('');
		checkGuess();
		//jquery change #guess-count text
		$('#guess-count').text((5 - numGuesses) + " guesses remaining");
	}

}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// message variables
	var moreThan20 = "You are more than 20 digits off.";
	var moreThan10 = "You are more than 10 digits off.";
	var lessThan10 = "You are within 10 digits of the winning number!";
	
	// build message
	if (numGuesses === 0) {
		hintMessage = "Hey, you need to make a guess first.";

	} else if (numGuesses == 5) {
		hintMessage = "Sorry, the game is over.  You have no more hints left.";
		hintClass = null;
	} else if (playersGuess == winningNumber) {
		hintMessage = "Hey, you already won!";
	} else if (playersGuess > winningNumber) {
		// higher
		if (playersGuess - winningNumber > 20) {
			hintMessage = "Too high! " + moreThan20;
			hintClass = "cold-bkg";
		} else if (playersGuess - winningNumber > 10) {
			hintMessage = "Too high. " + moreThan10;
			hintClass = "warm-bkg";
		} else {
			hintMessage = "A little too high, but close. " + lessThan10;
			hintClass = "hot-bkg";
		}

	} else {
		// lower
		if (winningNumber - playersGuess > 20) {
			hintMessage = "Too low! " + moreThan20;
			hintClass = "cold-bkg";
		} else if (winningNumber - playersGuess > 10) {
			hintMessage = "Too low. " + moreThan10;
			hintClass = "warm-bkg";
		} else {
			hintMessage = "A little too low, but close. " + lessThan10;
			hintClass = "hot-bkg";
		}

	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	guessExists = false;

	if (playersGuess == winningNumber)	{
		// player wins
		$('#status').text("You are CORRECT!");
		guesses.push(playersGuess);
	} else {
		// loop through guesses array
		// if none matches playersGuess
		for(var i=0; i<guesses.length; i++){
			if(playersGuess == guesses[i]){
				guessExists = true;
				$('#status').text("You already picked that number");
			}
		}
		if (guessExists != true) {
			guesses.push(playersGuess);
			numGuesses++;
			// use lowerOrHigher() to change status message?
			$('#status').text("Try again");
		}
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
	lowerOrHigher();
	$('#status').before("<h3 id='hint-message'>" + hintMessage + "</h3");
	$('html').addClass(hintClass);

}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	winningNumber = generateWinningNumber();
	playersGuess = null;
	guesses = [];
	numGuesses = 0;
	$('#status').text("");
	$('html').removeClass();
	$('#guess-count').text("5 guesses remaining");

}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
	winningNumber = generateWinningNumber();
	// click submit your guess
	$('#playersGuessSubmit').on('click', function() {
		playersGuessSubmission();
	});
	// press enter in guess submission field
	$('#playersGuess').keypress(function(e) {
	    if(e.which == 13) {
	    	playersGuessSubmission();
    	}
	});
	// new game
	$('#newGame').on('click', function() {
		playAgain();
	});
	$('#hint').on('click', function(){
		provideHint();
	});

});

