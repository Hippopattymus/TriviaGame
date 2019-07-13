let correct = 0;
let incorrect = 0;


questions = [
    {
        question:"What is your fav pet name?",
        answers: ["Rex", "Bob", "Ross", "no"],
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

function displayQ() {
    console.log(correct);
    if (questions.length > state.currentQ) {
        $("#timeleft").hide();
        $("#correct").hide();
        $("#questions").hide();
        $("#correct").text("You Win!")
    }
    var q = questions[state.currentQ];
    $("#correct").empty();
    $("#question").text(q.question);
    resetTime();
    $("#answers").empty();
    for (var i = 0; i < q.answers.length; i++){
        var answer = $('<h1 data-position="$(i)">');
        answer.data("position", i);
        answer.addClass("answer");
        answer.appendTo("#answers");
        answer.text(q.answers[i]);

    }

    
    
    
    
    $(".answer").on("click", function(){
        if ($(this).data("position") == questions[state.currentQ].correctAnswer) {
            console.log("nice");
            state.currentQ++;
            correct++;
            $("#correct").text("Correct!");

            setTimeout(resetTime, 3*1000);
            setTimeout(displayQ, 3*1000);
        }
        else {
            console.log("incorrect");
            
            $("#correct").text("Correct Answer: " + q.answers[q.correctAnswer]);
            
            incorrect++;
            state.currentQ++;

            setTimeout(resetTime, 3*1000);
            setTimeout(displayQ, 3*1000);
        }

        
    });
}

function resetTime(){
    state.timeRemaining = 10;
    $("#timeleft").text(state.timeRemaining);
    
}
function setRemainingTime(){
    state.timeRemaining--;
    $("#timeleft").text(state.timeRemaining); 
    
    if (state.timeRemaining == 0) {
        $("#timeleft").text("Out of Time!")
        state.timeRemaining = 10;
        state.currentQ++;
        incorrect++;
        setTimeout(displayQ, 3*1000);
        
    }
    
}
displayQ();
setInterval(setRemainingTime, 1000);
