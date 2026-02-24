//Display Game Title
//Game uses Clicks. Want to modify to use clicks and keyboard
document.getElementById("CompleteThisQuotation").innerHTML = "Complete This Quote";

//virtual keyboard (data-keyboard) from HTML assigned to variable, keyboard. 
// this allows user to make changes to the keyboard
keyboard = document.querySelector("[data-keyboard]");

//create const game object with properties cur,solution, & puzz
const game = { cur: "", solution: "", puzz: [] };

//select page elements & assign them variables for easier access in js code
const puzzle = document.querySelector(".puzzle");

let resolveNextIteration; //variable to store the resolve function of the Promise

// Function to create a Promise that resolves on button click
function waitForButtonClick() { //this function returns a Promise. The resolve function of this...
  // ...Promise is stored in the variable: resolveNextIterartion (declared above)
  //console.log("In waitForButtonClick Function");
  return new Promise(resolve => {
    resolveNextIteration = resolve; // Store the resolve function
  });
}

// Event listener for the button click. When nextIterationBtn is clicked, it...
nextIterationBtn.addEventListener('click', () => {
  //console.log("In nextIterationBtn clicked");

  //remove intro box element styled by CSS
  const elementToRemove = document.querySelector('.my-box');
  if (elementToRemove) {
    elementToRemove.remove();
  }
  if (resolveNextIteration) { //...checks if there resolveNextIteration exists. If it does, it calls resolveNextIteration()...
    resolveNextIteration(); // ...which resolves the Promise when the button is clicked
    resolveNextIteration = null; // Reset the resolver
  }
});

const arrayOfQuotes = [

"Cosimo de' Medici (1389-1464) First of the Medici political dynasty###There is in gardens a plant which one ought to leave dry,<br>although most people %water$ it.<br>It is the weed called envy.",
"Davy Crockett (1786-1836) American explorer, folk hero, and politician###I would rather be politically %dead$<br>than hypocritically immortalized.",
"Dorothy Rothschild Parker (1893-1967) American humorist and writer###You can't teach an old %dogma$ new tricks.",
"Edward Abbey (1927-1989) American writer and advocate of the environment###You can't study the darkness by flooding it with %light$.",
"Eric Hoffer (1902-1983) American philosopher###The most dangerous people in a society are not the %poor$<br>and desperate but the well-off and bored."


];


runLoopWithPause();

//Asynchronous function to execute loop with a pause
async function runLoopWithPause() {
 

  for (let q = 0; q < arrayOfQuotes.length; q++) { //iterate thru every quote
    //console.log("loop number: " + q);
    await waitForButtonClick();

    //clear previous quote data
    document.getElementById("BeginGamePrompt").innerHTML = "";
    document.getElementById("fullQuoteWithTargetWord").innerHTML = "";
    document.getElementById("congratsMsg").innerHTML = "";
    //console.log("loop completed");

    quoteLine = arrayOfQuotes[q];

    //get author's bio
    let endOfBio = quoteLine.indexOf("###");//end marker of biography of author
    let authorsBio = quoteLine.substring(0, endOfBio);

    //get target word(answer)
    let startMarkOfTargetWord = quoteLine.indexOf("%");//% in front of the target word
    let endOfTargetWord = quoteLine.indexOf("$");//$ is just after the target word
    window.targetWord = quoteLine.substring(startMarkOfTargetWord + 1, endOfTargetWord);//GLOBAL Variable of word to guess
    window.targetWordLowerCase = targetWord.toLowerCase(); //make string lower case
    window.arrayAnswer = [""]; //will be == to window.targetWord when all the correct letters are entered

    //create blanks
    window.targetWordLength = targetWord.length;
    let blanks = "";
    for (i = 0; i <= targetWordLength - 1; i++) {
      blanks = blanks + " _ ";
    }

    //get string pre and post of the target word & concat w/blanks       
    let endOfSentence = 0;
    let preTargetWordLine = quoteLine.substring(endOfBio + 3, startMarkOfTargetWord - 1);//between the ### and the %
    //console.log(preTargetWordLine + "is the preTargetWord");

    //Will be the case caused by the target word being the 1st word of the quotation
    const firstChar = preTargetWordLine.charAt(0);
    if (firstChar === "#") {
      preTargetWordLine = "";
    }

    //concat preTargetWordLine with blanks
    let preTargetWordLineWithBlanks = preTargetWordLine.concat(blanks);//concat with blanks

    //get string post target word
    endOfSentence = quoteLine.length;
    let postTargetLine = quoteLine.substring(endOfTargetWord + 1, endOfSentence); //after the $ to quote's end
    //console.log(postTargetLine);

    //full quote with the blanks
    let fullQuoteWithBlanks = preTargetWordLineWithBlanks + postTargetLine;
    //console.log("fullQuoteWithBlanks: " + fullQuoteWithBlanks);

    //make compatible with html for output
    document.getElementById("fullQuoteWithBlanks").innerHTML = fullQuoteWithBlanks;
    document.getElementById("authorsBio").innerHTML = authorsBio;


    //full quote with targetWord
    window.fullQuoteWithTargetWord = preTargetWordLine + " " + targetWord + " " + postTargetLine;
    //console.log(fullQuoteWithTargetWord);

    //clear puzzle array & set cur(current word)
    game.puzz = [];
    game.cur = targetWordLowerCase;  //targetWord in lower case is assigned as game.cur
    game.solution = game.cur.split(""); //targetWord(game.cur) is made an array of individual letters

    buildPuzzleArray(); //call function to create puzzle (puzz) array
    startInteraction(); // call function to add eventListener(s)

    function createElements(elType, parentEl, output) {
      const temp = document.createElement(elType);  //create element div & assign it to variable temp
      temp.classList.add("box"); //create css .class box
      parentEl.append(temp); //append temp to its parent, puzzle
      temp.textContent = output; //set the textContent to "_"
      return temp;
    }

    function buildPuzzleArray() {
      puzzle.innerHTML = "";
      //iterate thru solution array generating an element of div for each char
      game.solution.forEach((lett) => {
        let div = createElements("div", puzzle, "_", "box"); //forEach char in solution array, output a box w/ "_" using createElements().
        game.puzz.push(div);//push each new element to the end of game.puzz array
      });
    }

    function startInteraction() {
      document.addEventListener("click", handleMouseClick);
      document.addEventListener('keydown', handleKeydown);
    }


    function handleMouseClick(e) {
      //console.log("In handleMouseClick: " + e.target);
      if (e.target.matches("[data-key]")) { //if clicked key matches any of the data-keys in html listing
        checkKey(e.target.dataset.key);
        console.log("e.target.dataset.key is: " + e.target.dataset.key);
      }
      return;
    }

    function handleKeydown(event) {
      const pressedKey = event.key;
      //console.log("pressedKey value is: " + pressedKey);
      let charCode = pressedKey.charCodeAt(0);//ASCII code of first character entered
      let inputChar = "";

      if (charCode >= 97 && charCode <= 122) { //if lowercase letter,
        inputChar = String.fromCharCode(charCode); //convert charCode to string
        checkKey(inputChar);
      } else if (charCode >= 65 && charCode <= 90) { //if uppercase,
        charCode = charCode + 32;  // convert upper to lowercase
        inputChar = String.fromCharCode(charCode); //convert charCode to string
        checkKey(inputChar);
      } else if (charCode == 39) { //ascii value for apostrophe
        inputChar = String.fromCharCode(charCode);
        checkKey(inputChar);
      }
    }

    function checkKey(keyEntered) {
      const letterEntered = keyEntered;
      //console.log("key clicked was: " + letterEntered);
      const key = keyboard.querySelector(`[data-key="${letterEntered}"i]`);

      if (game.cur.includes(letterEntered)) {
        key.classList.add("correct");
        //console.log("correct letter clicked: " + letterEntered);
      }
      else {
        key.classList.add("wrong");
        //console.log("wrong letter clicked: " + letterEntered);
      }

      //update puzzle boxes using correct letter
      for (i = 0; i <= targetWordLength; i++) {
        if (game.solution[i] === letterEntered) {// if game.solution[i] === letterEntered ...
          //console.log("game.solution letter is: " + game.solution[i]);
          game.puzz[i].textContent = letterEntered;  //...character is displayed in browser &
          arrayAnswer[i] = letterEntered; //...arrayAnswer index[i] is assigned the character
          if (window.arrayAnswer.join("") === targetWordLowerCase) {
            //Remove the event listener as condition is met)
            document.removeEventListener("click", handleMouseClick);
            document.removeEventListener('keydown', handleKeydown);
            //console.log("THEY MATCH!!!!" + q); //if strings match, then all chars are assigned
            if ((q + 1) === arrayOfQuotes.length) {
              const btn = document.querySelector("#nextIterationBtn");
              btn.style.display = 'none';
              document.getElementById("ThanksForPlaying").innerHTML = "Thanks For Playing. Five new quotes coming tommorow!<br> Send comments to quotetalk@mail.com";
            } // all quotes have been played 

            displayCongrats(fullQuoteWithTargetWord);

          } //end of if (window.arrayAnswer.join("") === targetWordLowerCase)
        } //end of if letterEntered is in game.solution[i] spot
      } //end of FOR loop
    } //end of checkKey function updating puzzle boxes

    //Congrats Msg 
    function displayCongrats(successQuote) {
      //console.log("in displayCongrats function for loop: " + (q));
      //console.log(successQuote);
      document.getElementById("fullQuoteWithBlanks").innerHTML = "";
      document.getElementById("congratsMsg").innerHTML = "Congratulations!";
      document.getElementById("fullQuoteWithTargetWord").innerHTML = fullQuoteWithTargetWord;
      resetKeyboard();
    }
    waitForButtonClick();
  } //end of for loop q iterating thru every quote

  //console.log("FOR LOOP END");

}//end of async function runLoopWithPause()

//function to remove green or dark grey from key style colors
function restoreKeyStyle(keyToRestore) {
  if (keyToRestore.classList.contains('correct')) {
    keyToRestore.classList.remove('correct');
  }
  else if (keyToRestore.classList.contains('wrong')) {
    keyToRestore.classList.remove('wrong');
  }
}//end of restoreKeyStyle function

function resetKeyboard() { //select each virtual key button to restor any style changes
  let keyQ = keyboard.querySelector(`[data-key="q"]`);
  restoreKeyStyle(keyQ);
  let keyW = keyboard.querySelector(`[data-key="w"]`);
  restoreKeyStyle(keyW);
  let keyE = keyboard.querySelector(`[data-key="e"]`);
  restoreKeyStyle(keyE);
  let keyR = keyboard.querySelector(`[data-key="r"]`);
  restoreKeyStyle(keyR);
  let keyT = keyboard.querySelector(`[data-key="t"]`);
  restoreKeyStyle(keyT);
  let keyY = keyboard.querySelector(`[data-key="y"]`);
  restoreKeyStyle(keyY);
  let keyU = keyboard.querySelector(`[data-key="u"]`);
  restoreKeyStyle(keyU);
  let keyI = keyboard.querySelector(`[data-key="i"]`);
  restoreKeyStyle(keyI);
  let keyO = keyboard.querySelector(`[data-key="o"]`);
  restoreKeyStyle(keyO);
  let keyP = keyboard.querySelector(`[data-key="p"]`);
  restoreKeyStyle(keyP);

  let keyA = keyboard.querySelector(`[data-key="a"]`);
  restoreKeyStyle(keyA);
  let keyS = keyboard.querySelector(`[data-key="s"]`);
  restoreKeyStyle(keyS);
  let keyD = keyboard.querySelector(`[data-key="d"]`);
  restoreKeyStyle(keyD);
  let keyF = keyboard.querySelector(`[data-key="f"]`);
  restoreKeyStyle(keyF);
  let keyG = keyboard.querySelector(`[data-key="g"]`);
  restoreKeyStyle(keyG);
  let keyH = keyboard.querySelector(`[data-key="h"]`);
  restoreKeyStyle(keyH);
  let keyJ = keyboard.querySelector(`[data-key="j"]`);
  restoreKeyStyle(keyJ);
  let keyK = keyboard.querySelector(`[data-key="k"]`);
  restoreKeyStyle(keyK);
  let keyL = keyboard.querySelector(`[data-key="l"]`);
  restoreKeyStyle(keyL);

  let keyZ = keyboard.querySelector(`[data-key="z"]`);
  restoreKeyStyle(keyZ);
  let keyX = keyboard.querySelector(`[data-key="x"]`);
  restoreKeyStyle(keyX);
  let keyC = keyboard.querySelector(`[data-key="c"]`);
  restoreKeyStyle(keyC);
  let keyV = keyboard.querySelector(`[data-key="v"]`);
  restoreKeyStyle(keyV);
  let keyB = keyboard.querySelector(`[data-key="b"]`);
  restoreKeyStyle(keyB);
  let keyN = keyboard.querySelector(`[data-key="n"]`);
  restoreKeyStyle(keyN);
  let keyM = keyboard.querySelector(`[data-key="m"]`);
  restoreKeyStyle(keyM);
  let keyApostrophe = keyboard.querySelector(`[data-key="'"]`);
  restoreKeyStyle(keyApostrophe);

} //end of resetKeyboard function

