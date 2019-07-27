$(document).ready(function () {
    //Standard variables
    var numMinutes = .5;
    var display = $('.timerText');
    // if (numMinutes < 10) {
    //     display.text("Time remaining: " + "0" + numMinutes + ":00");
    // } else {
    //     display.text("Time remaining: " + "0" + numMinutes + ":00");
    // }
    var currentTimer;

    // ----------------------------------------------
    // Question objects

    var questionOne = {
        question: "question one placeholder",
        answers: ["Answer1", "Answer2", "Answer3", "Answer4"],
        correctAnswers: 0
    }
    var questionTwo = {
        question: "question two placeholder",
        answers: ["Answer1", "Answer2", "Answer3", "Answer4"],
        correctAnswers: 1
    }
    var questionThree = {
        question: "question three placeholder",
        answers: ["Answer1", "Answer2", "Answer3", "Answer4"],
        correctAnswers: 2
    }
    var questionFour = {
        question: "question four placeholder",
        answers: ["Answer1", "Answer2", "Answer3", "Answer4"],
        correctAnswers: 3
    }
    var questionFive = {
        question: "question five placeholder",
        answers: ["Answer1", "Answer2", "Answer3", "Answer4"],
        correctAnswers: 0
    }
    var questionsArr = [questionOne, questionTwo, questionThree, questionFour, questionFive];
    var getQuestion = $(".questionSpace");
    var getAnswer1 = $(".answer1");
    var getAnswer2 = $(".answer2");
    var getAnswer3 = $(".answer3");
    var getAnswer4 = $(".answer4");
    var QuestionNum = 0;
    var currentCorrectAnswer;
    //getQuestion.text(questionsArr[0].question);
    loadQuestion();


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
        console.log("is getAnswer1 correct? " + getAnswer1.attr("Correct-Answer"));
        console.log("is getAnswer2 correct? " + getAnswer2.attr("Correct-Answer"));
        console.log("is getAnswer3 correct? " + getAnswer3.attr("Correct-Answer"));
        console.log("is getAnswer4 correct? " + getAnswer4.attr("Correct-Answer"));
    };

    $(".answer").on("click", function () {
        console.log($(this).attr('Correct-Answer'));
        if ($(this).attr('Correct-Answer')) {
            correctAnswer();
        } else {
            incorrectAnswer();
        }
    });


    function startTimer(duration, display) {
        var timer = duration,
            minutes, seconds;
        currentTimer = setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            display.text("Time remaining: " + minutes + ":" + seconds);

            if (--timer < 0) {
                timer = duration;
                incorrectAnswer();
            }
        }, 1000);
    }

    function callTimer(numMinutes) {
        var time = 60 * numMinutes,
            display = $('.timerText');
        startTimer(time, display);
    };

    function stopTimer() {
        display = $('.timerText');
        clearTimeout(currentTimer);
        display.text("Get ready for the next question!");
    };

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
        } else {
            getAnswer1.text("");
            getAnswer2.text("");
            getAnswer3.text("");
            //getAnswer4.text("");
        }
    };

    function correctAnswer() {
        clearAnswerText();
        getQuestion.text("You got it right!");
        QuestionNum++;
        stopTimer();
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
        stopTimer();
        setTimeout(function () {
            loadQuestion();
        }, 2000);
    }



});