console.log("Game Running!");
var main = document.getElementById("mainId");
var startbtn = document.getElementById("startBtn");
var contentDiv = document.getElementById("contentDiv");
var title = document.getElementById("title");
var subTitle = document.getElementById("subTitle");
startbtn.addEventListener("click", startGame);
contentDiv.setAttribute("id", "hide");
var counter = 1;
var score = 0;

// running game
function startGame() {
  // create element Div
  var elementDiv = document.createElement("div");
  elementDiv.setAttribute("id", "elementDiv");
  contentDiv.appendChild(elementDiv);

  // run func
  startbtn.setAttribute("id", "hide");
  title.setAttribute("id", "hide");
  subTitle.setAttribute("id", "hide");
  contentDiv.removeAttribute("id");
  var randomNum = randomNumber();
  createScore(elementDiv);
  createQuestions(randomNum, elementDiv);
  createBtns(randomNum, elementDiv);
  counter++;
}


// create Question
function createQuestions(randomNum, elementDiv) {
  var questionHeading = document.createElement("h1");
  questionHeading.setAttribute("id", "questionHeading");
  elementDiv.appendChild(questionHeading);
  questionHeading.innerHTML = `${counter}. ` + questionArray[randomNum].questionString;
}

// create buttons
function createBtns(randomNum, elementDiv) {
  var questionAnswersLength = questionArray[randomNum].answers.length;
  var correctAnswer = questionArray[randomNum].correctAnswer;

  // create btns
  for (let i = 0; i < questionAnswersLength; i++) {
    var questionAnswersVal = questionArray[randomNum].answers[i];
    var btns = document.createElement("button");
    btns.setAttribute("id", "qBtns");
    elementDiv.appendChild(btns);
    btns.innerHTML = questionAnswersVal;
    btns.addEventListener("click", (event) => checkIfCorrect(event, correctAnswer, elementDiv)
    );
  }
}

// create Question
function createScore(elementDiv) {
  var scoreHeading = document.createElement("h1");
  scoreHeading.setAttribute("id", "scoreHeading");
  elementDiv.appendChild(scoreHeading);
  scoreHeading.innerHTML = `score, ${score}`;
}

// check If Buttons Correct
function checkIfCorrect(event, correctAnswer, elementDiv) {
  var buttonClickedVal = event.target.innerHTML;
  console.log(score);

  // remove last elements
  elementDiv.remove();

  // check If Buttons Correct
  if (buttonClickedVal === correctAnswer) {
    // correct !
    score += 100;
    correct();

    if (counter === 2) {
      gameOver();
      return;
    }
    setTimeout(function () {
      startGame();
    }, 1500);
    console.log("correct");
  } else {
    // wrong !
    score -= 100;
    wrong();

    if (counter === 2) {
      gameOver();
      return;
    }
    setTimeout(function () {
      startGame();
    }, 1500);
    console.log("wrong!");
  }
}

// correct !
function correct() {
  main.setAttribute("id", "correct");
  var correct = document.createElement("h1");
  correct.setAttribute("id", "correct");
  main.appendChild(correct);
  correct.innerHTML = "CORRECT! +100";

  setTimeout(function () {
    main.removeAttribute("id"), correct.remove();
  }, 1450);
}

// wrong !
function wrong() {
  main.setAttribute("id", "wrong");
  main.setAttribute("id", "wrong");
  var wrong = document.createElement("h1");
  wrong.setAttribute("id", "wrong");
  main.appendChild(wrong);
  wrong.innerHTML = "WRONG! -100";

  setTimeout(function () {
    main.removeAttribute("id"), wrong.remove();
  }, 1450);
}

// game over !
function gameOver() {
  contentDiv.remove();
  console.log(`gameover score, ${score}`);

  // create container
  var endPage = document.createElement("div");
  endPage.setAttribute("id", "endPage");
  setTimeout(function () {
    main.appendChild(endPage);
  }, 1450);

  // create end page elements
  var scoreHeading = document.createElement("h1");
  scoreHeading.setAttribute("id", "scoreHeading");
  endPage.appendChild(scoreHeading);
  scoreHeading.innerHTML = `your score was, ${score}`;

  // create heading
  var endingHeading = document.createElement("h1");
  endingHeading.setAttribute("id", "endingHeading");
  endPage.appendChild(endingHeading);
  endingHeading.innerHTML = "That was a great game. Care for another? click the button down bellow!";

  // create next button
  var nextBtn = document.createElement("button");
  nextBtn.setAttribute("id", "nextBtn");
  endPage.appendChild(nextBtn);
  nextBtn.innerHTML = "play again?";
  nextBtn.addEventListener("click", () => next());
}

// next BTN
function next() {
  endPage.remove();
}

// questionArray
var questionArray = [
  {
    questionString: "What animal is Rigby?",
    answers: ["Bear", "Racoon", "Rat"],
    correctAnswer: "Racoon"
  },
  {
    questionString:"Does Mordecia and Rigby always sit in the same spot at the coffee shop?",
    answers: ["No", "Yes"],
    correctAnswer: "Yes"
  },
  {
    questionString: "What is the name of the first episode in REGULAR SHOW?",
    answers: ["Green day", "The Power", "First day", "Pilot"],
    correctAnswer: "The Power"
  },
  {
    questionString:"What was the name of the movie that gave Rigby nightmares?",
    answers: [`Ello Gov'nor`, "It", "Rocky 4"],
    correctAnswer: `Ello Gov'nor`
  },
  {
    questionString:'What is the object that "Destroyer of Worlds" drops when it is defeated?',
    answers: ["Pringles", "Sprinkels", "Cherries", "kit cat"],
    correctAnswer: "Cherries"
  },
  {
    questionString: "What element does Snowballs the Ice Monster breathe?",
    answers: ["Fire", "Ice", "water"],
    correctAnswer: "Fire"
  },
  {
    questionString: "What is Margrets dads proffesion",
    answers: ["Father comes first", "Helicopter pilot", "Unemployed", "Doctor"],
    correctAnswer: "Helicopter pilot"
  }
];

// random number
function randomNumber() {
  return Math.floor(Math.random() * questionArray.length);
}
