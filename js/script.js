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

let word = "magnet";

let guessedLetters = [];

//Use let instead of const because the value of remainingGuesses will change over time
let remainingGuesses = 8;


//Function to get data from a text file & grab a random word
const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const wordData = await res.text();
    const wordDataArray = wordData.split("\n");
    const randomIndex = Math.floor(Math.random() * wordDataArray.length);
    word = wordDataArray[randomIndex].trim();
    placeholder(word);

};

getWord();


//Function to display symbols as placeholders for the chosen word's letters   
const placeholder = function (word) {
    let placeholderLetters = [];
        for (const letter of word) {   
         console.log(letter);
            placeholderLetters.push("●");
        }

    wordInProgress.innerText = placeholderLetters.join("");
};


//Click function for button
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
       console.log(guessedLetters);
        //Call the countRemainingGuesses function to update the remaining guesses and pass it the letter that the player guessed as an argument.
        countRemainingGuesses(guess);
         //Call the showGuessedLetters function so the letter displays when it hasn't been guessed before.
         showGuessedLetters();
        //Updates the circles to the letters guessed
       updateWordInProgress(guessedLetters);

    } 
};

//Function to show guessed letters
const showGuessedLetters = function () {
    //Empy the unordered list where letters will display
    listOfLetters.innerHTML = "";
    //Create a new list item for each letter in the guessedLetters array
   for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    //Add the item to the unordered list
    listOfLetters.append(li);
   }
};
    

//Function to Update the word in progress
const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    //Create a variable to split the word string into an array so that the letter can appear in the guessed letters array
    const wordArray = wordUpper.split("");
    const updateCharacters = [];
   //Check if the wordArray contains any letters from the guessedLetters array. If they do then create a new array
   for (const letter of wordArray) {
       if (guessedLetters.includes(letter)) {
           updateCharacters.push(letter.toUpperCase());
       } else {
           updateCharacters.push("●");
       }
   }
   //Use join() to to update the empty paragraph where the word in progress will appear
   wordInProgress.innerText = updateCharacters.join("");
   guessIsCorrect();
};

//function to count guesses remaining
const countRemainingGuesses = function(guess) {
    const guessedWord = word.toUpperCase();
    if (!guessedWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yippee you got a letter! ${guess}`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game Over! The word was <span class="highlight">${word}</span>`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
   
};

    

//Function to check if the player won
const guessIsCorrect = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add(".win");
        message.innerHTML = `<p class="highlight"> You guessed the correct word! Congrats!</p>`;
        startOver();
    }
    
};


const startOver = function () {
    button.classList.add("hide");
    remaining.classList.add("hide");
    listOfLetters.classList.add("hide");

    hiddenButton.classList.remove("hide");
    hiddenButton.classList.add("show");
};

hiddenButton.addEventListener("click", function () {
    message.classList.remove(".win");
    message.innerHTML = " ";
    listOfLetters.innerHTML = " ";

    remainingGuesses = 6;
    remaining.innerHTML = `You have <span>${remainingGuesses}</span> guesses remaining.`;
    guessedLetters = [];

    button.classList.remove("hide");
    remaining.classList.remove("hide");
    listOfLetters.classList.remove("hide");
    hiddenButton.classList.add("hide");
    getWord();
});