const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

let time = 30;
let score = 0; //number of correct answers
let currentQuestion;
let timer;

const startBtn = document.querySelector(".start");
const timePerQuestion = document.querySelector("#time");
const quiz = document.querySelector(".quiz");
const startscreen = document.querySelector(".start-screen");

//update the "Progress Bar" value
const progress = (value) => {
    const percentage = (value / time) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.innerHTML = `${value}`;
};

//"Start Quiz" function that runs when a "Quiz" is started
const startQuiz = () => {

    questions = [
        {
            question: "What color is the finishing flag In Formula One? 🏎️",
            answers: ["red", "green", "black", "white and black"],
            correctAnswer: "white and black"
        },
        {
            question: "Which fast food restaurant still boards the slogan 'Have it your way'? &#127839;",
            answers: ["McDonald's &#127839;", "Burger King ", "Papa John's Pizza &#127829;", "Domino's Pizza &#127829;"],
            correctAnswer: "Burger King "
        },
        {
            question: " What was the coffee shop named in the hit TV show Friends? &#9749;",
            answers: ["Friends Cafe", "L'Osteria", "The Odeon", "Central Perk"],
            correctAnswer: "Central Perk"
        },
        {
            question: " Where is the highest building in the world?&#127757;",
            answers: ["USA", "LONDON", "DUBAI", "FRANCE"],
            correctAnswer: "DUBAI"
        },
        {
            question: "This large tower is known for its <i>'tilt.'</i>",
            answers: ["Eiffel Tower", "Fernsehturm Tower", "Empire State Building ", "PISA"],
            correctAnswer: "PISA"
        },

    ];

    // Start screen is hidden, quiz screen is shown
    startscreen.classList.add("hide");
    quiz.classList.remove("hide");
    //Quiz initial values ​​are being adjusted
    currentQuestion = 1;
    // Showing the first question
    showQuestion(questions[0]);
    // An alert is displayed informing the user that the "Quiz" has started.
    alert("Quiz started! Good luck! 😎");
};

startBtn.addEventListener("click", startQuiz);
const submitBtn = document.querySelector(".submit");
const nextBtn = document.querySelector(" .next")


//"showQuestion" function that takes a specific question object (question) and displays this question on the HTML page
const showQuestion = (question) => {

    // We select the necessary elements to display the "question text, answer options and question number" in HTML
    const questionText = document.querySelector(".question");
    const answersWrapper = document.querySelector(".answer-wrapper");
    const questionNumber = document.querySelector(".number");

    // The question text is assigned to the relevant element on the HTML page
    questionText.innerHTML = question.question;

    //Updating the HTML element showing the question number and total number of questions
    questionNumber.innerHTML = `Question <span class="current">${currentQuestion}</span><span class="total">/${questions.length}</span>`;

    // Clearing the answer options
    answersWrapper.innerHTML = '';

    // We create an HTML element for each answer option and fill in its content
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        answerElement.innerHTML = `
      <span class="text">${answer}</span>
      <span class="checkbox">
        <span class="icon">✓</span>
      </span>
    `;
        answersWrapper.appendChild(answerElement);

        // We mark the selected answer by adding a click event to each answer option
        answerElement.addEventListener("click", () => {
            if (!answerElement.classList.contains("selected")) {
                answersWrapper.querySelectorAll('.answer').forEach((ans) => {
                    ans.classList.remove("selected");
                });
                answerElement.classList.add("selected");
                submitBtn.disabled = false;
            }
        });
    });
    // We call the function that starts the time specified for the question
    time = parseInt(timePerQuestion.value);
    startTimer(time);

    // We make the submit button visible every time a question is shown
    submitBtn.style.display = "block";
};

//A "startTimer" function that counts down a specified amount of time and updates a specified "progress bar" as each second passes
const startTimer = (time) => {
    clearInterval(timer); // Reset timer (stop previous timer)

    // Start an interval that performs an operation every 1000 milliseconds (1 second) for the specified duration
    timer = setInterval(() => {
        if (time >= 0) {
            progress(time);// Show elapsed time on the progress bar within the specified period
            time--;// Decrease time
        } else {
            clearInterval(timer); //Stop the timer when the time is up

            showCorrectAnswerAndMoveToNextQuestion();// Perform the actions to be taken when the specified time is completed
        }
    }, 1000);// Run interval every 1000 milliseconds (1 second)
};

/*When a question's answer time expires, it makes the correct answer obvious (by adding the .checked CSS class) and 
automatically moves on to the next question after waiting for a certain period of time.*/
const showCorrectAnswerAndMoveToNextQuestion = () => {
    const correctAnswer = document.querySelector(".answer.correct");//Selects the element that represents the correct answer in HTML.

    if (correctAnswer) {
        correctAnswer.classList.add("checked");//If there is a correct answer, make it obvious by adding the "checked" class.
    }

    /*After a certain period of time (2000 milliseconds, i.e. 2 seconds in this example), 
    it automatically moves to the next question with the nextBtn.click() statement.*/
    setTimeout(() => {
        nextBtn.click();
    }, 2000);
};

//An event listener that runs when the user clicks the "Submit" button after answering a question
submitBtn.addEventListener("click", () => {
    checkAnswer()
});

//Used to show the score when the quiz is completed or at a particular stage.
const showScore = () => {
    clearInterval(timer);

    //Update score
    currentScoreElement.textContent = score;//Points earned so far
    totalScoreElement.textContent = questions.length;//Total number of questions
    const endScreen = document.querySelector(".end-screen");
    endScreen.classList.remove("hide"); // Makes the result screen visible by removing the "hide" class above the selected result screen.

};

//Function to hide the results screen
const hideScore = () => {
    const endScreen = document.querySelector(".end-screen");
    endScreen.classList.add("hide"); // Sonuç ekranını gizle
};


// Moving to the next question here
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion <= questions.length) {
        showQuestion(questions[currentQuestion - 1]);
        hideScore();
    } else {
        endQuiz();//The process in which the quiz ends
    }
});


//If no answer is given, automatically skip to the next question.
const timeIsUp = () => {
    if (!isAnswered()) {
        checkAnswer();
        nextBtn.click();
    }
};

//check if user give any reply
const isAnswered = () => {
    return document.querySelector(".answer.selected") !== null; /*This statement checks if the selected element is null. If the selected element is not null,
   that is, an element is selected, the function returns true.*/
};



//This function checks the answer chosen by the user and then processes the correct and incorrect answers.
const checkAnswer = () => {
    clearInterval(timer);
    const selectedAnswer = document.querySelector(".answer.selected");

    if (selectedAnswer) {
        const answerText = selectedAnswer.querySelector(".text");

        if (answerText.textContent === questions[currentQuestion - 1].correctAnswer) {
            score++;
            selectedAnswer.classList.add("correct");
            setTimeout(() => {
                // After time is up, wait and automatically move on to the next question
                nextBtn.click();
            }, 2000);
        } else {
            selectedAnswer.classList.add("wrong");

            correct_answer = document
                .querySelectorAll(".answer")
                .forEach((answer) => {
                    if (
                        answer.querySelector(".text").innerHTML ===
                        questions[currentQuestion - 1].correctAnswer
                    ) {
                        answer.classList.add("correct");
                        setTimeout(() => {
                            // After time is up, wait and automatically move on to the next question
                            nextBtn.click();
                        }, 2000);
                    }
                });
        }

        submitBtn.disabled = true;
        nextBtn.style.display = "block";
        updateScore(); //Update score
    } else {
        correct_answer = document
            .querySelectorAll(".answer")
            .forEach((answer) => {
                if (
                    answer.querySelector(".text").innerHTML ===
                    questions[currentQuestion - 1].correctAnswer
                ) {
                    answer.classList.add("correct");
                }
            });

        updateScore(); //Update score
    }

    /*After checking the user's answer, it adds a visual markup to the answers to the question and then hides the
     submit button and shows the next question button.*/
    const answerDiv = document.querySelectorAll(".answer");
    answerDiv.forEach((answer) => {
        answer.classList.add("checked");
    });
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
};



const currentScoreElement = document.querySelector(".current-score");
const totalScoreElement = document.querySelector(".total-score");

//Update score
const updateScore = () => {
    currentScoreElement.textContent = score;
};


//Function to show "Quiz Screen"
const showQuizScreen = () => {
    startscreen.classList.add("hide");
    endscreen.classList.add("hide");
    quiz.classList.remove("hide");
    currentQuestion = 1;
    showQuestion(questions[0]);
};

//Function to show the "End Screen"
const showEndScreen = () => {
    startscreen.classList.add("hide");
    quiz.classList.add("hide");
    endscreen.classList.remove("hide");
};

// When the "Start Quiz" button is clicked, it calls the "showQuizScreen" function to start the quiz.
startBtn.addEventListener("click", showQuizScreen);


//Function running when quiz ends
const endQuiz = () => {
    clearInterval(timer);

    const finalScoreElement = document.querySelector(".final-score");
    finalScoreElement.textContent = score;
    const totalScoreElement = document.querySelector(".total-score");
    totalScoreElement.textContent = `/${questions.length}`;
    const endScreen = document.querySelector(".end-screen");
    endScreen.classList.remove("hide");

    showEndScreen();
};

// A "Restart Quiz" button that reloads the page
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
    window.location.reload(); //Used to reload the browser window.
});
























