var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var userChosenColor;

var started = false;
var level = 0;


// start the game by pressing
$(document).keydown(() => {   
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence(); 
        started = true;
    }
    console.log("started? ", started);
});

// click, Store USER sequence CHOICE
$(".btn").click(function(Event){
    userChosenColor = Event.currentTarget.id;

    soundEffect(userChosenColor);
    animatePress(userChosenColor);

    userClickedPattern.push(userChosenColor);
    console.log("userClickedPattern: " ,userClickedPattern);
    
    if(started) cmpSequence(userClickedPattern.length);
});

// generate next color, add to new pattern,
// flash and play sound
function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNum = Math.floor(Math.random() *4);
    // console.log("Random Num is: " + randomNum);
    var randomChoseColor = buttonColor[randomNum];
    gamePattern.push(randomChoseColor);
    // effect
    $("#"+randomChoseColor).fadeOut(300).fadeIn(300);
    soundEffect(randomChoseColor);

    console.log("gamePattern: ", gamePattern);
}

function cmpSequence(count) {

    if(gamePattern[count-1] === userChosenColor){
        if (gamePattern.toString() === userClickedPattern.toString()) {
            userClickedPattern = [];
            nextSequence();
        }    
    }
    else {
        
        $("#level-title").text("GAME OVER! PRESS A KEY TO RESTART!");
        $("body").addClass("game-over");
        setTimeout(()=> $("body").removeClass("game-over"),100);
        soundEffect("wrong");
        
        // reset
        started = false;
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
    }
}

// play color sound
function soundEffect(color) {
    if (buttonColor.includes(color)){
        var audio = new Audio("sounds/" + color + ".mp3");
        audio.play();
    }else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
    }   
}

// button shader
function animatePress(color) {
        $("#"+color).addClass("pressed");
        setTimeout(() => $(".btn").removeClass("pressed"),100);
}








// $(document).keypress(function() {
//     if (!started) {
//       $("#level-title").text("Level " + level);
//       nextSequence();
//       started = true;
//     }
//   });

// // click by sequence in gamePattern 
// // Trying to pause for loop until keypress detected
// function clickSequence() {
//     var count = 0;
    
//     for(var i=0; i < gamePattern.length; i++){
//         if($(".btn").click((Event) => Event.currentTarget.id) === gamePattern[i]){
//             soundEffect(gamePattern[i]);
//         }else {soundEffect("wrong");
//                 break;}
//         count++;
//         if(count >= gamePattern.length) break;
//     }
// }

// function play(){
//     $(document).keydown(() => nextSequence());
//     clickSequence();
// }