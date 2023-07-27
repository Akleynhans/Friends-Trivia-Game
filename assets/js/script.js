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
var sec = 120;
var r = 0;
var highscorelist = [];

// hide trivia answers & Highscores
answers.style.display = "none";
highscorepage.style.display = "none";


// questions
var questionslist = ["Who said: 'If he doesn't like you this is all a moo point. ... Yeah, it's like a cow's opinion. It just doesn't matter. It's moo. ?'", "Who said: 'Gum would be perfection.'?", "Who said: 'Pivot! Pivot! Pivot! Pivot. Pivot. Pivot.'?", "Who said: 'That's right, I stepped up! She's my friend and she needed help. If I had to, I'd pee on any one of you!'?", "Who said: 'Seven!🖐✌'?", "Who said: 'My eyes. MY EYES!'?", "Who said: 'You hung up on the pizza place?! I don't hang up on your friends..'?", "Who said: 'I'm not great at the advice. Can I interest you in a sarcastic comment?'?", "Who said: 'I'm gonna go out on a limb and say no divorces in '99!'?", "Who said: 'Oh, I wish I could, but I don't want to.'?", "Who said: 'Isn't that just kick-you-in-the-crotch, spit-on-your-neck fantastic?'?", "Who said: 'Welcome to the real world. It sucks. You're gonna love it.'?"];

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
            questions.style.display = "none";
            highscore()

        }

        // if all questions are answered stop timer
        if (i === questionslist.length) {
            clearInterval(x);
            return timer.textContent = "SCORE: " + r * 5;
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
        var correctanswer = "joey";

    }
    if (i === 1) {
        correctanswer = "chandler";

    }
    if (i === 2) {
        correctanswer = "ross";

    }
    if (i === 3) {
        correctanswer = "joey";

    }
    if (i === 4) {
        correctanswer = "monica";

    }
    if (i === 5) {
        correctanswer = "phoebe";

    }
    if (i === 6) {
        correctanswer = "joey";

    }
    if (i === 7) {
        correctanswer = "chandler";

    }
    if (i === 8) {
        correctanswer = "ross";

    }
    if (i === 9) {
        correctanswer = "phoebe";

    }
    if (i === 10) {
        correctanswer = "rachel";

    }
    if (i === 11) {
        correctanswer = "monica";

    }
    // check if the answer was correct
    if (name === correctanswer) {
        r++;
        keepscore()
    } else {
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
score.textContent = r + " Answers Right";

// update score and save to local storage
function keepscore() {

    score.textContent = r + " Answers Right";
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
        score: r * 5
    }
    // add scores & initials to an array
    highscorelist.push(person);

    // hide submit button after submitted new score
    submit.style.display = "none";
    
    // add score table to local storage
    localStorage.setItem("highscorelist", JSON.stringify(highscorelist));
    
    // sort highscores from highest to lowest
    const sortedScores = highscorelist.sort((p1, p2) => (p1.score < p2.score) ? 1 : (p1.score > p2.score) ? -1 : 0);

    // go through array and create lis
    let index = 0;
    sortedScores.forEach(() => {

        let li = document.createElement('LI');
        li.textContent = sortedScores[index].initials + " ... " + sortedScores[index].score;

        list.appendChild(li);
        index++;
    });
})

function highscore() {
    highscorepage.style.display = "block";
    answers.style.display = "none";


}


// calls highscores saved in localstorage
function renderscores() {
    highscorelist = JSON.parse(localStorage.getItem("highscorelist") || "[]");
}
