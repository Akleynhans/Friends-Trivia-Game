var questions = document.querySelector("#questions");
var answers = document.querySelector("#answers");
var start = document.querySelector("#start");
var score = document.querySelector("#score");
var startpage = document.querySelector("#startpage");
var timer = document.querySelector('#timer');
var highscorepage = document.querySelector('#highscorepage');
var submit = document.querySelector('#button');
var list = document.querySelector('#list');
var i = 0;
var sec = 10;
var scoreforgame = 0;
var highscorelist = [];
var scorestoprint = [];

// hide trivia answers & Highscores
answers.style.display = "none";
highscorepage.style.display = "none";



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
            return timer.textContent = "SCORE: " + scoreforgame * 5;
        }



    }, 1000);
}

// addeventlistener to answers to go to next question
answers.addEventListener("click", function (event) {

    // pull selected answer
    var selected = event.target;
    var name = selected.getAttribute("data-name");

    // right answers to qs
    if (i === 0) {
        var correctanswer = "chandler";

    }
    if (i === 1) {
        correctanswer = "rachel";

    }
    // check if the answer was correct
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

    //    if all questions are answered to to high scores page
    if (i === questionslist.length) {
        highscore()
    }
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

// create new high score when click the submit button
submit.addEventListener("click", function (event) {
    event.preventDefault();

    renderscores()

    // save input
    var person = {
        initials: document.getElementById('initials').value.toUpperCase(),
        score: scoreforgame * 5
    }
    // add scores & initials to an array
    highscorelist.push(person);
    // create stringify array for storagelog
    

    // hide submit button after submitted new score
    submit.style.display = "none";
    
    // add score table to local storage
    localStorage.setItem("highscorelist", JSON.stringify(highscorelist));

    // go through array and create lis
    let index = 0;
    highscorelist.forEach(() => {
    
        let li = document.createElement('LI');
        li.textContent = highscorelist[index].initials + " ... " + highscorelist[index].score;
        
        list.appendChild(li);
        index++;
    return list;
});
})

function highscore() {
    highscorepage.style.display = "block";
    answers.style.display = "none";

}


// calls highscores saved in localstorage
function renderscores () {
    highscorelist = JSON.parse(localStorage.getItem("highscorelist") || "[]");
}
