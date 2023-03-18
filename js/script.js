// Questions

var questions = [
    {
        q: "Who is the father of computer",
        a: "Mark",
        b: "Charles Babbage",
        c: "James",
        d: "Shaun",
        ans: "b",
        opt1: "a",
        opt2: "c"
    },

    {
        q: "Who is the father of Nation",
        a: "Gandhi Ji",
        b: "Raju Ji",
        c: "Ravi Ji",
        d: "Ajay Ji",
        ans: "a",
        opt1: "b",
        opt2: "d"
    },

    {
        q: "Full form of ATM",
        a: "Any Time Money",
        b: "All Time Masti",
        c: "All the Monkeys",
        d: "Automated Teller Machine",
        ans: "d",
        opt1: "a",
        opt2: "b"
    }
];

// On Load
$("#quizBox").hide();
$("#restartQuiz").hide();
$("#next").prop("disabled", "true");

// Variables
var pname = "";
var count = 0;
var currentId = "";
var pts = 0;
var totalQ = questions.length;

// On Pressing Start Quiz
$("#startQuizBtn").click(function (){
    pname = $("#player").val();
    // alert(pname);

    $("#startQuiz").hide();
    $("#quizBox").show(500);

    if (pname !== ""){
        $("#changePlayer").text(pname);
    }

    loadQuestion();
    startTime();
});

// Function that will load question in Quiz Box Div
function loadQuestion(){
    $("#q").text(questions[count].q)    //Que
    $("#a").val(questions[count].a)     // Opt A
    $("#b").val(questions[count].b)     // Opt B
    $("#c").val(questions[count].c)     // Opt C
    $("#d").val(questions[count].d)     // Opt D

    $("#qNo").text("Question No. " + (count+1) + "/" + totalQ)  // Question No.
}

//Validation
$(".opt").click(function (){
    currentId = $(this).attr("id");
    // alert(currentId);

    //If users clicks the right answer
    if(currentId === questions[count].ans){
        $(this).css("background", "green");
        pts++;
        $("#pts").text("Points: " + pts);
    }
    // If user clicks the wrong answer
    else{
        $(this).css("background", "red")
        $("#" + questions[count].ans).css("background", "green").fadeOut().fadeIn();
    }

    // All other buttons should be disabled when a user clicks an option
    $(".opt").prop("disabled", "true");
    $("#next").prop("disabled", "");
})

// Next Button
$("#next").click(function (){
    count++;    // Increase the question count
    $(".opt").css("background", "").prop("disabled", "");    // Bring back button to default style;

    // When the user reaches last question
    if(count >= totalQ){
        $("#quizBox").hide();
        $("#restartQuiz").show();
        $("#finalPts").text("Final Points: " + pts);
    }
    else {
        loadQuestion();
    }
    $("#next").prop("disabled", "true");
})

// Restart Quiz Button
$("#restartQuizBtn").click(function (){
    $("#quizBox").show();
    $("#restartQuiz").hide();
    $("#lifeline").prop("disabled", "");
    reset();    // reset the game
    loadQuestion();     // And then load the last question
    startTime();
})

// Reset Quiz
function reset(){
    count = 0;
    pts = 0;
    clearInterval(quiztime);
    $("#timer").text("00:00");
    $("#pts").text("Points: 0")
    $("#qNo").text("Question No. " + (count+1) + "/" + totalQ)
}

// Timer
// ===========Variables=======
var totalmins=0; // mins given by quiz master
var convertedtosecs=0; //mins converted to secs
var remainingmins=0;
var remainingsecs=0;
var quiztime="";

// ============= start time function===============
function startTime(){
    totalmins=2;
    convertedtosecs=60*totalmins;
    // console.log(convertedtosecs);

    function timer(){
        convertedtosecs--;


        remainingmins=Math.floor(convertedtosecs/60);
        remainingsecs=convertedtosecs%60;

        // Show secs and mins in 09 instead of 9, incase they reach a single digit value
        if(remainingmins<=9 && remainingmins>=0){
            remainingmins="0"+remainingmins;
        }
        if(remainingsecs<=9 && remainingsecs>=0){
            remainingsecs="0"+remainingsecs;
        }

        $("#timer").text(`${remainingmins}:${remainingsecs}`);
        // To prevent timer go into negative value
        if(convertedtosecs===0){
            clearInterval(quiztime);
            $("#quizBox").hide();
            $("#restartQuiz").show();
        }
    }


    quiztime=setInterval(timer,1000);
}

// 50-50 Lifeline

$("#lifeline").click(function (){
    $("#" + questions[count].opt1).val("").prop("disabled", "true");
    $("#" + questions[count].opt2).val("").prop("disabled", "true");
    $(this).prop("disabled", "true");
})

