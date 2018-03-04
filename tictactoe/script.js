// -------------------------------------------------------------------
// Setting up board, all these variables are "global"
// -------------------------------------------------------------------
var board = [
['-', '-', '-'],
['-', '-', '-'],
['-', '-', '-']];

const X = 'X';
const O = 'O';

var player = X;  // X always starts
var winner = false;
var validInput = false;
var moves = 0;

addMessage("Player " + player + " it is your turn!", "standard");

// -----------------------------------------------------------------
// Events
// -----------------------------------------------------------------

// TODO: add the setSpot function to be the event to each "spot"
var spot = document.getElementsByClassName("spot")
for (var i = 0; i < spot.length; i++) {
	spot[i].addEventListener("click", setSpot);
}

var ID = 0;
function setID(id) {
	ID = id;
}

// -----------------------------------------------------------------
// DOM Interaction
// -----------------------------------------------------------------

/* Upon receiving a valid selection this function
   adds the piece to the JavaScript board and the
   HTML board */
function setSpot() {
	// TODO: assign id to be the id of the element that got selected
	var row = getRow(ID);
	var col = getCol(ID);

	if (board[row][col] === '-') {
		board[row][col] = player;
		// TODO: add the player to the HTML board too (this is not the same as the 2D array)
		document.getElementById(ID).innerHTML = player;
		
		validInput = true;
		moves += 1;
		player = switchPlayer();
		winner = isWinner();
		validInput = false;

		addMessage("Player " + player + " it is your turn!", "standard");

		if (winner) {
			addMessage("Congratulations, " + switchPlayer() + " you won!", "endgame");
			// TODO: remove the event listener from every spot
			var spot = document.getElementsByClassName("spot")
			for (var i = 0; i < spot.length; i++) {
				spot[i].removeEventListener("click", setSpot);
			}
		} else if (moves === 9) {
			addMessage("You both suck, it's a tie!", "endgame");
		}
	}
}

function addMessage(message, c) {
	var element = document.getElementById("message");
    element.classList.add(c);
    element.innerHTML = message;
}



//---------------------------------------------------------------------------------
// Helpers
//----------------------------------------------------------------------------------
function switchPlayer() {
	if (player === X) {
		return O;
	} else {
		return X;
	}
}


function isWinner() {
	// checks the rows
	for (var row = 0; row < 3; row++) {
		if (board[row][0] != "-" && board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
			return true;
		} 
	}

	// checks the cols 
	for (var col = 0; col < 3; col++) {
		if (board[0][col] != "-" && board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
			return true;
		}
	}

	// check the diagonals
	if (board[0][0] != "-" && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
		return true;
	}

	if (board[0][2] != "-" && board[0][2] === board[1][1] && board[2][0] === board[1][1]) {
		return true;
	}

	return false;
}

function getRow(id) {
	// TODO: given the id (a string, return the row)
	var rowNum = id.substring(0, 1);
	return parseInt(rowNum);
}

function getCol(id) {
	// TODO: given the id (a string, return the col)
	var colNum = id.substring(1, 2);
	return parseInt(colNum);
}







