var questions = document.querySelector("#questions");
var answers = document.querySelector("#answers");
var start = document.querySelector("#start");
var score = document.querySelector("#score");
var startpage = document.querySelector("#startpage");
var timer = document.querySelector('#timer');
var i = 0;
var sec = 30;
var scoreforgame = 0;

// hide trivia answers
answers.style.display = "none";



// show score from local storage or display 0
var r = JSON.parse(localStorage.getItem("r")); // r = right
if (r === null) {
    r = 0;
}
var w = JSON.parse(localStorage.getItem("w")); // w = wrong
if (w === null) {
    w = 0;
}

// questions
var questionslist = ['Could i BE wearing anymore clothes?', 'whos fica?'];

// when start button is clicked quiz starts & first question is shown
start.addEventListener("click", function () {
    start.style.display = "none";
    startpage.style.display = "none";
    answers.style.display = "block";
    questions.textContent = questionslist[i];

    // start timer
    countdown()
});

// TIMER
timer.textContent = 'Timer';
function countdown() {
    timer.textContent = 'Time Left: ' + sec + ' Seconds';
    x = setInterval(function () {
        sec--;
        timer.textContent = 'Time Left: ' + sec + ' Seconds';
        // if time runs out show message and end game
        if (sec < 0) {
            clearInterval(x);
            timer.textContent = 'OUT OF TIME!';

        }

        // if all questions are answered stop timer
        if (i === questionslist.length) {
            clearInterval(x);
            // 5 points for every correct answer
            return timer.textContent = "SCORE: " + scoreforgame * 5;
        }



    }, 1000);
}

// addeventlistener to answers to go to next question
answers.addEventListener("click", function (event) {

    // pull selected answer
    var selected = event.target;
    var name = selected.getAttribute("data-name");

    if (i === 0) {
        var correctanswer = "chandler";

    }
    if (i === 1) {
        correctanswer = "rachel";

    }

    if (name === correctanswer) {
        r++;
        scoreforgame++;
        keepscore()
    } else {
        w++;
        // take time off timer for wrong answer
        sec = sec - 5;

        wronganswer()
        keepscore()
    }

    nextquestion()
})

// go to next question
function nextquestion() {
    i++;
    questions.textContent = questionslist[i];
}

// display score
score.textContent = r + " Right & " + w + " Wrong";

// update score and save to local storage
function keepscore() {

    score.textContent = r + " Right & " + w + " Wrong";
    localStorage.setItem("r", r);
    localStorage.setItem("w", w);
}

// flash timer red if answer is wrong and time is deducted
function wronganswer() {
    var redtexttime = 1;
    timer.style.color = 'red';
    y = setInterval(function () {
        redtexttime--;
        if (redtexttime < 0) {
            clearInterval(y);
            timer.style.color = 'black';
        }
    }, 250);
}