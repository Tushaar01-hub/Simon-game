var buttoncolours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
// $(document).on("keypress click", function () {
//   if (!started) {
//     //$("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });

$(".btn").click(function(){
    var UserChosenColor = $(this).attr("id");
    userClickedPattern.push(UserChosenColor);
  

    playSound(UserChosenColor);
    animatePress(UserChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  // console.log("User clicked pattern length:", userClickedPattern.length);
  // console.log("Expected full pattern length:", gamePattern.length);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    
    startOver();
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + Level);

  var randomnumber = Math.floor(Math.random()*4) ;
  var randomChosenColor = buttoncolours[randomnumber];
  gamePattern.push(randomChosenColor);

  // console.log("Next color:", randomChosenColor);
  // console.log("Full pattern:", gamePattern);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}


function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
