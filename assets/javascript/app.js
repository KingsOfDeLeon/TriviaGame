$(document).ready(function () {
    //scaler used to get number of minutes. 1 = 60 seconds
    var numMinutes = .25;
    //grabs timer text
    var display = $('.timerText');

    //var used to kill the timer
    var currentTimer;

    // ----------------------------------------------
    // Question objects

    var questionOne = {
        question: "In Ocarina of Time, who is the Sage of Light?",
        answers: ["Zelda", "Rauru", "Sheik", "Ezlo"],
        correctAnswers: 1
    }
    var questionTwo = {
        question: "What is the name of the King of Hyrule the assists Link in The Wind Waker?",
        answers: ["Daltus Gustaf Hyrule", "Harkinian Hyrule", "Nohansen Daltus Hyrule", "Daphnes Nohansen Hyrule"],
        correctAnswers: 3
    }
    var questionThree = {
        question: "Which of the following is NOT an enemy found in Link's Awakening?",
        answers: ["Goomba", "Armos", "Moblin", "Poe"],
        correctAnswers: 3
    }
    var questionFour = {
        question: "From the NES to Skyward Sword, in how many Zelda series games does Link fight Ganon/Ganondorf (not including remakes, rereleases, and the CD-i games).",
        answers: ["6", "7", "8", "9"],
        correctAnswers: 2
    }
    var questionFive = {
        question: "Who is the current producer of The Legend of Zelda series?",
        answers: ["Koji Kondo", "Eiji Aonuma", "Shigeru Miyamoto", "Satoru Iwata"],
        correctAnswers: 1
    }
    //question array
    var questionsArr = [questionOne, questionTwo, questionThree, questionFour, questionFive];
    //grabs html space elements
    var getQuestion = $(".questionSpace");
    var getAnswer1 = $(".answer1");
    var getAnswer2 = $(".answer2");
    var getAnswer3 = $(".answer3");
    var getAnswer4 = $(".answer4");
    //used to iterate through question array
    var QuestionNum = 0;
    //correct answer selector/flag
    var currentCorrectAnswer;
    //score variables
    var numCorrect = 0;
    var numWrong = 0;

    //question load up on page load up
    loadQuestion();

    //loads questions and answers in appropriate space. Also gives the intended answer a correct-answer flag
    function loadQuestion() {
        callTimer(numMinutes);
        getAnswer1.removeAttr("Correct-Answer");
        getAnswer2.removeAttr("Correct-Answer");
        getAnswer3.removeAttr("Correct-Answer");
        getAnswer4.removeAttr("Correct-Answer");
        getQuestion.text(questionsArr[QuestionNum].question);
        getAnswer1.text(questionsArr[QuestionNum].answers[0]);
        getAnswer2.text(questionsArr[QuestionNum].answers[1]);
        getAnswer3.text(questionsArr[QuestionNum].answers[2]);
        getAnswer4.text(questionsArr[QuestionNum].answers[3]);
        currentCorrectAnswer = questionsArr[QuestionNum].correctAnswers;
        if (currentCorrectAnswer === 0) {
            getAnswer1.attr("Correct-Answer", true);
        } else if (currentCorrectAnswer === 1) {
            getAnswer2.attr("Correct-Answer", true);
        } else if (currentCorrectAnswer === 2) {
            getAnswer3.attr("Correct-Answer", true);
        } else {
            getAnswer4.attr("Correct-Answer", true);
        }
        //used for testing/grading
        console.log("is getAnswer1 correct? " + getAnswer1.attr("Correct-Answer"));
        console.log("is getAnswer2 correct? " + getAnswer2.attr("Correct-Answer"));
        console.log("is getAnswer3 correct? " + getAnswer3.attr("Correct-Answer"));
        console.log("is getAnswer4 correct? " + getAnswer4.attr("Correct-Answer"));
    };

    //Click event on answer space only
    $(".answer").on("click", function () {
        console.log($(this).attr('Correct-Answer'));
        if ($(this).attr('Correct-Answer')) {
            //grats, you got the correct answer. Handle appropriately
            correctAnswer();
        } else {
            //you got it wrong. Handle appropriately
            incorrectAnswer();
        }
    });

    //Starts the timer
    function startTimer(duration, display) {
        var timer = duration,
            minutes, seconds;
        //puts timer interval in a variable to be used when timer needs to stop
        currentTimer = setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            //displays timer
            display.text("Time remaining: " + minutes + ":" + seconds);

            if (--timer < 0) {
                //You ran out of time
                timer = duration;
                incorrectAnswer();
            }
        }, 1000);
    }

    //function used to call the timer and grab timer text
    function callTimer(numMinutes) {
        var time = 60 * numMinutes,
            display = $('.timerText');
        startTimer(time, display);
    };
    //kills timer
    function stopTimer() {
        display = $('.timerText');
        clearTimeout(currentTimer);
        display.text("Get ready for the next question!");
    };

    //remove wrong answers
    function clearAnswerText() {
        if (currentCorrectAnswer === 0) {
            //getAnswer1.text("");
            getAnswer2.text("");
            getAnswer3.text("");
            getAnswer4.text("");
        } else if (currentCorrectAnswer === 1) {
            getAnswer1.text("");
            //getAnswer2.text("");
            getAnswer3.text("");
            getAnswer4.text("");
        } else if (currentCorrectAnswer === 2) {
            getAnswer1.text("");
            getAnswer2.text("");
            //getAnswer3.text("");
            getAnswer4.text("");
        } else if (currentCorrectAnswer === 3) {
            getAnswer1.text("");
            getAnswer2.text("");
            getAnswer3.text("");
            //getAnswer4.text("");
        } else {
            //display game over text
            display.text("Thank you for playing!");
            getQuestion.text("Game Over!");
            getAnswer1.text("Hit Refresh If You Want to Try Again.");
            getAnswer2.text("");
            getAnswer3.text("You got " + numCorrect + " right!");
            getAnswer4.text("And  " + numWrong + " wrong!");
        }
    };

    function correctAnswer() {
        clearAnswerText();
        getQuestion.text("You got it right!");
        QuestionNum++;
        numCorrect++;
        stopTimer();
        if (QuestionNum >= questionsArr.length) {
            gameOver();
            //stop game
            return;
        }
        setTimeout(function () {
            loadQuestion();
        }, 2000);
    };

    function incorrectAnswer() {
        clearAnswerText();
        if (currentCorrectAnswer === 0) {
            getQuestion.text("correct answer was " + questionsArr[QuestionNum].answers[0]);
        } else if (currentCorrectAnswer === 1) {
            getQuestion.text("correct answer was " + questionsArr[QuestionNum].answers[1]);
        } else if (currentCorrectAnswer === 2) {
            getQuestion.text("correct answer was " + questionsArr[QuestionNum].answers[2]);
        } else {
            getQuestion.text("correct answer was " + questionsArr[QuestionNum].answers[3]);
        }
        QuestionNum++;
        numWrong++;
        stopTimer();
        if (QuestionNum >= questionsArr.length) {
            gameOver();
            //stop game
            return;
        }
        setTimeout(function () {
            loadQuestion();
        }, 2000);
    };

    function gameOver() {
        //-1 flag needed to get to gameover text
        currentCorrectAnswer = -1;
        clearAnswerText();

    };



});