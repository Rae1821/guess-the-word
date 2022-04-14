//The unordered list where the player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");

//The button with the text Guess! in it
const button = document.querySelector(".guess");

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
const hiddenButton = document.querySelector(".play-again hide");

const word = "magnolia";
//Display symbols as placeholders for the chose word's letters   

//const placeholder = function (word) {
    const placeholderLetters = [];
        for (const letter of word) {
         console.log(letter);
         placeholderLetters.push("*");
         placeholderLetters.push("●");
    }

wordInProgress.innerText = placeholderLetters.join("");
//};

button.addEventListener("click", function (e) {
    e.preventDefault();
    let inputValue = textInput.value;
    console.log(inputValue);
    textInput.value = " ";
    
});


