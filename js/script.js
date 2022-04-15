//The unordered list where the player's guessed letters will appear
const listOfLetters = document.querySelector(".guessed-letters");

//The button with the text Guess! in it
const button = document.querySelector(".guess");

const form = document.querySelector("form");

//The text input where the player will guess a letter
const textInput = document.querySelector(".letter");

//The empty paragraph where the word in progress will display
const wordInProgress = document.querySelector(".word-in-progress");

//The paragraph where the remaining guesses will display
const remaining = document.querySelector(".remaining")

//The span inside the paragraph where the remaining guesses will display
const remainingSpan = document.querySelector(".remaining span");

//The empty paragraph where the messages will appear when the player guesses a letter.
const message = document.querySelector(".message");

//The hidden button that will appear prompting the player to play again
const hiddenButton = document.querySelector(".play-again");

const word = "magnolia";

const guessedLetters = [];

//Display symbols as placeholders for the chose word's letters   
const placeholder = function (word) {
    const placeholderLetters = [];
        for (const letter of word) {   
         console.log(letter);
            placeholderLetters.push("●");
        }

    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

button.addEventListener("click", function (e) {
    e.preventDefault();
    //Empty message paragraph
    message.innerText = "";
    //Grab what was entered in the input
    const guess = textInput.value;
    //Make sure it's a single letter
    const goodGuess = validateInput(guess);
   
    if(goodGuess) {
        //We've got a letter! Let's guess
    makeGuess(guess);
    }
    textInput.value = "";
});  



//Function to check players input
const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {
            //Is the input empty?
      message.innerText = "Please enter a letter from A to Z";
    } else if (input.length > 1) {
             //Did you type more than one letter?
      message.innerText =  "You can only guess one letter at a time";
    } else if (!input.match(acceptedLetter)) {
             //Did you type a number, special character, or some other non letter thing?
      message.innerText = "That is not a letter. Try again";
    } else {
             //We finally got a single letter, omg yay
             return input;
         }
    };

    //Function to capture Input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();

    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter silly. Try again";
    } else {
        guessedLetters.push(guess);
    }   console.log(guessedLetters);
};


const addToGuessedLetters = function () {
    const li = document.createElement("li");
    for (let letter of guessedLetters) {
        const liContents = `<li>${letter}</li>`;
        li.innerHTML = liContents;
        guessedLetters.append(li);
    } console.log(guessedLetters);
};

addToGuessedLetters(textInput);

