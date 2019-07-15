let correct = 0;
let incorrect = 0;
var push = false;

questions = [
    {
        question: "Q1: Who Shot First?",
        answers: ["Han", "Lando", "Chewbacca", "Greedo"],
        correctAnswer: 0
    },
    {
        question: "Q2: Best Star Wars Character?",
        answers: ["Anakin", "Darth Bane", "Jar-Jar", "None"],
        correctAnswer: 1
    },
    {
        question: "Q3: Worst Star Wars Character?",
        answers: ["Anakin", "Darth Bane", "Jar-Jar", "None; They're All Amazing"],
        correctAnswer: 0
    },
    {
        question: "Q4: Most likely to be a Sith Lord?",
        answers: ["Anakin", "Darth Bane", "Jar-Jar", "All of the Above"],
        correctAnswer: 3
    },
    {
        question: "Q5: Least likely to be influenced by the Dark Side?",
        answers: ["Padme", "Leia", "BB-8", "Lando"],
        correctAnswer: 2
    },
    {
        question: "Q6: Why Does Kylo's Lightsaber look the way it does?",
        answers: ["Aesthetics brah", "He's An Edgelord", "To Vent Excess Heat"],
        correctAnswer: 2
    },
];


var state = {
    currentQ: 0,
    userGuess: null,
    timeRemaining: 10
};
$("#timeleft").hide();
$("#question").hide();
$("#answers").hide();
$("#restart").hide();

$("#start").on("click", function () {
    $("#start").hide();
    displayQ();
    setInterval(setRemainingTime, 1000);
});

function displayQ() {
    $("#win").empty();
    $("#timeleft").show();
    $("#question").show();
    $("#answers").show();
    checkOver();
    console.log(correct);

    var q = questions[state.currentQ];

    $("#question").text(q.question);
    resetTime();
    $("#answers").empty();
    for (var i = 0; i < q.answers.length; i++) {
        var answer = $('<button data-position="$(i)">');
        answer.data("position", i);
        answer.addClass("answer");
        answer.appendTo("#answers");
        answer.text(q.answers[i]);

    }

    $(".answer").on("click", function () {
        push = true;
        if ($(this).data("position") == questions[state.currentQ].correctAnswer) {
            console.log("nice");
            state.currentQ++;
            correct++;
            winScreen();
            $("#correct").text("Correct!");
            $("#correct").append("<br> Next Question in 3 seconds");
            setTimeout(resetTime, 3 * 1000);
            setTimeout(displayQ, 3 * 1000);
        }
        else {
            console.log("incorrect");

            incorrect++;
            state.currentQ++;

            winScreen();
            $("#correct").text("The Correct Answer was " + q.answers[q.correctAnswer]);
            $("#correct").append("<br> Next Question in 3 seconds");
            setTimeout(resetTime, 3 * 1000);
            setTimeout(displayQ, 3 * 1000);
        }
        setTimeout(checkOver, 3 * 1000);

    });
}

function resetTime() {
    state.timeRemaining = 10;
    $("#timeleft").text("Time Left: " + state.timeRemaining);
    $("#correct").empty();
    push = false;

}
function setRemainingTime() {
    state.timeRemaining--;
    $("#timeleft").text("Time Left: " + state.timeRemaining);

    if ((state.timeRemaining == 0) && (push != true)) {
        winScreen();
        $("#correct").text("Out of Time!")
        $("#correct").append("<br> Correct answer was " + questions[state.currentQ].answers[questions[state.currentQ].correctAnswer]);
        state.currentQ++;
        incorrect++;
        setTimeout(displayQ, 3 * 1000);
    }
}

function winScreen() {
    $("#timeleft").hide();
    $("#question").hide();
    $("#answers").hide();

}

function checkOver() {
    if (questions.length == (state.currentQ)) {
        $("#timeleft").hide();
        $("#question").hide();
        $("#answers").hide();
        $("#correct").hide();
        $("#win").show();

        $("#win").text("All Done! You answered " + correct + " correctly and " + incorrect + " incorrectly!");
        $("#win").append("<br> Play again?");

        $("#restart").show();
        $("#restart").click(function () {
            location.reload(true);
        });
    }

}

