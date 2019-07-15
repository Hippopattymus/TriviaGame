let correct = 0;
let incorrect = 0;
var push = false;

questions = [
    {
        question:"Who Shot First?",
        answers: ["Han", "Lando", "Chewbacca", "Greedo"],
        correctAnswer: 0
    },
    {
        question:"Best Star Wars Character?",
        answers: ["Anakin", "Darth Bane", "Jar-Jar", "None"],
        correctAnswer: 1
    },
    {
        question:"Worst Star Wars Character?",
        answers: ["Anakin", "Darth Bane", "Jar-Jar", "None"],
        correctAnswer: 0
    },
    {
        question:"Most likely to be a Sith Lord?",
        answers: ["Anakin", "Darth Bane", "Jar-Jar", "All of the Above"],
        correctAnswer: 3
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

$("#start").on("click", function(){
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
    for (var i = 0; i < q.answers.length; i++){
        var answer = $('<button data-position="$(i)">');
        answer.data("position", i);
        answer.addClass("answer");
        answer.appendTo("#answers");
        answer.text(q.answers[i]);

    }

    $(".answer").on("click", function(){
        push = true;
        if ($(this).data("position") == questions[state.currentQ].correctAnswer) {
            console.log("nice");
            state.currentQ++;
            correct++;
            winScreen();
            $("#correct").text("Correct!");
            setTimeout(resetTime, 3*1000);
            setTimeout(displayQ, 3*1000);
        }
        else {
            console.log("incorrect");
        
            incorrect++;
            state.currentQ++;

            winScreen();
            $("#correct").text("Correct Answer: " + q.answers[q.correctAnswer]);
            $("#correct").append("<br> Next Question in 3 seconds");
            setTimeout(resetTime, 3*1000);
            setTimeout(displayQ, 3*1000);
        }
        setTimeout(checkOver, 3*1000);
        
    });
}

function resetTime(){
    state.timeRemaining = 10;
    $("#timeleft").text(state.timeRemaining);
    $("#correct").empty();
    push = false;
    
}
function setRemainingTime(){
    state.timeRemaining--;
    $("#timeleft").text(state.timeRemaining); 
    
    if ((state.timeRemaining == 0) && (push != true)) {
        winScreen();
        $("#correct").text("Out of Time!")
        $("#correct").append("<br> Correct answer was " + questions[state.currentQ].answers[questions[state.currentQ].correctAnswer]);
        state.currentQ++;
        incorrect++;
        setTimeout(displayQ, 3*1000);
        
    }
    
}

function winScreen(){
    $("#timeleft").hide();
    $("#question").hide();
    $("#answers").hide();

}

function checkOver(){
    if (questions.length == (state.currentQ)) {
        $("#timeleft").hide();
        $("#question").hide();
        $("#answers").hide();
        $("#correct").hide();
        $("#win").show();
        $("#win").text("All Done! You answered " + correct + " correctly and " + incorrect + " incorrectly!");
    }

}

